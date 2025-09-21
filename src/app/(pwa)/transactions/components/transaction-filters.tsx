'use client';

import FilterModal from './filter-modal';
import ActiveFilters from './active-filters';

const TransactionFilters = () => {
  const { filterPills, clearAllButton } = ActiveFilters();

  return (
    <div className="space-y-3">
      {/* Primera línea: FILTROS y BORRAR TODO con space-between */}
      <div className="flex items-center justify-between">
        <FilterModal />
        {clearAllButton}
      </div>

      {/* Segunda línea: Pills de filtros activos */}
      {filterPills && (
        <div className="flex flex-wrap items-center gap-2">
          {filterPills}
        </div>
      )}
    </div>
  );
};

export default TransactionFilters;