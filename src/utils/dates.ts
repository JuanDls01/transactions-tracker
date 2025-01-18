export const firstDateOfMonth = (date = new Date()) => new Date(date.getFullYear(), date.getMonth(), 1);

export const lastDateOfMonth = (date = new Date()) => new Date(date.getFullYear(), date.getMonth() + 1, 0);
