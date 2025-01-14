import prismaClient from '@/lib/prisma';

const MovementsPage = async () => {
  const transactions = await getTransactions();
  if (!transactions) return <h1>No transactions found</h1>;
  return (
    <section className='flex flex-col space-y-4'>
      <h2>Registro de transacciones:</h2>
      {transactions?.map((transaction) => (
        <div key={transaction.id}>
          <p>{transaction.type}</p>
          <p>{transaction.currency}</p>
          <p>{transaction.amount}</p>
          <p>{transaction.description}</p>
          <p>{transaction.amount}</p>
        </div>
      ))}
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
