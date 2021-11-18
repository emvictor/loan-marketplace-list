import { generateMarketplaceList } from "./application";
import { Category, Investment, Loan, MarketplaceItem } from "./types";

describe("generateMarketplaceList()", () => {
  it("Should return an empty list", () => {
    const emptyCaseMockedInvestmentList: Investment[] = [
      {
        id: "1",
        totalInvestedAmountCents: 10000,
        loanId: "10",
      },
      {
        id: "2",
        totalInvestedAmountCents: 15000,
        loanId: "10",
      },
      {
        id: "3",
        totalInvestedAmountCents: 21000,
        loanId: "11",
      },
      {
        id: "4",
        totalInvestedAmountCents: 13000,
        loanId: "12",
      },
      {
        id: "5",
        totalInvestedAmountCents: 17000,
        loanId: "12",
      },
    ];
    expect(
      generateMarketplaceList([], emptyCaseMockedInvestmentList)
    ).toStrictEqual([]);
  });
  it("Should sort by category", () => {
    const categoryCaseMockedInvestmentList: Investment[] = [
      {
        id: "1",
        totalInvestedAmountCents: 10000,
        loanId: "10",
      },
      {
        id: "2",
        totalInvestedAmountCents: 15000,
        loanId: "10",
      },
      {
        id: "3",
        totalInvestedAmountCents: 21000,
        loanId: "11",
      },
      {
        id: "4",
        totalInvestedAmountCents: 13000,
        loanId: "12",
      },
      {
        id: "5",
        totalInvestedAmountCents: 17000,
        loanId: "12",
      },
    ];
    const categoryCaseMockedLoanList: Loan[] = [
      {
        id: "12",
        totalRequestedAmountCents: 10000,
        category: Category.Z,
        expiresAt: new Date("2020-03-18"),
      },
      {
        id: "11",
        totalRequestedAmountCents: 15000,
        category: Category.Y,
        expiresAt: new Date("2020-03-18"),
      },
      {
        id: "13",
        totalRequestedAmountCents: 50000,
        category: Category.X,
        expiresAt: new Date("2020-03-18"),
      },
    ];
    const categoryCaseExpectedResult: MarketplaceItem[] = [
      {
        id: "12",
        totalRequestedAmount: 100,
        category: Category.Z,
        totalInvestmentAmount: 300,
        expiresAt: new Date("2020-03-18"),
      },
      {
        id: "13",
        totalRequestedAmount: 500,
        category: Category.X,
        totalInvestmentAmount: 0,
        expiresAt: new Date("2020-03-18"),
      },
      {
        id: "11",
        totalRequestedAmount: 150,
        category: Category.Y,
        totalInvestmentAmount: 210,
        expiresAt: new Date("2020-03-18"),
      },
    ];
    expect(
      generateMarketplaceList(
        categoryCaseMockedLoanList,
        categoryCaseMockedInvestmentList
      )
    ).toStrictEqual(categoryCaseExpectedResult);
  });
  it("Should order by expiresAt", () => {
    const expiresAtMockedInvestmentList: Investment[] = [
      {
        id: "1",
        totalInvestedAmountCents: 21000,
        loanId: "11",
      },
      {
        id: "2",
        totalInvestedAmountCents: 13000,
        loanId: "12",
      },
      {
        id: "3",
        totalInvestedAmountCents: 17000,
        loanId: "12",
      },
    ];
    const expiresAtCaseMockedLoanList: Loan[] = [
      {
        id: "11",
        totalRequestedAmountCents: 10000,
        category: Category.X,
        expiresAt: new Date("2015-03-18"),
      },
      {
        id: "12",
        totalRequestedAmountCents: 15000,
        category: Category.X,
        expiresAt: new Date("2020-08-01"),
      },
      {
        id: "13",
        totalRequestedAmountCents: 70000,
        category: Category.X,
        expiresAt: new Date("2020-03-18"),
      },
    ];
    const expiresAtCaseExpectedResult: MarketplaceItem[] = [
      {
        id: "11",
        totalRequestedAmount: 100,
        category: Category.X,
        totalInvestmentAmount: 210,
        expiresAt: new Date("2015-03-18"),
      },
      {
        id: "13",
        totalRequestedAmount: 700,
        category: Category.X,
        totalInvestmentAmount: 0,
        expiresAt: new Date("2020-03-18"),
      },
      {
        id: "12",
        totalRequestedAmount: 150,
        category: Category.X,
        totalInvestmentAmount: 300,
        expiresAt: new Date("2020-08-01"),
      },
    ];
    expect(
      generateMarketplaceList(
        expiresAtCaseMockedLoanList,
        expiresAtMockedInvestmentList
      )
    ).toStrictEqual(expiresAtCaseExpectedResult);
  });
  it("Should order by expiresAt and category", () => {
    const mockedInvestmentList: Investment[] = [
      {
        id: "1",
        totalInvestedAmountCents: 10000,
        loanId: "10",
      },
      {
        id: "2",
        totalInvestedAmountCents: 15000,
        loanId: "10",
      },
      {
        id: "3",
        totalInvestedAmountCents: 21000,
        loanId: "11",
      },
      {
        id: "4",
        totalInvestedAmountCents: 13000,
        loanId: "12",
      },
      {
        id: "5",
        totalInvestedAmountCents: 17000,
        loanId: "12",
      },
    ];
    const mockedLoanList: Loan[] = [
      {
        id: "10",
        totalRequestedAmountCents: 20000,
        category: Category.X,
        expiresAt: new Date("2020-06-15"),
      },
      {
        id: "12",
        totalRequestedAmountCents: 10000,
        category: Category.Z,
        expiresAt: new Date("2015-04-23"),
      },
      {
        id: "13",
        totalRequestedAmountCents: 50000,
        category: Category.X,
        expiresAt: new Date("2020-03-18"),
      },
      {
        id: "11",
        totalRequestedAmountCents: 15000,
        category: Category.Y,
        expiresAt: new Date("2019-08-23"),
      },
      {
        id: "14",
        totalRequestedAmountCents: 70000,
        category: Category.Z,
        expiresAt: new Date("2020-03-18"),
      },
    ];
    const expectedResult: MarketplaceItem[] = [
      {
        id: "12",
        totalRequestedAmount: 100,
        category: Category.Z,
        totalInvestmentAmount: 300,
        expiresAt: new Date("2015-04-23"),
      },
      {
        id: "14",
        totalRequestedAmount: 700,
        category: Category.Z,
        totalInvestmentAmount: 0,
        expiresAt: new Date("2020-03-18"),
      },
      {
        id: "13",
        totalRequestedAmount: 500,
        category: Category.X,
        totalInvestmentAmount: 0,
        expiresAt: new Date("2020-03-18"),
      },
      {
        id: "10",
        totalRequestedAmount: 200,
        category: Category.X,
        totalInvestmentAmount: 250,
        expiresAt: new Date("2020-06-15"),
      },
      {
        id: "11",
        totalRequestedAmount: 150,
        category: Category.Y,
        totalInvestmentAmount: 210,
        expiresAt: new Date("2019-08-23"),
      },
    ];
    expect(
      generateMarketplaceList(mockedLoanList, mockedInvestmentList)
    ).toStrictEqual(expectedResult);
  });
});
