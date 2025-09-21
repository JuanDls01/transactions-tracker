'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/dialog';
import { Button } from '@/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select';
import { Label } from '@/ui/label';
import { Filter } from 'lucide-react';
import { CURRENCY_OPTIONS, TRANSACTION_CATEGORY_OPTIONS } from '@/lib/constants';
import { TransactionType } from '@repo/db';

const FilterModal = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  // Get current filter values
  const currentCurrency = searchParams.get('currency') || '';
  const currentType = searchParams.get('type') || '';
  const currentCategory = searchParams.get('category') || '';

  // Local state for form
  const [currency, setCurrency] = useState(currentCurrency);
  const [type, setType] = useState(currentType);
  const [category, setCategory] = useState(currentCategory);

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);

    // Update or remove currency filter
    if (currency && currency !== 'all') {
      params.set('currency', currency);
    } else {
      params.delete('currency');
    }

    // Update or remove type filter
    if (type && type !== 'all') {
      params.set('type', type);
    } else {
      params.delete('type');
    }

    // Update or remove category filter
    if (category && category !== 'all') {
      params.set('category', category);
    } else {
      params.delete('category');
    }

    // Reset to page 1
    params.delete('page');

    router.push(`?${params.toString()}`);
    setOpen(false);
  };

  const resetFilters = () => {
    setCurrency('');
    setType('');
    setCategory('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2 text-xs font-medium">
          <Filter className="h-4 w-4" />
          FILTROS
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Filtrar transacciones</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="currency">Moneda</Label>
            <Select value={currency || 'all'} onValueChange={setCurrency}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar moneda" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las monedas</SelectItem>
                {CURRENCY_OPTIONS.map((option) => (
                  <SelectItem key={option.key} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Tipo</Label>
            <Select value={type || 'all'} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>
                <SelectItem value={TransactionType.INCOME}>Ingreso</SelectItem>
                <SelectItem value={TransactionType.EXPENSE}>Gasto</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoría</Label>
            <Select value={category || 'all'} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                {TRANSACTION_CATEGORY_OPTIONS.map((option) => (
                  <SelectItem key={option.key} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-between">
          <Button variant="outline" onClick={resetFilters}>
            Limpiar
          </Button>
          <Button onClick={applyFilters}>
            Aplicar filtros
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterModal;