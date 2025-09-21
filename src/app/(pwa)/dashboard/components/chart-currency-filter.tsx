'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select';
import { CURRENCY_OPTIONS } from '@/lib/constants';

const ChartCurrencyFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCurrency = searchParams.get('chartCurrency') || 'ARS';

  const handleCurrencyChange = (currency: string) => {
    const params = new URLSearchParams(searchParams);
    if (currency === 'ARS') {
      params.delete('chartCurrency');
    } else {
      params.set('chartCurrency', currency);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Moneda:</span>
      <Select value={currentCurrency} onValueChange={handleCurrencyChange}>
        <SelectTrigger className="w-24">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {CURRENCY_OPTIONS.map((option) => (
            <SelectItem key={option.key} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ChartCurrencyFilter;