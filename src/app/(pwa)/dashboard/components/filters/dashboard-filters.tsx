'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select';
import { CURRENCY_OPTIONS } from '@/lib/constants';

export function DashboardFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'all') {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`?${params.toString()}`);
  };

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const months = [
    { value: '1', label: 'Enero' },
    { value: '2', label: 'Febrero' },
    { value: '3', label: 'Marzo' },
    { value: '4', label: 'Abril' },
    { value: '5', label: 'Mayo' },
    { value: '6', label: 'Junio' },
    { value: '7', label: 'Julio' },
    { value: '8', label: 'Agosto' },
    { value: '9', label: 'Septiembre' },
    { value: '10', label: 'Octubre' },
    { value: '11', label: 'Noviembre' },
    { value: '12', label: 'Diciembre' },
  ];

  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  return (
    <div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
      <Select
        value={searchParams.get('currency') || 'all'}
        onValueChange={(value) => updateFilter('currency', value)}
      >
        <SelectTrigger className='w-full sm:w-[180px]'>
          <SelectValue placeholder='Todas las monedas' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>Todas las monedas</SelectItem>
          {CURRENCY_OPTIONS.map((currency) => (
            <SelectItem key={currency.key} value={currency.key}>
              {currency.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={searchParams.get('month') || currentMonth.toString()}
        onValueChange={(value) => updateFilter('month', value)}
      >
        <SelectTrigger className='w-full sm:w-[140px]'>
          <SelectValue placeholder='Mes' />
        </SelectTrigger>
        <SelectContent>
          {months.map((month) => (
            <SelectItem key={month.value} value={month.value}>
              {month.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={searchParams.get('year') || currentYear.toString()}
        onValueChange={(value) => updateFilter('year', value)}
      >
        <SelectTrigger className='w-full sm:w-[100px]'>
          <SelectValue placeholder='Año' />
        </SelectTrigger>
        <SelectContent>
          {years.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
