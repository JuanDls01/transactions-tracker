export enum TransactionCategory {
  Leisure = 'LEISURE',
  Health = 'HEALTH',
  Home = 'HOME',
  Subscriptions = 'SUBSCRIPTIONS',
  Car = 'CAR',
  Food = 'FOOD',
  SavingsInvestments = 'SAVINGS/INVESTMENTS',
  Education = 'EDUCATION',
  Travel = 'TRAVEL',
  Work = 'WORK',
  Miscellaneous = 'MISCELLANEOUS',
}

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  category: TransactionCategory;
  description?: string;
  date: string;
  userId: string;
}
