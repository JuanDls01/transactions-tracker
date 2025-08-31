import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import { DataTable } from '@/features/data-table';
import Link from 'next/link';
import { parseDecimalToString } from '@/utils/numbers';
import { transactionColumns } from '../transactions/transaction-columns';
import { getTransactions } from '@/lib/services/transactions';
import { getCurrencyBalance } from '@/lib/services/dashboard';

const HomePage = async () => {
  const [currencyBalance, { transactions }] = await Promise.all([
    getCurrencyBalance(),
    getTransactions(1, 5),
  ]);

  return (
    <div className='space-y-6 p-6 pb-24 sm:pb-6'>
        <div>
          <h1 className='text-3xl mb-2 sm:text-4xl font-bold text-foreground'>
            Resumen de cuenta
          </h1>
          <p className='text-base sm:text-lg text-muted-foreground'>
            Aquí encontraras un resumen de tus gastos
          </p>
        </div>
        <div className='space-y-4'>
          {Object.keys(currencyBalance).map((key) => (
            <Card key={key} className='bg-card border-0 shadow-sm'>
              <CardContent className='p-6'>
                <div className='text-sm text-muted-foreground mb-2'>Total de {key}</div>
                <CardTitle className='text-2xl font-bold text-card-foreground'>
                  ${parseDecimalToString(currencyBalance[key])} {key}
                </CardTitle>
                <CardDescription className='text-xs mt-1'>+20.1% from last month</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className='bg-card border-0 shadow-sm'>
          <CardHeader className='p-6'>
            <CardTitle className='text-card-foreground'>Transacciones recientes</CardTitle>
            <CardDescription>
              Estas son tus últimas transacciones. Ve el listado completo{' '}
              <Link href={'/transactions'} className='underline underline-offset-4'>
                aquí
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent className='p-6 pt-0'>
            <DataTable columns={transactionColumns} data={transactions} />
          </CardContent>
        </Card>
    </div>
  );
};

export default HomePage;
