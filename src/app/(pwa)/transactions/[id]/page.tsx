import { auth } from '@/app/auth';
import { prisma } from '@/lib/prisma';
import TransactionForm from '@/ui/components/transaction-form';
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

export default EditTransactionPage;

export const getTransaction = async (id: string | number) => {
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
    console.error('Error scanning items', err);
    throw err;
  }
};
