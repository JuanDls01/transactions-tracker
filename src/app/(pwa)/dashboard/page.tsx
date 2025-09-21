import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { cardStyles } from '@/lib/card-styles';
import MonthlyExpensesChart from './components/monthly-expenses-chart';
import IncomeVsExpensesChart from './components/income-vs-expense-chart';
import ChartCurrencyFilter from './components/chart-currency-filter';
import { BalanceSummary } from './components/balance-cards';
import {
  getMonthlyExpensesByCategoryFiltered,
  getIncomeVsExpensesPerMonth,
} from '@/lib/services/transactions';
import { Currency } from '@repo/db';
import { validateCurrency, validateMonth, validateYear } from '@/utils/url-validation';

interface DashboardPageProps {
  searchParams?: Promise<{
    month?: string;
    year?: string;
    currency?: string;
    chartCurrency?: string;
  }>;
}

const DashboardPage = async ({ searchParams }: DashboardPageProps) => {
  const params = await searchParams;
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const selectedMonth = validateMonth(params?.month) ?? currentMonth;
  const selectedYear = validateYear(params?.year) ?? currentYear;
  const selectedChartCurrency = validateCurrency(params?.chartCurrency) ?? Currency.ARS;

  const [incomeVsExpensesData, monthlyExpensesData] = await Promise.all([
    getIncomeVsExpensesPerMonth(selectedChartCurrency),
    getMonthlyExpensesByCategoryFiltered(selectedYear, selectedMonth),
  ]);

  const totalExpenses = monthlyExpensesData.reduce((acc, curr) => acc + Number(curr.amount ?? 0), 0);

  return (
    <div className='space-y-6 pb-24 sm:pb-6'>
      <div>
        <h1 className='text-3xl font-bold text-card-foreground'>Dashboard</h1>
      </div>

      <BalanceSummary searchParams={params || {}} />

      <div className='grid gap-6 lg:grid-cols-2'>
        <Card className={cardStyles.themed}>
          <CardHeader className='p-6'>
            <div className='flex items-center justify-between'>
              <CardTitle className='text-lg font-semibold text-card-foreground'>Ingresos vs Gastos</CardTitle>
              <ChartCurrencyFilter />
            </div>
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
