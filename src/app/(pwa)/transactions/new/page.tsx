import TransactionForm from '@/features/transaction-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';

const NewTransactionPage = () => {
  return (
    <section className='flex py-6 justify-center'>
      <Card className='border-none w-full max-w-sm bg-transparent'>
        <CardHeader>
          <CardTitle>Registrar transacción</CardTitle>
          <CardDescription>Aquí puedes registrar tus transacciones</CardDescription>
        </CardHeader>
        <CardContent>
          <TransactionForm />
        </CardContent>
      </Card>
    </section>
  );
};

export default NewTransactionPage;
