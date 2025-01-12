import { TransactionCategory } from '@/types/transactions';
import { z } from 'zod';

export const schema = z.object({
  amount: z.preprocess(
    (value) => (typeof value === 'string' ? parseFloat(value) : value),
    z.number({
      required_error: 'required field',
      invalid_type_error: 'Es necesario ingresar un monto',
    }),
  ),
  currency: z.string(),
  category: z.nativeEnum(TransactionCategory),
  description: z.string().optional(),
});
