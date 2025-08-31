import { prisma } from '@repo/db';
import { withAuth } from '@/utils/auth';
import { logger } from '@/lib/logger';
import { Currency } from '@repo/db';

export const getCurrencyBalance = withAuth(async (userId) => {
  try {
    const [incomesByCurrency, expensesByCurrency] = await Promise.all([
      prisma.transaction.groupBy({
        by: ['currency'],
        where: { authorId: userId, type: 'INCOME' },
        _sum: { amount: true },
      }),
      prisma.transaction.groupBy({
        by: ['currency'],
        where: { authorId: userId, type: 'EXPENSE' },
        _sum: { amount: true },
      }),
    ]);

    const currencyBalance: Record<string, number> = {};

    incomesByCurrency.forEach((income) => {
      const {
        currency,
        _sum: { amount },
      } = income;
      currencyBalance[currency] = (currencyBalance[currency] || 0) + Number(amount ?? 0);
    });

    expensesByCurrency.forEach((expense) => {
      const {
        currency,
        _sum: { amount },
      } = expense;
      currencyBalance[currency] = (currencyBalance[currency] || 0) - Number(amount ?? 0);
    });

    return currencyBalance;
  } catch (error) {
    logger.error('Failed to calculate currency balance', error as Error, 'getCurrencyBalance');
    throw error;
  }
});

export interface DashboardParams {
  month?: string;
  year?: string;
  currency?: string;
}

export const getDashboardData = withAuth(async (userId, params: DashboardParams) => {
  try {
    const balancesService = getCurrencyBalance as any;
    const transactionsService = getRecentTransactions as any;

    const [balances, recentTransactions] = await Promise.all([
      balancesService.withAuth(userId)(),
      transactionsService.withAuth(userId)(params.currency as Currency),
    ]);

    return {
      balances,
      recentTransactions,
    };
  } catch (error) {
    logger.error('Failed to get dashboard data', error as Error, 'getDashboardData');
    throw error;
  }
});

const getRecentTransactions = withAuth(async (userId, currency?: Currency) => {
  try {
    const where: any = { authorId: userId };
    if (currency) {
      where.currency = currency;
    }

    const transactions = await prisma.transaction.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    return transactions;
  } catch (error) {
    logger.error('Failed to get recent transactions', error as Error, 'getRecentTransactions');
    throw error;
  }
});
