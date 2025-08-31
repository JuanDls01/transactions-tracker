import { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { cardStyles } from '@/lib/card-styles';
import MonthlyExpensesChart from './components/monthly-expenses-chart';
import IncomeVsExpensesChart from './components/income-vs-expense-chart';
import { BalanceSummary } from './components/balance-cards';
import {
  getMonthlyExpensesByCategoryFiltered,
  getIncomeVsExpensesPerMonth,
} from '@/lib/services/transactions';

interface DashboardPageProps {
  searchParams?: Promise<{
    month?: string;
    year?: string;
    currency?: string;
  }>;
}

const DashboardPage = async ({ searchParams }: DashboardPageProps) => {
  const params = await searchParams;
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const selectedMonth = params?.month ? Number.parseInt(params.month) : currentMonth;
  const selectedYear = params?.year ? Number.parseInt(params.year) : currentYear;

  const [incomeVsExpensesData, monthlyExpensesData] = await Promise.all([
    getIncomeVsExpensesPerMonth(),
    getMonthlyExpensesByCategoryFiltered(selectedYear, selectedMonth),
  ]);

  const totalExpenses = monthlyExpensesData.reduce((acc, curr) => acc + Number(curr.amount ?? 0), 0);

  return (
    <div className='space-y-6 pb-24 sm:pb-6'>
      <div>
        <h1 className='text-3xl font-bold text-card-foreground'>Dashboard</h1>
      </div>

      <Suspense
        fallback={
          <div className='grid gap-4 md:grid-cols-2'>
            <div className='h-24 bg-white animate-pulse rounded-lg'></div>
          </div>
        }
      >
        <BalanceSummary searchParams={params || {}} />
      </Suspense>

      <div className='grid gap-6 lg:grid-cols-2'>
        <Card className={cardStyles.themed}>
          <CardHeader className='p-6'>
            <CardTitle className='text-lg font-semibold text-card-foreground'>Ingresos vs Gastos</CardTitle>
          </CardHeader>
          <CardContent className='p-6 pt-0'>
            <IncomeVsExpensesChart chartData={incomeVsExpensesData} />
          </CardContent>
        </Card>

        <Card className={cardStyles.themed}>
          <CardHeader className='p-6'>
            <CardTitle className='text-lg font-semibold text-card-foreground'>Gastos por Categoría</CardTitle>
          </CardHeader>
          <CardContent className='p-6 pt-0'>
            <MonthlyExpensesChart
              chartData={monthlyExpensesData}
              total={totalExpenses.toLocaleString()}
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
