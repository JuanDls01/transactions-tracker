'use server';
import { schema } from './schemas';
import { TransactionCategory } from '@/types/transactions';
import { ActionResponse } from '@/types/actions';
import { prisma } from '@/lib/prisma';

export const onSubmitAction = async (
  _: ActionResponse<typeof schema> | null,
  data: FormData,
): Promise<ActionResponse<typeof schema>> => {
  try {
    const formData = Object.fromEntries(data);
    const parsed = schema.safeParse(formData);

    if (!parsed.success) {
      return {
        success: false,
        message: 'Por favor corrija los errores del formulario',
        errors: parsed.error.flatten().fieldErrors,
        inputs: formData,
      };
    }

    if (parsed.data.category === TransactionCategory.Car) {
      return {
        success: false,
        message: 'Category cannot be CAR for now',
      };
    }

    const { amount, category, description, currency, type } = parsed.data;

    // Create an ID for the item to be created

    const user = await prisma.user.findFirst();

    await prisma.transaction.create({
      data: {
        type,
        amount,
        category,
        description,
        currency,
        author: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    return { success: true, message: 'Transacción guardada exitosamente!' };
  } catch (err) {
    console.error('Error adding item: ', err);
    return { success: false, message: 'An unexpected error ocurred' };
  }
};
