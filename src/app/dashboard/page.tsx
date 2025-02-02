import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/elements/card';
import { prisma } from '@/lib/prisma';
import { DataTable } from '@/ui/components/data-table';
import Link from 'next/link';
import { transactionColumns } from '../../ui/components/transaction-columns';
import { parseDecimalToString } from '@/utils/numbers';
import { firstDateOfMonth, lastDateOfMonth } from '@/utils/dates';
import ExpensesChart from '@/ui/components/expenses-chart';

const DashboardPage = async () => {
  const { balanceByCurrency, monthlyExpenses, lastTransactions } = await getAccountSummary();

  const totalExpenses = monthlyExpenses.reduce((acc, curr) => acc + Number(curr.amount ?? 0), 0);
  const parsedExpenses = monthlyExpenses.map((exp) => ({
    ...exp,
    amount: Number(exp.amount),
  }));

  return (
    <main>
      <div className='py-6'>
        <h1 className='text-3xl sm:text-4xl font-bold pt-4 sm:pt-6'>Resumen de cuenta</h1>
        <p className='text-base sm:text-lg text-muted-foreground'>
          Aquí encontraras un resumen de tus gastos
        </p>
      </div>
      <div className='space-y-4'>
        {Object.keys(balanceByCurrency).map((key) => (
          <Card key={key} className='p-2 sm:p-6 rounded-lg'>
            <CardContent className='text-sm p-0 sm:p-0 pb-2 sm:pb-2'>Total de {key}</CardContent>
            <CardTitle className='text-2xl font-bold'>
              ${parseDecimalToString(balanceByCurrency[key])} {key}
            </CardTitle>
            <CardDescription className='text-xs'>+20.1% from last month</CardDescription>
          </Card>
        ))}
      </div>
      <ExpensesChart chartData={parsedExpenses} total={totalExpenses.toLocaleString()} />
      <Card className='border-none py-6'>
        <CardHeader>
          <CardTitle>Transacciones recientes</CardTitle>
          <CardDescription>
            Estas son tus últimas transacciones. Ve el listado completo
            <Link href={'/transactions'} className='underline underline-offset-4'>
              aquí
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent className='p-0 sm:p-0'>
          <DataTable columns={transactionColumns} data={lastTransactions} />
        </CardContent>
      </Card>
    </main>
  );
};

const getAccountSummary = async () => {
  try {
    const user = await prisma.user.findFirst();
    const [incomesByCurrency, expensesByCurrency, lastTransactions, monthlyExpensesByCategory] =
      await Promise.all([
        prisma.transaction.groupBy({
          by: ['currency'],
          where: { authorId: user?.id, type: 'INCOME' },
          _sum: { amount: true },
        }),
        prisma.transaction.groupBy({
          by: ['currency'],
          where: { authorId: user?.id, type: 'EXPENSE' },
          _sum: { amount: true },
        }),
        prisma.transaction.findMany({
          where: { authorId: user?.id },
          orderBy: { createdAt: 'desc' },
          take: 5,
        }),
        prisma.transaction.groupBy({
          by: ['category'],
          where: {
            authorId: user?.id,
            type: 'EXPENSE',
            currency: 'ARS',
            createdAt: {
              gte: firstDateOfMonth(),
              lte: lastDateOfMonth(),
            },
          },
          _sum: { amount: true },
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

    const formattedTransactions = lastTransactions.map((t) => ({
      ...t,
      amount: parseDecimalToString(t.amount),
    }));

    const formattedExpenses = monthlyExpensesByCategory.map((exp) => ({
      category: exp.category,
      amount: exp._sum.amount ?? 0,
    }));

    return {
      balanceByCurrency,
      lastTransactions: formattedTransactions,
      monthlyExpenses: formattedExpenses,
    };
  } catch (error) {
    console.error('Error scanning items:', error);
    throw error;
  }
};

export default DashboardPage;
