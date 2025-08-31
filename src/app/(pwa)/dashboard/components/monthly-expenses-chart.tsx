'use client';

import { Cell, Label, Pie, PieChart } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/ui/chart';
import { CATEGORY_CHART_CONFIG } from '@/lib/chart-config';
import type { TransactionCategory } from '@repo/db';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select';
import { getMonthOptions } from '@/utils/dates';
import { useUrlFilters } from '@/hooks/use-url-filters';
import { useEffect, useState } from 'react';

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
  const { updateFilters } = useUrlFilters();
  const monthOptions = getMonthOptions(12);

  const initialMonthValue = `${selectedYear}-${selectedMonth.toString().padStart(2, '0')}`;
  const [currentMonthFilter, setCurrentMonthFilter] = useState(initialMonthValue);

  useEffect(() => {
    const [year, month] = currentMonthFilter.split('-');
    updateFilters({ year, month });
  }, [currentMonthFilter, updateFilters]);

  return (
    <div className='space-y-4'>
      <div className='flex justify-between items-center'>
        <span className='text-sm text-muted-foreground'>Filtrar por mes:</span>
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

      {chartData.length > 0 ? (
        <ChartContainer config={CATEGORY_CHART_CONFIG} className='mx-auto aspect-square max-w-sm'>
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey='amount' nameKey='category' innerRadius={75} strokeWidth={5}>
              {chartData.map((entry) => (
                <Cell key={`cell-${entry.category}`} fill={CATEGORY_CHART_CONFIG[entry.category].color} />
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
    </div>
  );
};

export default MonthlyExpensesChart;
