import { Currency, TransactionType, TransactionCategory } from '@repo/db';

export const validateCurrency = (value: string | null | undefined): Currency | null => {
  if (!value) return null;
  return Object.values(Currency).includes(value as Currency) ? (value as Currency) : null;
};

export const validateTransactionType = (value: string | null | undefined): TransactionType | null => {
  if (!value) return null;
  return Object.values(TransactionType).includes(value as TransactionType) ? (value as TransactionType) : null;
};

export const validateTransactionCategory = (value: string | null | undefined): TransactionCategory | null => {
  if (!value) return null;
  return Object.values(TransactionCategory).includes(value as TransactionCategory) ? (value as TransactionCategory) : null;
};

export const validatePageNumber = (value: string | null | undefined): number => {
  if (!value) return 1;
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;
};

export const validateYear = (value: string | null | undefined): number | null => {
  if (!value) return null;
  const parsed = Number.parseInt(value, 10);
  const currentYear = new Date().getFullYear();
  return Number.isNaN(parsed) || parsed < 2000 || parsed > currentYear + 10 ? null : parsed;
};

export const validateMonth = (value: string | null | undefined): number | null => {
  if (!value) return null;
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) || parsed < 1 || parsed > 12 ? null : parsed;
};