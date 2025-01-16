'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/elements/dropdown-menu';
import { EllipsisHorizontalIcon } from '@heroicons/react/16/solid';
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
        <div
          className={`text-right font-medium pr-4`}
        >{`${type === 'INCOME' ? '+' : '-'} $${amount} ${currency}`}</div>
      );
    },
  },
  {
    id: 'category',
    header: () => <p className='text-left'>Categoría</p>,
    cell: ({ row }) => {
      const { category } = row.original;
      const label = categoryLabels[category];
      return <div>{`${label}`}</div>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: () => <p className='text-left'>Fecha</p>,
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'));
      const formattedDate = date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      });
      return <div>{`${formattedDate}`}</div>;
    },
  },
  {
    accessorKey: 'description',
    header: () => <p className='text-left'>Descripción</p>,
    cell: ({ row }) => {
      const description = row.getValue('description');
      return <div>{`${description}`}</div>;
    },
  },
  {
    id: 'actions',
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className='h-4 w-4 p-0 appearance-none outline-none'>
              <EllipsisHorizontalIcon />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Editar</DropdownMenuItem>
            <DropdownMenuItem>Eliminar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
