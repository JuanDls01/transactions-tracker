import TransactionForm from '@/ui/components/transaction-form';
import { CardTitle } from '@/ui/elements/card';

const NewTransactionPage = () => {
  return (
    <>
      <CardTitle className='pb-4'>Registrar transacción</CardTitle>
      <TransactionForm />
    </>
  );
};

export default NewTransactionPage;
