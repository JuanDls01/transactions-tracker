import { Separator } from '@/ui/separator';
import MonthlyExpensesChart from './components/monthly-expenses-chart';
import IncomeVsExpensesChart from './components/income-vs-expense-chart';
import { getMonthlyExpensesByCategoryFiltered, getIncomeVsExpensesPerMonth } from '@/lib/services/transactions';

const DashboardPage = async (props: {
  searchParams?: Promise<{
    month?: string;
    year?: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const currentMonth = new Date().getMonth() + 1; // 1-indexed
  const currentYear = new Date().getFullYear();

  const selectedMonth = searchParams?.month ? Number.parseInt(searchParams.month) : currentMonth;
  const selectedYear = searchParams?.year ? Number.parseInt(searchParams.year) : currentYear;

  const [incomeVsExpensesData, monthlyExpensesData] = await Promise.all([
    getIncomeVsExpensesPerMonth(),
    getMonthlyExpensesByCategoryFiltered(selectedYear, selectedMonth),
  ]);

  const totalExpenses = monthlyExpensesData.reduce((acc, curr) => acc + Number(curr.amount ?? 0), 0);

  return (
    <>
      <div className='py-6'>
        <h1 className='text-3xl mb-2 sm:text-4xl font-bold pt-4 sm:pt-6'>Resumen Financiero</h1>
        <p className='text-base sm:text-lg text-muted-foreground'>
          Visualiza tus ingresos, gastos y métricas clave en un solo lugar.
        </p>
      </div>
      <Separator />
      <IncomeVsExpensesChart chartData={incomeVsExpensesData} />
      <Separator />
      <MonthlyExpensesChart
        chartData={monthlyExpensesData}
        total={totalExpenses.toLocaleString()}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
      />
    </>
  );
};

export default DashboardPage;
