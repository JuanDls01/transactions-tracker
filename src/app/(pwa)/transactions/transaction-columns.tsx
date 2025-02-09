'use client';

import { Badge } from '@/ui/elements/badge';
import { Button } from '@/ui/elements/button';
import { CardContent } from '@/ui/elements/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/elements/dropdown-menu';
import { Transaction } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { Ellipsis, MinusCircle, PlusCircleIcon } from 'lucide-react';
import DeleteTransactionBttn from './components/delete-transaction-bttn';

const categoryLabels = {
  FOOD: 'Comida',
  LEISURE: 'Ocio',
  HEALTH: 'Salud',
  HOME: 'Hogar',
  SUBSCRIPTIONS: 'Subscripciones',
  SAVINGS: 'Ahorro',
  EDUCATION: 'Educación',
  TRAVEL: 'Viajes',
  WORK: 'Trabajo',
  CAR: 'Auto',
  MISCELLANEOUS: 'Otro',
};

export const transactionColumns: ColumnDef<Omit<Transaction, 'amount'> & { amount: string }>[] = [
  {
    id: 'amount',
    header: () => <p className='text-left'>Monto</p>,
    cell: ({ row }) => {
      const { amount, currency, type, category } = row.original;
      return (
        <CardContent className='p-0 sm:p-0 flex flex-row items-center space-x-2'>
          {type === 'INCOME' ? (
            <PlusCircleIcon className='text-income w-4 h-auto' />
          ) : (
            <MinusCircle className='text-outcome w-4 h-auto' />
          )}
          <p>{`$${amount}`}</p>
          <span>
            <p className='text-xs flex items-center h-5'>{currency}</p>
          </span>

          <Badge variant={'outline'}>
            <p className='max-w-12 overflow-hidden text-ellipsis'>{categoryLabels[category]}</p>
          </Badge>
        </CardContent>
      );
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
      return <CardContent className='p-0 sm:p-0 text-xs'>{`${formattedDate}`}</CardContent>;
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
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className='w-8 h-auto' variant='ghost'>
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Editar</DropdownMenuItem>
            <DropdownMenuItem>
              <DeleteTransactionBttn transactionId={row.original.id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
