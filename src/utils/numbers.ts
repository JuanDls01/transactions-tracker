import { Decimal } from '@prisma/client/runtime/library';

// Transform decimal to string with dot and comma.
// E.g.: 1000.00 => 1,000.00
export const parseDecimalToString = (decimal: Decimal | number) =>
  Number(decimal).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
