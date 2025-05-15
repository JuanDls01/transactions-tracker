import { prisma } from '@/lib/prisma';
import { Currency, TransactionType } from '@prisma/client';
import { firstDayOfMonth, lastDayOfMonth } from '@/utils/dates';
import { Separator } from '@/ui/elements/separator';
import MonthlyExpensesChart from './components/monthly-expenses-chart';
import IncomeVsExpensesChart from './components/income-vs-expense-chart';
import { withAuth } from '@/utils/auth';

const DashboardPage = async () => {
  const [incomeVsExpensesData, monthlyExpensesData] = await Promise.all([
    getIncomesVsExpensesPerMonth(),
    getMonthlyExpensesByCategory(),
  ]);

  const totalExpenses = monthlyExpensesData.reduce((acc, curr) => acc + Number(curr.amount ?? 0), 0);

  return (
    <>
      <div className='py-6'>
        <h1 className='text-3xl sm:text-4xl font-bold pt-4 sm:pt-6'>Resumen Financiero</h1>
        <p className='text-base sm:text-lg text-muted-foreground'>
          Visualiza tus ingresos, gastos y métricas clave en un solo lugar.
        </p>
      </div>
      <Separator />
      <IncomeVsExpensesChart chartData={incomeVsExpensesData} />
      <Separator />
      <MonthlyExpensesChart chartData={monthlyExpensesData} total={totalExpenses.toLocaleString()} />
    </>
  );
};

const getIncomesVsExpensesPerMonth = withAuth(async (userId) => {
  try {
    const data: { month: Date; income: number; expense: number }[] = await prisma.$queryRaw`
      SELECT
        DATE_TRUNC('month', "createdAt") AS month,
        SUM(CASE WHEN "type" = 'INCOME' THEN "amount" ELSE 0 END) AS income,
        SUM(CASE WHEN "type" = 'EXPENSE' THEN "amount" ELSE 0 END) AS expense
      FROM "Transaction"
      WHERE "createdAt" >= NOW() - INTERVAL '6 months'
        AND "authorId" = ${userId}
        AND "currency" = 'ARS'
      GROUP BY DATE_TRUNC('month', "createdAt")
      ORDER BY month;
    `;

    const response = data.map((item) => ({
      month: new Date(item.month).toLocaleString('es-ES', { month: 'long', year: 'numeric' }),
      income: Number(item.income),
      expense: Number(item.expense),
    }));

    return response;
  } catch (error) {
    console.error('Error scanning items:', error);
    throw error;
  }
});

const getMonthlyExpensesByCategory = withAuth(async (userId) => {
  try {
    const monthlyExpensesByCategory = await prisma.transaction.groupBy({
      by: ['category'],
      where: {
        authorId: userId,
        type: TransactionType.EXPENSE,
        currency: Currency.ARS,
        createdAt: {
          gte: firstDayOfMonth(),
          lte: lastDayOfMonth(),
        },
      },
      _sum: { amount: true },
    });

    return monthlyExpensesByCategory.map((exp) => ({
      category: exp.category,
      amount: Number(exp._sum.amount ?? 0),
    }));
  } catch (error) {
    console.error('Error scanning items:', error);
    throw error;
  }
});

export default DashboardPage;
