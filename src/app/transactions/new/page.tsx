import TransactionForm from '@/ui/components/transaction-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/elements/card';

const NewTransactionPage = () => {
  return (
    <section className='flex'>
      <Card className='border-none'>
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
