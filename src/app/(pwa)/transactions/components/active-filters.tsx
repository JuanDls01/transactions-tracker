'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { X } from 'lucide-react';
import { CURRENCY_OPTIONS, TRANSACTION_CATEGORY_LABELS } from '@/lib/constants';
import { Currency, TransactionType, TransactionCategory } from '@repo/db';
import { validateCurrency, validateTransactionType, validateTransactionCategory } from '@/utils/url-validation';

const ActiveFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCurrency = validateCurrency(searchParams.get('currency'));
  const currentType = validateTransactionType(searchParams.get('type'));
  const currentCategory = validateTransactionCategory(searchParams.get('category'));

  const hasActiveFilters = currentCurrency || currentType || currentCategory;

  const removeFilter = (filterKey: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete(filterKey);
    params.delete('page'); // Reset to page 1
    router.push(`?${params.toString()}`);
  };

  const clearAllFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('currency');
    params.delete('type');
    params.delete('category');
    params.delete('page');
    router.push(`?${params.toString()}`);
  };

  const getCurrencyLabel = (currency: Currency) => {
    return CURRENCY_OPTIONS.find(option => option.value === currency)?.label || currency;
  };

  const getTypeLabel = (type: TransactionType) => {
    return type === TransactionType.INCOME ? 'Ingreso' : 'Gasto';
  };

  const getCategoryLabel = (category: TransactionCategory) => {
    return TRANSACTION_CATEGORY_LABELS[category];
  };

  const filterPills = (
    <>
      {currentCurrency && (
        <Badge variant="secondary" className="flex items-center gap-1">
          <span>Moneda: {getCurrencyLabel(currentCurrency)}</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-0 hover:bg-transparent"
            onClick={() => removeFilter('currency')}
            aria-label={`Remover filtro de moneda ${getCurrencyLabel(currentCurrency)}`}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remover filtro</span>
          </Button>
        </Badge>
      )}

      {currentType && (
        <Badge variant="secondary" className="flex items-center gap-1">
          <span>Tipo: {getTypeLabel(currentType)}</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-0 hover:bg-transparent"
            onClick={() => removeFilter('type')}
            aria-label={`Remover filtro de tipo ${getTypeLabel(currentType)}`}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remover filtro</span>
          </Button>
        </Badge>
      )}

      {currentCategory && (
        <Badge variant="secondary" className="flex items-center gap-1">
          <span>Categoría: {getCategoryLabel(currentCategory)}</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-0 hover:bg-transparent"
            onClick={() => removeFilter('category')}
            aria-label={`Remover filtro de categoría ${getCategoryLabel(currentCategory)}`}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remover filtro</span>
          </Button>
        </Badge>
      )}
    </>
  );

  const clearAllButton = hasActiveFilters ? (
    <Button
      variant="outline"
      size="sm"
      onClick={clearAllFilters}
      className="h-7 text-xs"
      aria-label="Borrar todos los filtros activos"
    >
      BORRAR TODO
    </Button>
  ) : null;

  return {
    filterPills: hasActiveFilters ? filterPills : null,
    clearAllButton,
  };
};

export default ActiveFilters;