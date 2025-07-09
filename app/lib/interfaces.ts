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

export interface Users {
  email: string;
  name: string;
  created_at: Date;
}

export interface UserRiskProfile {
  userId: string;
  totalIncome: number;
  totalSpending: number;
  riskScore: number;
  suspiciousFlags: string[];
  approvedForLoan: boolean;
  summary: string;
  lastUpdated: Date;
  documentCount: number;
}

export interface UserDocuments {
  id: string;
  userId: string;
  filename: string;
  uploadedAt: Date;
  extractedText: string;
  totalIncome: number;
  totalSpending: number;
  transactions: ExtractedTransactions[];
  suspiciousFlags: string[];
  summary: string;
}
