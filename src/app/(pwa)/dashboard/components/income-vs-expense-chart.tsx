'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/ui/chart';

const chartConfig = {
  income: {
    label: 'Ingresos',
    color: 'hsl(var(--chart-1))',
  },
  expense: {
    label: 'Egresos',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

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
    <Card className='border-none py-6'>
      <CardHeader>
        <CardTitle>Ingresos vs Egresos</CardTitle>
        <CardDescription>Analiza cómo varían tus ingresos y egresos en los últimos meses</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
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
      </CardContent>
    </Card>
  );
};

export default IncomeVsExpensesChart;
