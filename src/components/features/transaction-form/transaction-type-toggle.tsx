'use client';

import { TransactionType } from '@repo/db';
import { ToggleGroup, ToggleGroupItem } from '@/ui/toggle-group';
import { FormControl, FormItem } from '@/ui/form';
import { Input } from '@/ui/input';
import { cn } from '@/lib/utils';
import { FieldPath, FieldValues } from 'react-hook-form';

interface TransactionTypeToggleProps<T extends FieldValues> {
  field: {
    value: TransactionType;
    onChange: (value: TransactionType) => void;
    name: FieldPath<T>;
  };
}

export function TransactionTypeToggle<T extends FieldValues>({ field }: TransactionTypeToggleProps<T>) {
  return (
    <FormItem aria-label='Tipo de transacción'>
      <FormControl>
        <ToggleGroup
          type='single'
          onValueChange={(value: string) => {
            if (value) field.onChange(value as TransactionType);
          }}
          value={field.value}
        >
          <ToggleGroupItem
            value={TransactionType.INCOME}
            className={cn(
              'w-24 p-1 rounded-full transition-all text-sm',
              field.value === TransactionType.INCOME
                ? 'bg-income text-primary-foreground font-bold data-[state=on]:bg-income data-[state=on]:text-primary-foreground'
                : 'bg-income/20 text-income',
            )}
          >
            INGRESO
          </ToggleGroupItem>
          <ToggleGroupItem
            value={TransactionType.EXPENSE}
            className={cn(
              'w-24 p-1 rounded-full transition-all text-sm',
              field.value === TransactionType.EXPENSE
                ? 'bg-outcome text-primary-foreground font-bold hover:bg-outcome data-[state=on]:bg-outcome data-[state=on]:text-primary-foreground'
                : 'bg-outcome/20 hover:bg-outcome/20 hover:text-outcome text-outcome',
            )}
          >
            EGRESO
          </ToggleGroupItem>
          <Input
            type='hidden'
            name={field.name}
            value={field.value}
            onChange={(e) => field.onChange(e.target.value as TransactionType)}
          />
        </ToggleGroup>
      </FormControl>
    </FormItem>
  );
}
