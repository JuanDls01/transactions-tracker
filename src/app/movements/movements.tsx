'use client';

import { Transaction } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';

const categoryLabels = {
  FOOD: '🍽️ Comida',
  LEISURE: '🎮 Ocio',
  HEALTH: '🩺 Salud',
  HOME: '🏠 Hogar',
  SUBSCRIPTIONS: '📺 Subscripciones',
  SAVINGS: '💰 Ahooro / Inversiones',
  EDUCATION: '📚 Educación',
  TRAVEL: '✈️ Viajes',
  WORK: '💼 Trabajo',
  CAR: '🚗 Auto ',
  MISCELLANEOUS: '🧩 Otro',
};

export const columns: ColumnDef<Transaction>[] = [
  {
    id: 'amount',
    header: () => <p className='text-left'>Monto</p>,
    cell: ({ row }) => {
      const { amount, currency, type } = row.original;
      return (
        <div className='text-right font-medium'>{`${type === 'INCOME' ? '+' : '-'} ${amount} ${currency}`}</div>
      );
    },
  },
  {
    id: 'category',
    header: () => <p className='text-left'>Categoría</p>,
    cell: ({ row }) => {
      const { category } = row.original;
      const label = categoryLabels[category];
      return <div className='text-right font-medium'>{`${label}`}</div>;
    },
  },
  {
    accessorKey: 'description',
    header: () => <p className='text-left'>Descripción</p>,
    cell: ({ row }) => {
      const description = row.getValue('description');
      return <div className='text-right font-medium'>{`${description}`}</div>;
    },
  },
];
