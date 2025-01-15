import prisma from '@/lib/prisma';
import MovementsTable from '@/ui/components/MovementsTable';

const MovementsPage = async () => {
  const transactions = await getTransactions();
  if (!transactions) return <h1>No transactions found</h1>;
  return (
    <section className='flex flex-col space-y-4'>
      <h2>Registro de transacciones:</h2>
      <MovementsTable transactions={transactions} />
    </section>
  );
};

const getTransactions = async () => {
  try {
    const transactions = await prisma.transaction.findMany();
    return transactions;
  } catch (error) {
    console.error('Error scanning items:', error);
  }
};

export default MovementsPage;
