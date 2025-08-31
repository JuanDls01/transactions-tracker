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
                ? 'bg-[#2FF76D] text-white font-bold data-[state=on]:bg-[#2FF76D] data-[state=on]:text-white'
                : 'bg-[#3DDC84]/20 text-[#3DDC84]',
            )}
          >
            INGRESO
          </ToggleGroupItem>
          <ToggleGroupItem
            value={TransactionType.EXPENSE}
            className={cn(
              'w-24 p-1 rounded-full transition-all text-sm',
              field.value === TransactionType.EXPENSE
                ? 'bg-[#B30C36] text-white font-bold hover:bg-[#B30C36] data-[state=on]:bg-[#B30C36] data-[state=on]:text-white'
                : 'bg-[#B30C36]/20 hover:bg-[#B30C36]/20 hover:text-[#B30C36] text-[#B30C36]',
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