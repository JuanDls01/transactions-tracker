'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import { Cell, Label, Pie, PieChart } from 'recharts';
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/ui/chart';
import type { TransactionCategory } from '@repo/db';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select';
import { getMonthOptions } from '@/utils/dates';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const chartConfig = {
  balance: {
    label: 'Gastos del mes',
  },
  FOOD: {
    label: 'Comida',
    color: 'hsl(var(--chart-5))',
  },
  LEISURE: {
    label: 'Ocio',
    color: 'hsl(var(--chart-2))',
  },
  HEALTH: {
    label: 'Salud',
    color: 'hsl(var(--chart-4))',
  },
  HOME: {
    label: 'Hogar',
    color: 'hsl(var(--chart-3))',
  },
  SUBSCRIPTIONS: {
    label: 'Subscripciones',
    color: 'hsl(var(--chart-7))',
  },
  CAR: {
    label: 'Auto',
    color: 'hsl(var(--chart-6))',
  },
  SAVINGS: {
    label: 'Ahorro',
    color: 'hsl(var(--chart-1))',
  },
  EDUCATION: {
    label: 'Educación',
    color: 'hsl(var(--chart-8))',
  },
  TRAVEL: {
    label: 'Viajes',
    color: 'hsl(var(--chart-9))',
  },
  WORK: {
    label: 'Trabajo',
    color: 'hsl(var(--chart-10))',
  },
  MISCELLANEOUS: {
    label: 'Otros',
    color: 'hsl(var(--chart-11))',
  },
} satisfies ChartConfig;

type ExpensesChartPropsType = {
  chartData: {
    category: TransactionCategory;
    amount: number;
  }[];
  total?: string;
  selectedMonth: number;
  selectedYear: number;
};

const MonthlyExpensesChart = ({ chartData, total, selectedMonth, selectedYear }: ExpensesChartPropsType) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const monthOptions = getMonthOptions(12); // Get options for the last 12 months

  const initialMonthValue = `${selectedYear}-${selectedMonth.toString().padStart(2, '0')}`;
  const [currentMonthFilter, setCurrentMonthFilter] = useState(initialMonthValue);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const [year, month] = currentMonthFilter.split('-');
    params.set('year', year);
    params.set('month', month);
    router.push(`?${params.toString()}`, { scroll: false });
  }, [currentMonthFilter, router, searchParams]);

  return (
    <Card className='border-none py-6'>
      <CardHeader>
        <div className='flex justify-between items-center'>
          <CardTitle>Resumen de Gastos</CardTitle>
          <Select value={currentMonthFilter} onValueChange={setCurrentMonthFilter}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Seleccionar mes' />
            </SelectTrigger>
            <SelectContent>
              {monthOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <CardDescription>Distribución de tus gastos mensuales en pesos argentinos (ARS).</CardDescription>
      </CardHeader>
      <CardContent>
        {chartData.length > 0 ? (
          <ChartContainer config={chartConfig} className='mx-auto aspect-square max-w-sm'>
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie data={chartData} dataKey='amount' nameKey='category' innerRadius={75} strokeWidth={5}>
                {chartData.map((entry) => (
                  <Cell key={`cell-${entry.category}`} fill={chartConfig[entry.category].color} />
                ))}
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor='middle' dominantBaseline='middle'>
                          <tspan x={viewBox.cx} y={viewBox.cy} className='fill-foreground text-2xl font-bold'>
                            ${total?.toLocaleString()}
                          </tspan>
                          <tspan x={viewBox.cx} y={(viewBox.cy ?? 0) + 24} className='fill-muted-foreground'>
                            Gastos totales
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        ) : (
          <div className='flex items-center justify-center h-64 text-muted-foreground'>
            No hay datos de gastos para el mes seleccionado.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MonthlyExpensesChart;
