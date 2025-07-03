export function buildPrompt(text: string): string {
  return `
  You are a financial assistant. Extract all transactions from this bank statement in JSON format:
  
  Each transaction must have:
  - transaction_date (YYYY-MM-DD)
  - value_date (YYYY-MM-DD)
  - description
  - debit (if present)
  - credit (if present)
  - balance (if present)
  
  Here is the statement:
  ${text}
  `;
}
