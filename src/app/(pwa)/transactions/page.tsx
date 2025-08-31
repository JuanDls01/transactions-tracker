import { Card, CardContent } from '@/ui/card';
import Link from 'next/link';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/ui/pagination';
import { DataTable } from '@/features/data-table';
import { transactionColumns } from './transaction-columns';
import { getTransactions } from '@/lib/services/transactions';

const MovementsPage = async (props: {
  searchParams?: Promise<{
    page?: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const { transactions } = await getTransactions(currentPage);
  if (!transactions.length) return <h1>Aún no has registrado transacciones</h1>;
  return (
    <div className='flex flex-col space-y-4'>
      <div className='py-6'>
        <h1 className='text-3xl mb-2 sm:text-4xl font-bold pt-4 sm:pt-6'>Registro de transacciones</h1>
        <p className='text-base sm:text-lg text-muted-foreground'>
          Estas son todas tus transacciones transacciones. Si quieres agregar una nueva haz click{' '}
          <Link href={'/transactions/new'} className='underline underline-offset-4'>
            aquí
          </Link>
        </p>
      </div>
      <Card className='border-none py-6 space-y-4'>
        <CardContent className='px-0 sm:px-0 space-y-4'>
          <DataTable columns={transactionColumns} data={transactions} />
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href={`/transactions?page=${currentPage - 1}`} />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href={`/transactions?page=${currentPage + 1}`} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>
    </div>
  );
};

export default MovementsPage;
