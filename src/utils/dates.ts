export const firstDayOfMonth = (date = new Date()) => new Date(date.getFullYear(), date.getMonth(), 1);

export const lastDayOfMonth = (date = new Date()) => new Date(date.getFullYear(), date.getMonth() + 1, 0);

export const firstDay6MonthEarlier = (date = new Date()) =>
  new Date(date.getFullYear(), date.getMonth() - 6, 1);

export const getMonthOptions = (numMonths = 12) => {
  const options = [];
  const today = new Date();
  for (let i = 0; i < numMonths; i++) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const month = date.getMonth() + 1; // 1-indexed month
    const year = date.getFullYear();
    options.push({
      label: date.toLocaleString('es-ES', { month: 'long', year: 'numeric' }),
      value: `${year}-${month.toString().padStart(2, '0')}`, // Format YYYY-MM
    });
  }
  return options;
};
