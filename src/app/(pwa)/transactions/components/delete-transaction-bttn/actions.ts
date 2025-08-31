'use server';

import { auth } from '@/app/auth';
import { prisma } from '@repo/db';
import { revalidatePath } from 'next/cache';

export const deleteTransactionAction = async (id: number) => {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return { success: false, message: 'Usuario no autenticado' };
    }
    const transactionDeleted = await prisma.transaction.delete({ where: { id } });
    revalidatePath('/transactions');
    return {
      success: true,
      message: `Transacción eliminada exitosamente. Monto ${transactionDeleted.amount}`,
    };
  } catch {
    return { success: false, message: 'Ups! Algo salió mal' };
  }
};
