import { prisma } from '@/lib/prisma';
import { parseDecimalToString } from '@/utils/numbers';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/elements/card';
import Link from 'next/link';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/ui/elements/pagination';
import { DataTable } from '@/ui/components/data-table';
import { auth } from '@/app/auth';
import { transactionColumns } from './transaction-columns';

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
      <Card className='border-none py-6 space-y-4'>
        <CardHeader>
          <CardTitle>Registro de transacciones</CardTitle>
          <CardDescription>
            Estas son todas tus transacciones transacciones. Si quieres agregar una nueva haz click{' '}
            <Link href={'/transactions/new'} className='underline underline-offset-4'>
              aquí
            </Link>
          </CardDescription>
        </CardHeader>
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

const DEFAULT_PAGE_SIZE = 10;

const getTransactions = async (currentPage: number) => {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    const [transactions, totalRecords] = await Promise.all([
      prisma.transaction.findMany({
        where: { authorId: userId },
        orderBy: { createdAt: 'desc' },
        skip: DEFAULT_PAGE_SIZE * (currentPage - 1),
        take: DEFAULT_PAGE_SIZE,
      }),
      prisma.transaction.count({
        where: {
          authorId: userId,
        },
      }),
    ]);

    const formattedTransactions = transactions.map((t) => ({
      ...t,
      amount: parseDecimalToString(t.amount),
    }));

    return { transactions: formattedTransactions, totalPages: Math.ceil(totalRecords / DEFAULT_PAGE_SIZE) };
  } catch (error) {
    console.error('Error scanning items:', error);
    throw error;
  }
};

export default MovementsPage;
