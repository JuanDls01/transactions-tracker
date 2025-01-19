import prismaDb from '@/lib/prisma';
import { transactionColumns } from '../../ui/components/transaction-columns';
import { DataTable } from '../../ui/components/data-table';
import { parseDecimalToString } from '@/utils/numbers';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/elements/card';
import Link from 'next/link';

const MovementsPage = async () => {
  const transactions = await getTransactions();
  if (!transactions.length) return <h1>Aún no has registrado transacciones</h1>;
  return (
    <main className='flex flex-col space-y-4'>
      <Card className='border-none py-6 space-y-4'>
        <CardHeader>
          <CardTitle>Registro de transacciones</CardTitle>
          <CardDescription>
            Estas son todas tus transacciones transacciones. Si quieres agregar una nueva haz click{' '}
            <Link href={'/transactions/new'} className='underline underline-offset-4'>
              aquí
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent className='px-0 sm:px-0'>
          <DataTable columns={transactionColumns} data={transactions} />
        </CardContent>
      </Card>
    </main>
  );
};

const getTransactions = async () => {
  try {
    const user = await prismaDb.user.findFirst();
    const transactions = await prismaDb.transaction.findMany({
      where: { authorId: user?.id },
      orderBy: { createdAt: 'desc' },
    });

    const formattedTransactions = transactions.map((t) => ({
      ...t,
      amount: parseDecimalToString(t.amount),
    }));

    return formattedTransactions;
  } catch (error) {
    console.error('Error scanning items:', error);
    throw error;
  }
};

export default MovementsPage;
