export function buildPrompt(text: string): string {
  return `
  You are a financial assistant reviewing a user's bank statement. Your job is to extract structured financial data and provide a concise analysis of the account activity.

  Return a valid JSON object with the following structure:

  {
    "transactions": [
      {
        "transaction_date": "YYYY-MM-DD",
        "value_date": "YYYY-MM-DD",
        "description": "string",
        "debit": number (optional),
        "credit": number (optional),
        "balance": number (optional)
      },
        ...
    ],
  "claude_analysis": {
    "total_income": number,
    "total_spending": number,
    "suspicious_flags": [string],
    "approved_for_loan": boolean,
    "risk_score": number, // between 0 (low risk) and 1 (high risk)
    "summary": "A short explanation of your reasoning (1–3 sentences)"
  }
}

  Guidelines:
  - Include all transactions found in the statement.
  - In claude_analysis, base your decision only on the current statement.
  - If data is insufficient to approve the loan, set approved_for_loan to false and explain why in the summary.

  Only return the JSON object.

  Here is the bank statement text:
    ${text}
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
