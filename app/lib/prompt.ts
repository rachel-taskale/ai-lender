export function buildDocumentAnalysisPrompt(fileName: string, text: string[]) {
  return `
You are a certified CPA and expert financial analyst. Your job is to assess the financial health of a small business using a single bank statement: "${fileName}".

### Your tasks:
1. **Extract all transactions** from the statement in the following format:

\`\`\`json
{
  "transaction_date": "YYYY-MM-DD",
  "value_date": "YYYY-MM-DD",
  "description": "string",
  "debit"?: number,
  "credit"?: number,
  "balance"?: number,
  "category": "ExpenditureCategory"
}
\`\`\`

The **category** must be one of the following:

\`\`\`ts
enum ExpenditureCategory {
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
  Miscellaneous = "Miscellaneous"
}
\`\`\`

2. **Calculate totals**:
   - \`total_income\`: sum of all credits
   - \`total_expense\`: sum of all debits

3. **Identify suspicious activity**, such as:
   - unusually large transactions
   - frequent cash withdrawals
   - inconsistent or missing income
   - overdraft behavior or negative balances

4. **Summarize** the business’s financial health for this document only.

---

### 🔁 Output Format (JSON only):
\`\`\`json
{
  "transactions": [...],
  "analysis": {
    "total_income": number,
    "total_expense": number,
    "suspicious_flags": string[],
    "summary": "string"
  }
}
\`\`\`

⚠️ **Guidelines**:
- Base your analysis **only** on the contents of this bank statement.
- Do **not** refer to past documents or make assumptions.
- Return only the JSON object. Do not include explanation or extra text.

---

### 🧾 Bank statement content:
\`\`\`
${text}
\`\`\`
`;
}

export function financialAssessmentPrompt(text: string): string {
  return `
You are a top lender at the largest SBA lender in the world. You are also a trained CPA with expertise in assessing small business risk from financial data.

You are reviewing transactions from a bank statement and must return the following information.

Please return a valid JSON object using this format:

{
  "total_income": number,              // Sum of all income or credits
  "total_spending": number,            // Sum of all debits
  "suspicious_flags": [string],        // List of any irregularities or red flags
  "approved_for_loan": boolean,        // Should this user be approved at this point?
  "risk_score": number,                // 0 (low risk) to 1 (high risk)
  "last_updated": "ISO-8601 timestamp",
  "summary": "Explain your decision in plain English"
}

Guidelines:
- For "approved_for_loan", base your answer only on the data provided. If not enough data, say false and explain why.
- For "risk_score", output a value between 0 and 1.
- In "summary", explain your reasoning clearly.

ONLY return JSON. Do not include other commentary or prose outside the object.

`;
}
