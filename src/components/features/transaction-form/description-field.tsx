'use client';

import { FormControl, FormItem, FormMessage } from '@/ui/form';
import { Label } from '@/ui/label';
import { Textarea } from '@/ui/textarea';
import { FieldPath, FieldValues } from 'react-hook-form';

interface DescriptionFieldProps<T extends FieldValues> {
  field: {
    value: string;
    onChange: (value: string) => void;
    name: FieldPath<T>;
  };
}

export function DescriptionField<T extends FieldValues>({ field }: DescriptionFieldProps<T>) {
  return (
    <FormItem>
      <Label>Descripción</Label>
      <FormControl>
        <Textarea 
          placeholder='Escribe una breve descripción' 
          className='resize-none' 
          name={field.name}
          value={field.value || ''}
          onChange={(e) => field.onChange(e.target.value)}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}