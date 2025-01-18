import prismaDb from '@/lib/prisma';
import { transactionColumns } from '../../ui/components/transaction-columns';
import { DataTable } from '../../ui/components/data-table';
import { parseDecimalToString } from '@/utils/numbers';

const MovementsPage = async () => {
  const transactions = await getTransactions();
  if (!transactions) return <h1>No transactions found</h1>;
  const formattedTransactions = transactions.map((t) => ({
    ...t,
    amount: parseDecimalToString(t.amount),
  }));
  return (
    <section className='flex flex-col space-y-4'>
      <h2>Registro de transacciones:</h2>
      <DataTable columns={transactionColumns} data={formattedTransactions} />
    </section>
  );
};

const getTransactions = async () => {
  try {
    const transactions = await prismaDb.transaction.findMany();
    return transactions;
  } catch (error) {
    console.error('Error scanning items:', error);
    throw error;
  }
};

export default MovementsPage;
