import { prisma } from '@repo/db';
import { withAuth } from '@/utils/auth';
import { logger } from '@/lib/logger';
import { Currency } from '@repo/db';

const getCurrencyBalanceInternal = async (userId: string) => {
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
};

export const getCurrencyBalance = withAuth(async (userId) => {
  try {
    return await getCurrencyBalanceInternal(userId);
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
    const [balances, recentTransactions] = await Promise.all([
      getCurrencyBalanceInternal(userId),
      getRecentTransactionsInternal(userId, params.currency as Currency),
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

const getRecentTransactionsInternal = async (userId: string, currency?: Currency) => {
  const where: { authorId: string; currency?: Currency } = { authorId: userId };
  if (currency) {
    where.currency = currency;
  }

  const transactions = await prisma.transaction.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: 5,
  });

  return transactions;
};

export const getRecentTransactions = withAuth(async (userId, currency?: Currency) => {
  try {
    return await getRecentTransactionsInternal(userId, currency);
  } catch (error) {
    logger.error('Failed to get recent transactions', error as Error, 'getRecentTransactions');
    throw error;
  }
});
