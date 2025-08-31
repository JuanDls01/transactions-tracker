import { Card, CardContent } from '@/ui/card';
import { Currency } from '@repo/db';
import { getCurrencyBalance } from '@/lib/services/dashboard';
import { parseDecimalToString } from '@/utils/numbers';

interface BalanceSummaryProps {
  searchParams: { currency?: string };
}

export async function BalanceSummary({ searchParams }: BalanceSummaryProps) {
  const balances = await getCurrencyBalance();

  const selectedCurrency = searchParams.currency as Currency;
  const filteredBalances = selectedCurrency
    ? Object.fromEntries(Object.entries(balances).filter(([currency]) => currency === selectedCurrency))
    : balances;

  if (Object.keys(filteredBalances).length === 0) {
    return (
      <Card className='col-span-full bg-card border-0 shadow-sm'>
        <CardContent className='p-6'>
          <div className='text-center text-muted-foreground'>
            No hay transacciones para la moneda seleccionada
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='grid gap-4 md:grid-cols-2'>
      {Object.entries(filteredBalances).map(([currency, balance]) => {
        return (
          <Card key={currency} className='bg-card border-0 shadow-sm'>
            <CardContent className='p-6'>
              <div className='text-sm text-muted-foreground mb-2'>Saldo en {currency}</div>
              <div className='text-3xl font-bold text-card-foreground'>
                ${parseDecimalToString(balance)}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
