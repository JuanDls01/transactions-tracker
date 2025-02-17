'use server';
import { schema } from './schemas';
import { ActionResponse } from '@/types/actions';
import { prisma } from '@/lib/prisma';
import { auth } from '@/app/auth';
import { revalidatePath } from 'next/cache';

export const onSubmitAction = async (
  _: ActionResponse<typeof schema> | null,
  data: FormData,
): Promise<ActionResponse<typeof schema>> => {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return { success: false, message: 'Usuario no autenticado' };
    }
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

    const { amount, category, description, currency, type } = parsed.data;

    const userId = session.user.id;

    await prisma.transaction.create({
      data: {
        type,
        amount,
        category,
        description,
        currency,
        author: {
          connect: {
            id: userId,
          },
        },
      },
    });

    revalidatePath('/transactions');

    return { success: true, message: 'Transacción guardada exitosamente!' };
  } catch (err) {
    console.error('Error adding item: ', err);
    return { success: false, message: 'An unexpected error ocurred' };
  }
};
