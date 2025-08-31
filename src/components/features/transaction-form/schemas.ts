import { Currency, TransactionCategory, TransactionType } from '@repo/db';
import { z } from 'zod';

export const schema = z.object({
  id: z.number().optional(),
  amount: z.preprocess(
    (value) => (typeof value === 'string' ? parseFloat(value) : value),
    z
      .number({
        message: 'Es necesario ingresar un monto',
      })
      .positive({
        message: 'El valor ingresado debe ser positivo',
      }),
  ),
  type: z.nativeEnum(TransactionType),
  currency: z.nativeEnum(Currency),
  category: z.nativeEnum(TransactionCategory, {
    message: 'Es necesario ingresar una categoría del listado',
  }),
  description: z.string().optional(),
});
