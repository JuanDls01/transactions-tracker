import { Button } from '@/ui/elements/button';
import { deleteTransactionAction } from './actions';
import { toast } from '@/hooks/use-toast';

type DeleteTransactionBttnPropsType = {
  transactionId: number;
};

const DeleteTransactionBttn = ({ transactionId }: DeleteTransactionBttnPropsType) => {
  const handleDelete = async (transactionId: number) => {
    const { success, message } = await deleteTransactionAction(transactionId);
    toast({
      variant: success ? undefined : 'destructive',
      title: 'Eliminar transacción',
      description: message,
    });
  };
  return (
    <Button
      type='submit'
      variant='ghost'
      onClick={() => handleDelete(transactionId)}
      className='p-0 w-full text-start flex justify-start h-auto'
    >
      Eliminar
    </Button>
  );
};

export default DeleteTransactionBttn;
