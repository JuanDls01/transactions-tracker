'use client';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table';
import { Transaction } from '@prisma/client';
import { useCallback, useMemo } from 'react';

export const columns = [
  { label: 'TRANSACCIÓN', uid: 'transaction' },
  { label: 'CATEGORÍA', uid: 'category' },
  { label: 'DESCRIPCIÓN', uid: 'description' },
  { label: 'ACCIONES', uid: 'actions' },
];

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

type MovementsTableProps = {
  transactions: Transaction[];
};

const MovementsTable = ({ transactions }: MovementsTableProps) => {
  const renderCell = useCallback((transaction: Transaction, columnKey: React.Key) => {
    const cellValue = transaction[columnKey as keyof Transaction];

    switch (columnKey) {
      case 'transaction':
        return (
          <div>{`${transaction.type === 'INCOME' ? '+' : '-'} ${transaction.amount} ${transaction.currency}`}</div>
        );
      case 'category':
        return <div>{`${categoryLabels[transaction.category]}`}</div>;
      case 'description':
        return <div className='hidden sm:table-cell'>{transaction.description}</div>;
      case 'actions':
        return (
          <>
            <div className='relative items-center gap-2 hidden sm:table-cell'>
              <p>Edit</p>
              <p>Delete</p>
            </div>
            <p className='table-cell sm:hidden'>...</p>
          </>
        );
      default:
        return <div>{JSON.stringify(cellValue)}</div>;
    }
  }, []);

  const classNames = useMemo(
    () => ({
      base: ['p-0'],
      wrapper: ['max-h-[382px]', 'max-w-3xl', 'bg-transparent', 'p-0 sm:p-4'],
      table: ['bg-transparent'],
      th: ['bg-transparent', 'text-default-500', 'border-b', 'border-divider'],
      td: [
        // changing the rows border radius
        // first
        'group-data-[first=true]/tr:first:before:rounded-none',
        'group-data-[first=true]/tr:last:before:rounded-none',
        // middle
        'group-data-[middle=true]/tr:before:rounded-none',
        // last
        'group-data-[last=true]/tr:first:before:rounded-none',
        'group-data-[last=true]/tr:last:before:rounded-none',
      ],
    }),
    [],
  );

  return (
    <Table
      aria-label='Example table with dynamic content'
      classNames={classNames}
      checkboxesProps={{
        classNames: {
          wrapper: 'after:bg-foreground after:text-background text-background',
        },
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            className={`${column.uid === 'description' && 'hidden sm:table-cell'}`}
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={transactions}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell className={`${columnKey === 'description' && 'hidden sm:table-cell'}`}>
                {renderCell(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default MovementsTable;
