'use server';
import { schema } from './schemas';
import { ActionResponse } from '@/types/actions';
import { prisma } from '@/lib/prisma';
import { auth } from '@/app/auth';
import { revalidatePath } from 'next/cache';

export async function onSubmitTransaction(_: ActionResponse<typeof schema> | null, formData: FormData) {
  const id = formData.get('id');

  if (id) {
    return await updateTransaction(formData); // Si hay un ID, actualizar
  } else {
    return await createTransaction(formData); // Si no, crear
  }
}

export const createTransaction = async (data: FormData): Promise<ActionResponse<typeof schema>> => {
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

const updateTransaction = async (data: FormData): Promise<ActionResponse<typeof schema>> => {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return { success: false, message: 'Usuario no autenticado' };
    }
    const formData = Object.fromEntries(data);
    const transactionId = Number(formData.id);
    const parsed = schema.safeParse({ ...formData, id: transactionId });

    if (!parsed.success) {
      console.log({ errors: parsed.error.flatten().fieldErrors, err: parsed.error });
      return {
        success: false,
        message: 'Por favor corrija los errores del formulario',
        errors: parsed.error.flatten().fieldErrors,
        inputs: formData,
      };
    }

    const { id, ...transactionData } = parsed.data;

    await prisma.transaction.update({
      where: {
        id: id,
      },
      data: transactionData,
    });

    revalidatePath('/transactions');

    return { success: true, message: 'Transacción guardada exitosamente!' };
  } catch (err) {
    console.error('Error adding item: ', err);
    return { success: false, message: 'An unexpected error ocurred' };
  }
};
