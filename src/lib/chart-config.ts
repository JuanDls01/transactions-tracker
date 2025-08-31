import type { ChartConfig } from '@/ui/chart';

// Centralized chart configurations for consistent theming across all charts
export const CATEGORY_CHART_CONFIG = {
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

export const INCOME_EXPENSE_CHART_CONFIG = {
  income: {
    label: 'Ingresos',
    color: 'hsl(var(--chart-1))',
  },
  expense: {
    label: 'Egresos',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;
