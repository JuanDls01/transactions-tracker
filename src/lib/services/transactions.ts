import { withAuth } from '@/utils/auth';
import { TransactionRepository } from '@/lib/repositories/transaction-repository';
import { DEFAULT_PAGE_SIZE } from '@/lib/constants';

const transactionRepository = new TransactionRepository();

export const getTransactions = async (currentPage: number, pageSize: number = DEFAULT_PAGE_SIZE) => {
  return withAuth(async (userId) => {
    return transactionRepository.findMany(
      { userId },
      { page: currentPage, pageSize }
    );
  })();
};

export const getTransactionById = async (id: number) => {
  return withAuth(async (userId) => {
    return transactionRepository.findById(id, userId);
  })();
};

export const createTransaction = async (data: Omit<Parameters<TransactionRepository['create']>[0], 'authorId'>) => {
  return withAuth(async (userId) => {
    return transactionRepository.create({
      ...data,
      authorId: userId,
    });
  })();
};

export const updateTransaction = async (data: Omit<Parameters<TransactionRepository['update']>[0], 'authorId'>) => {
  return withAuth(async (userId) => {
    // First verify the transaction belongs to the user
    await transactionRepository.findById(data.id, userId);
    return transactionRepository.update(data);
  })();
};

export const deleteTransaction = async (id: number) => {
  return withAuth(async (userId) => {
    return transactionRepository.delete(id, userId);
  })();
};

export const getMonthlyExpensesByCategoryFiltered = withAuth(
  async (userId: string, year: number, month: number) => {
    return transactionRepository.getMonthlyExpensesByCategory(userId, year, month);
  },
);

export const getIncomeVsExpensesPerMonth = withAuth(async (userId: string) => {
  return transactionRepository.getIncomeVsExpensesPerMonth(userId);
});
