export enum ExpenditureCategory {
  HousingAndRent = "Housing & Rent",
  Utilities = "Utilities",
  FoodAndGroceries = "Food & Groceries",
  Healthcare = "Healthcare",
  Transportation = "Transportation",
  Entertainment = "Entertainment",
  DebtRepayment = "Debt Repayment",
  CashWithdrawals = "Cash Withdrawals",
  ShoppingAndDiscretionary = "Shopping & Discretionary",
  BusinessExpenses = "Business Expenses",
  Insurance = "Insurance",
  Education = "Education",
  GovernmentAndTaxes = "Government & Taxes",
  Miscellaneous = "Miscellaneous",
}
export interface ExtractedTransactions {
  transaction_date: Date;
  value_date: Date;
  description: string;
  debit?: number;
  credit?: number;
  balance?: number;
  category: ExpenditureCategory;
}
