import { auth } from '@/app/auth';
import { prisma } from '@repo/db';
import TransactionForm from '@/features/transaction-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import { cardStyles } from '@/lib/card-styles';
import { logger } from '@/lib/logger';
import { notFound } from 'next/navigation';

const EditTransactionPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const transaction = await getTransaction(id);
  if (!transaction) notFound();
  return (
    <div className='flex pb-24 sm:pb-6 justify-center'>
      <Card className={`${cardStyles.themed} w-full max-w-sm`}>
        <CardHeader className='p-6'>
          <CardTitle className='text-card-foreground'>Editar transacción</CardTitle>
          <CardDescription>Modifica los detalles de tu transacción</CardDescription>
        </CardHeader>
        <CardContent className='p-6 pt-0'>
          <TransactionForm
            transaction={{
              ...transaction,
              amount: transaction.amount.toString(),
              description: transaction.description ?? undefined,
            }}
          />
        </CardContent>
      </Card>
    </div>
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
