export const firstDayOfMonth = (date = new Date()) => new Date(date.getFullYear(), date.getMonth(), 1);

export const lastDayOfMonth = (date = new Date()) => new Date(date.getFullYear(), date.getMonth() + 1, 0);

export const firstDay6MonthEarlier = (date = new Date()) =>
  new Date(date.getFullYear(), date.getMonth() - 6, 1);
