'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/elements/card';
import { Cell, Label, Pie, PieChart } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/ui/elements/chart';
import { TransactionCategory } from '@prisma/client';

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
};

const ExpensesChart = ({ chartData, total }: ExpensesChartPropsType) => {
  return (
    <Card className='border-none'>
      <CardHeader>
        <CardTitle>Gastos del mes</CardTitle>
        <CardDescription>Estos son tus gastos del mes, por categoría y en pesos ARS</CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};

export default ExpensesChart;
