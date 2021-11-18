export enum Category {
  X = "X",
  Y = "Y",
  Z = "Z",
}

export interface Loan {
  id: string;
  totalRequestedAmountCents: number;
  category: Category;
  expiresAt: Date;
}

export interface Investment {
  id: string;
  totalInvestedAmountCents: number;
  loanId: string;
}

export interface MarketplaceItem {
  id: string;
  totalRequestedAmount: number;
  category: Category;
  totalInvestmentAmount: number;
  expiresAt: Date;
}
