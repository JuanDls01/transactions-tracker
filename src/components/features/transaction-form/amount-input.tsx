'use client';

import { Currency } from '@repo/db';
import { FormControl, FormItem } from '@/ui/form';
import { Input } from '@/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select';
import { CURRENCY_OPTIONS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import clsx from 'clsx';
import { UseFormWatch, FieldValues, FieldPath } from 'react-hook-form';

interface AmountInputProps<T extends FieldValues> {
  amountField: {
    value: string;
    onChange: (value: string) => void;
    name: FieldPath<T>;
  };
  currencyField: {
    value: Currency;
    onChange: (value: Currency) => void;
    name: FieldPath<T>;
  };
  watch: UseFormWatch<T>;
  errors?: {
    amount?: { message?: string };
    currency?: { message?: string };
  };
}

export function AmountInput<T extends FieldValues>({
  amountField,
  currencyField,
  watch,
  errors,
}: AmountInputProps<T>) {
  const amountValue = watch(amountField.name as FieldPath<T>);

  return (
    <div>
      <div className='flex items-center justify-center'>
        <p className='text-2xl text-muted-foreground'>$</p>
        <FormItem aria-label='Monto'>
          <FormControl>
            <div className='flex items-center'>
              <Input
                placeholder='0'
                name={amountField.name}
                value={amountField.value}
                onChange={(e) => amountField.onChange(e.target.value)}
                inputMode='decimal'
                className={clsx(
                  'border-none focus:border-none focus-visible:ring-0',
                  'text-5xl px-2 text-right h-auto',
                )}
                style={{
                  width: `${Math.max(1, amountValue?.toString().length || 1) + 0.75}ch`,
                  maxWidth: '8.5ch',
                }}
              />
            </div>
          </FormControl>
        </FormItem>
        <FormItem className='w-16' aria-label='Moneda'>
          <Select
            onValueChange={currencyField.onChange}
            defaultValue={currencyField.value}
            value={currencyField.value}
          >
            <FormControl className='p-1 text-lg'>
              <SelectTrigger className='border-none focus:border-none focus:ring-0 focus-visible:ring-0'>
                <SelectValue placeholder='Moneda' />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {CURRENCY_OPTIONS.map((currency) => (
                <SelectItem key={currency.key} value={currency.value}>
                  {currency.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      </div>

      {errors?.amount && (
        <p className={cn('text-xs font-medium text-destructive')}>{errors.amount.message}</p>
      )}
      {errors?.currency && (
        <p className={cn('text-xs font-medium text-destructive')}>{errors.currency.message}</p>
      )}
    </div>
  );
}
