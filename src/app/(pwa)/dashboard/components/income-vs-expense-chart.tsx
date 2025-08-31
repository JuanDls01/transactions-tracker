'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/ui/chart';
import { INCOME_EXPENSE_CHART_CONFIG } from '@/lib/chart-config';

type ChartDataType = {
  month: string;
  income: number;
  expense: number;
};

type IncomeVsExpensesChartProps = {
  chartData: ChartDataType[];
};

const formatMonth = (value: string) => value.slice(0, 3);

const IncomeVsExpensesChart = ({ chartData = [] }: IncomeVsExpensesChartProps) => {
  return (
    <ChartContainer config={INCOME_EXPENSE_CHART_CONFIG}>
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey='month'
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={formatMonth}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator='dashed' />} />
        <Bar dataKey='expense' fill='var(--color-expense)' radius={4} />
        <Bar dataKey='income' fill='var(--color-income)' radius={4} />
      </BarChart>
    </ChartContainer>
  );
};

export default IncomeVsExpensesChart;
