import prismaClient from '@/lib/prisma';
import { columns } from './movements';
import { DataTable } from '../../ui/components/data-table';

const MovementsPage = async () => {
  const transactions = await getTransactions();
  if (!transactions) return <h1>No transactions found</h1>;
  return (
    <section className='flex flex-col space-y-4'>
      <h2>Registro de transacciones:</h2>
      <DataTable columns={columns} data={transactions} />
    </section>
  );
};

const getTransactions = async () => {
  try {
    const transactions = await prismaClient.transaction.findMany();
    return transactions;
  } catch (error) {
    console.error('Error scanning items:', error);
    throw error;
  }
};

export default MovementsPage;
