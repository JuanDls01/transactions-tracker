import TransactionForm from '@/features/transaction-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import { cardStyles } from '@/lib/card-styles';

const NewTransactionPage = () => {
  return (
    <div className='flex pb-24 sm:pb-6 justify-center'>
      <Card className={`${cardStyles.themed} w-full max-w-sm`}>
        <CardHeader className='p-6'>
          <CardTitle className='text-card-foreground'>Registrar transacción</CardTitle>
          <CardDescription>Aquí puedes registrar tus transacciones</CardDescription>
        </CardHeader>
        <CardContent className='p-6 pt-0'>
          <TransactionForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default NewTransactionPage;
