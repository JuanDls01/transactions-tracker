import { prisma, TransactionType, Currency, TransactionCategory } from '@repo/db';
import { DatabaseError, NotFoundError, ConnectionError, isConnectionError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { parseDecimalToString } from '@/utils/numbers';
import { DEFAULT_PAGE_SIZE } from '@/lib/constants';

export interface TransactionFilters {
  userId: string;
  type?: TransactionType;
  currency?: Currency;
  category?: TransactionCategory;
  startDate?: Date;
  endDate?: Date;
}

export interface PaginationOptions {
  page: number;
  pageSize?: number;
}

export interface TransactionData {
  amount: string;
  type: TransactionType;
  currency: Currency;
  category: TransactionCategory;
  description?: string;
  authorId: string;
}

export interface TransactionUpdateData extends Partial<TransactionData> {
  id: number;
}

export class TransactionRepository {
  private handleDatabaseError(error: unknown, operation: string, context?: any): never {
    const err = error as Error;
    
    if (isConnectionError(error)) {
      logger.error(`Database connection failed during ${operation}`, err, `TransactionRepository.${operation}`, context);
      throw new ConnectionError('Database is temporarily unavailable. Please try again later.', err);
    }
    
    logger.error(`Database operation failed: ${operation}`, err, `TransactionRepository.${operation}`, context);
    throw new DatabaseError(`Failed to ${operation}`, err);
  }
  async findMany(filters: TransactionFilters, pagination: PaginationOptions) {
    try {
      const { userId, type, currency, category, startDate, endDate } = filters;
      const { page, pageSize = DEFAULT_PAGE_SIZE } = pagination;

      const where = {
        authorId: userId,
        ...(type && { type }),
        ...(currency && { currency }),
        ...(category && { category }),
        ...(startDate || endDate
          ? {
              createdAt: {
                ...(startDate && { gte: startDate }),
                ...(endDate && { lte: endDate }),
              },
            }
          : {}),
      };

      const [transactions, totalRecords] = await Promise.all([
        prisma.transaction.findMany({
          where,
          orderBy: { createdAt: 'desc' },
          skip: pageSize * (page - 1),
          take: pageSize,
        }),
        prisma.transaction.count({ where }),
      ]);

      const formattedTransactions = transactions.map((t) => ({
        ...t,
        amount: parseDecimalToString(t.amount),
      }));

      return {
        transactions: formattedTransactions,
        totalPages: Math.ceil(totalRecords / pageSize),
        totalRecords,
      };
    } catch (error) {
      this.handleDatabaseError(error, 'fetch transactions', { filters, pagination });
    }
  }

  async findById(id: number, userId: string) {
    try {
      const transaction = await prisma.transaction.findFirst({
        where: { id, authorId: userId },
      });

      if (!transaction) {
        throw new NotFoundError('Transaction');
      }

      return {
        ...transaction,
        amount: parseDecimalToString(transaction.amount),
      };
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }

      this.handleDatabaseError(error, 'fetch transaction by ID', { id, userId });
    }
  }

  async create(data: TransactionData) {
    try {
      const transaction = await prisma.transaction.create({
        data: {
          ...data,
          amount: parseFloat(data.amount),
        },
      });

      return {
        ...transaction,
        amount: parseDecimalToString(transaction.amount),
      };
    } catch (error) {
      this.handleDatabaseError(error, 'create transaction', { data });
    }
  }

  async update(data: TransactionUpdateData) {
    try {
      const { id, ...updateData } = data;

      const transaction = await prisma.transaction.update({
        where: { id },
        data: {
          ...updateData,
          ...(updateData.amount && { amount: parseFloat(updateData.amount) }),
        },
      });

      return {
        ...transaction,
        amount: parseDecimalToString(transaction.amount),
      };
    } catch (error) {
      this.handleDatabaseError(error, 'update transaction', { data });
    }
  }

  async delete(id: number, userId: string) {
    try {
      // Verify the transaction belongs to the user before deleting
      const transaction = await this.findById(id, userId);

      await prisma.transaction.delete({
        where: { id },
      });

      return transaction;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }

      this.handleDatabaseError(error, 'delete transaction', { id, userId });
    }
  }

  async getMonthlyExpensesByCategory(userId: string, year: number, month: number) {
    try {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);

      const expenses = await prisma.transaction.groupBy({
        by: ['category'],
        where: {
          authorId: userId,
          type: TransactionType.EXPENSE,
          currency: Currency.ARS,
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
        _sum: { amount: true },
      });

      return expenses.map((exp) => ({
        category: exp.category,
        amount: Number(exp._sum.amount ?? 0),
      }));
    } catch (error) {
      this.handleDatabaseError(error, 'fetch monthly expenses by category', { userId, year, month });
    }
  }

  async getIncomeVsExpensesPerMonth(userId: string) {
    try {
      const data: { month: Date; income: number; expense: number }[] = await prisma.$queryRaw`
        SELECT
          DATE_TRUNC('month', "createdAt") AS month,
          SUM(CASE WHEN "type" = 'INCOME' THEN "amount" ELSE 0 END) AS income,
          SUM(CASE WHEN "type" = 'EXPENSE' THEN "amount" ELSE 0 END) AS expense
        FROM "Transaction"
        WHERE "createdAt" >= NOW() - INTERVAL '6 months'
          AND "authorId" = ${userId}
          AND "currency" = 'ARS'
        GROUP BY DATE_TRUNC('month', "createdAt")
        ORDER BY month;
      `;

      return data.map((item) => ({
        month: new Date(item.month).toLocaleString('es-ES', {
          month: 'long',
          year: 'numeric',
        }),
        income: Number(item.income),
        expense: Number(item.expense),
      }));
    } catch (error) {
      this.handleDatabaseError(error, 'fetch income vs expenses per month', { userId });
    }
  }
}
