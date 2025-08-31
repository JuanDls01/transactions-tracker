import { auth } from '@/app/auth';
import { prisma } from '@repo/db';
import TransactionForm from '@/features/transaction-form';
import { logger } from '@/lib/logger';
import { notFound } from 'next/navigation';

const EditTransactionPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const transaction = await getTransaction(id);
  if (!transaction) notFound();
  return (
    <TransactionForm
      transaction={{
        ...transaction,
        amount: transaction.amount.toString(),
        description: transaction.description ?? undefined,
      }}
    />
  );
};

const getTransaction = async (id: string | number) => {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    const transactionId = Number(id);
    if (!transactionId || isNaN(transactionId)) return undefined;
    const transaction = await prisma.transaction.findUnique({
      where: { authorId: userId, id: Number(id) },
    });
    return transaction;
  } catch (err) {
    logger.error('Failed to get transaction', err as Error, 'getTransaction', { id });
    throw err;
  }
};

export default EditTransactionPage;
