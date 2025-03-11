import { parseDecimalToString } from '@/utils/numbers';
import { prisma } from '../prisma';
import { withAuth } from '@/utils/auth';

const DEFAULT_PAGE_SIZE = 10;

export const getTransactions = async (currentPage: number, pageSize: number = DEFAULT_PAGE_SIZE) => {
  return withAuth(async (userId) => {
    try {
      const [transactions, totalRecords] = await Promise.all([
        prisma.transaction.findMany({
          where: { authorId: userId },
          orderBy: { createdAt: 'desc' },
          skip: pageSize * (currentPage - 1),
          take: pageSize,
        }),
        prisma.transaction.count({
          where: {
            authorId: userId,
          },
        }),
      ]);

      const formattedTransactions = transactions.map((t) => ({
        ...t,
        amount: parseDecimalToString(t.amount),
      }));

      return { transactions: formattedTransactions, totalPages: Math.ceil(totalRecords / pageSize) };
    } catch (error) {
      console.error('Error scanning items:', error);
      throw error;
    }
  })();
};
