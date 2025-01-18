import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/elements/card';
import prismaDb from '@/lib/prisma';
import { DataTable } from '@/ui/components/data-table';
import Link from 'next/link';
import { transactionColumns } from '../ui/components/transaction-columns';
import { parseDecimalToString } from '@/utils/numbers';

const Home = async () => {
  const { balanceByCurrency, recentTransactions } = await getAccountSummary();
  const formattedTransactions = recentTransactions.map((t) => ({
    ...t,
    amount: parseDecimalToString(t.amount),
  }));
  return (
    <main className='space-y-5'>
      {Object.keys(balanceByCurrency).map((key) => (
        <Card key={key} className='p-2 sm:p-6 rounded-lg'>
          <CardContent className='text-sm p-0 sm:p-0 pb-2 sm:pb-2'>Total de {key}</CardContent>
          <CardTitle className='text-2xl font-bold'>
            ${parseDecimalToString(balanceByCurrency[key])} {key}
          </CardTitle>
          <CardDescription className='text-xs'>+20.1% from last month</CardDescription>
        </Card>
      ))}
      <Card className='border-none'>
        <CardHeader>
          <CardTitle>Transacciones recientes</CardTitle>
          <CardDescription>
            Estas son tus últimas transacciones.
            <Link href={'/movements'}>Ve el listado completo aquí</Link>
          </CardDescription>
        </CardHeader>
        <CardContent className='p-0 sm:p-0'>
          <DataTable columns={transactionColumns} data={formattedTransactions} />
        </CardContent>
      </Card>
    </main>
  );
};

const getAccountSummary = async () => {
  try {
    const user = await prismaDb.user.findFirst();
    const [incomesByCurrency, expensesByCurrency, recentTransactions] = await Promise.all([
      prismaDb.transaction.groupBy({
        by: ['currency'],
        where: { authorId: user?.id, type: 'INCOME' },
        _sum: { amount: true },
      }),
      prismaDb.transaction.groupBy({
        by: ['currency'],
        where: { authorId: user?.id, type: 'EXPENSE' },
        _sum: { amount: true },
      }),
      prismaDb.transaction.findMany({
        where: { authorId: user?.id },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
    ]);

    const balanceByCurrency: Record<string, number> = {};

    incomesByCurrency.forEach((income) => {
      const {
        currency,
        _sum: { amount },
      } = income;
      balanceByCurrency[currency] = (balanceByCurrency[currency] || 0) + Number(amount ?? 0);
    });

    expensesByCurrency.forEach((expense) => {
      const {
        currency,
        _sum: { amount },
      } = expense;
      balanceByCurrency[currency] = (balanceByCurrency[currency] || 0) - Number(amount ?? 0);
    });

    return { balanceByCurrency, recentTransactions };
  } catch (error) {
    console.error('Error scanning items:', error);
    throw error;
  }
};

export default Home;
