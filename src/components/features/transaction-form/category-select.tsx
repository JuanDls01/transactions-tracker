'use client';

import { TransactionCategory } from '@repo/db';
import { FormControl, FormItem, FormMessage } from '@/ui/form';
import { Label } from '@/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select';
import { TRANSACTION_CATEGORY_OPTIONS } from '@/lib/constants';
import { FieldPath, FieldValues } from 'react-hook-form';

interface CategorySelectProps<T extends FieldValues> {
  field: {
    value: TransactionCategory;
    onChange: (value: TransactionCategory) => void;
    name: FieldPath<T>;
  };
}

export function CategorySelect<T extends FieldValues>({ field }: CategorySelectProps<T>) {
  return (
    <FormItem>
      <Label>Categoría</Label>
      <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder='Selecciona una categoría' />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {TRANSACTION_CATEGORY_OPTIONS.map((category) => (
            <SelectItem key={category.key} value={category.value}>
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  );
}
