import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

/**
 * Custom hook for managing URL search parameters
 * Provides utilities to update URL filters without full page reload
 */
export function useUrlFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(key, value);
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const updateFilters = useCallback(
    (filters: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(filters).forEach(([key, value]) => {
        params.set(key, value);
      });
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const removeFilter = useCallback(
    (key: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(key);
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const getFilter = useCallback(
    (key: string, defaultValue?: string) => {
      return searchParams.get(key) ?? defaultValue;
    },
    [searchParams],
  );

  return {
    updateFilter,
    updateFilters,
    removeFilter,
    getFilter,
    searchParams,
  };
}
