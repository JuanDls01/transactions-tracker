import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/elements/card';
import { DataTable } from '@/ui/components/data-table';
import { prisma } from '@repo/db';
import Link from 'next/link';
import { parseDecimalToString } from '@/utils/numbers';
import { transactionColumns } from '../transactions/transaction-columns';
import { withAuth } from '@/utils/auth';
import { getTransactions } from '@/lib/services/transactions';

const HomePage = async () => {
  const [currencyBalance, { transactions }] = await Promise.all([
    getCurrencyBalance(),
    getTransactions(1, 5),
  ]);

  return (
    <>
      <div className='py-6'>
        <h1 className='text-3xl sm:text-4xl font-bold pt-4 sm:pt-6'>Resumen de cuenta</h1>
        <p className='text-base sm:text-lg text-muted-foreground'>
          Aquí encontraras un resumen de tus gastos
        </p>
      </div>
      <div className='space-y-4'>
        {Object.keys(currencyBalance).map((key) => (
          <Card key={key} className='p-2 sm:p-6 rounded-lg'>
            <CardContent className='text-sm p-0 sm:p-0 pb-2 sm:pb-2'>Total de {key}</CardContent>
            <CardTitle className='text-2xl font-bold'>
              ${parseDecimalToString(currencyBalance[key])} {key}
            </CardTitle>
            <CardDescription className='text-xs'>+20.1% from last month</CardDescription>
          </Card>
        ))}
      </div>
      <Card className='border-none py-6'>
        <CardHeader>
          <CardTitle>Transacciones recientes</CardTitle>
          <CardDescription>
            Estas son tus últimas transacciones. Ve el listado completo{' '}
            <Link href={'/transactions'} className='underline underline-offset-4'>
              aquí
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent className='p-0 sm:p-0'>
          <DataTable columns={transactionColumns} data={transactions} />
        </CardContent>
      </Card>
    </>
  );
};

const getCurrencyBalance = withAuth(async (userId) => {
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
    console.error('Error scanning items:', error);
    throw error;
  }
});

export default HomePage;
