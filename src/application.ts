import { Category, Loan, Investment, MarketplaceItem } from "./types";

export const generateMarketplaceList = (
  loanList: Loan[],
  investmentList: Investment[]
): MarketplaceItem[] => {
  const marketplaceList: MarketplaceItem[] = loanList.map((loan) => ({
    id: loan.id,
    category: loan.category,
    expiresAt: loan.expiresAt,
    totalRequestedAmount: loan.totalRequestedAmountCents / 100,
    totalInvestmentAmount: investmentList.reduce((acc, investment) => {
      if (investment.loanId === loan.id) {
        return investment.totalInvestedAmountCents / 100 + acc;
      }
      return acc;
    }, 0),
  }));
  return marketplaceList.sort(comparator);
};

const categoryWeight: Record<Category, number> = {
  [Category.Y]: 1,
  [Category.X]: 2,
  [Category.Z]: 3,
};

const comparator = (itemA: MarketplaceItem, itemB: MarketplaceItem): number => {
  if (categoryWeight[itemA.category] < categoryWeight[itemB.category]) {
    return 1;
  }
  if (categoryWeight[itemB.category] < categoryWeight[itemA.category]) {
    return -1;
  }
  if (itemA.expiresAt < itemB.expiresAt) {
    return -1;
  }

  if (itemA.expiresAt === itemB.expiresAt) {
    const position =
      itemA.totalRequestedAmount < itemB.totalRequestedAmount ? 1 : -1;
    return position;
  }
  return 1;
};
