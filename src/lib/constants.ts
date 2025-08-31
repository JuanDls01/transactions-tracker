import { Currency, TransactionCategory, TransactionType } from '@repo/db';

export const DEFAULT_PAGE_SIZE = 10;

export const TRANSACTION_CATEGORY_LABELS: Record<TransactionCategory, string> = {
  FOOD: 'Comida',
  LEISURE: 'Ocio',
  HEALTH: 'Salud',
  HOME: 'Hogar',
  SUBSCRIPTIONS: 'Subscripciones',
  SAVINGS: 'Ahorro',
  EDUCATION: 'Educación',
  TRAVEL: 'Viajes',
  WORK: 'Trabajo',
  CAR: 'Auto',
  MISCELLANEOUS: 'Otro',
} as const;

export const CURRENCY_OPTIONS = [
  { key: 'ARS', value: Currency.ARS, label: 'ARS' },
  { key: 'BTC', value: Currency.BTC, label: 'BTC' },
  { key: 'USD', value: Currency.USD, label: 'USD' },
  { key: 'USDT', value: Currency.USDT, label: 'USDT' },
] as const;

export const TRANSACTION_CATEGORY_OPTIONS = [
  { key: 'LEISURE', value: TransactionCategory.LEISURE, label: 'Ocio' },
  { key: 'HEALTH', value: TransactionCategory.HEALTH, label: 'Salud' },
  { key: 'HOME', value: TransactionCategory.HOME, label: 'Hogar' },
  { key: 'SUBSCRIPTIONS', value: TransactionCategory.SUBSCRIPTIONS, label: 'Subscripciones' },
  { key: 'CAR', value: TransactionCategory.CAR, label: 'Auto' },
  { key: 'FOOD', value: TransactionCategory.FOOD, label: 'Comida' },
  { key: 'SAVINGS', value: TransactionCategory.SAVINGS, label: 'Ahorro' },
  { key: 'EDUCATION', value: TransactionCategory.EDUCATION, label: 'Educación' },
  { key: 'TRAVEL', value: TransactionCategory.TRAVEL, label: 'Viajes' },
  { key: 'WORK', value: TransactionCategory.WORK, label: 'Trabajo' },
  { key: 'MISCELLANEOUS', value: TransactionCategory.MISCELLANEOUS, label: 'Otro' },
] as const;

export const DEFAULT_FORM_VALUES = {
  type: TransactionType.INCOME,
  currency: Currency.ARS,
  amount: '',
} as const;