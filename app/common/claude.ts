import { Anthropic } from "@anthropic-ai/sdk";
import { promises } from "fs";
import path from "path";
import os from "os";
import { NextResponse } from "next/server";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function createUserRiskReport(
  totalIncome: number,
  totalSpending: number,
  suspiciousFlags: string[],
  summaries: string[]
) {
  const result = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 100,
    temperature: 1,
    system: `
      You are a certified CPA and expert financial underwriter for small business loans. 
      You must review provided financial summaries and determine if a loan should be approved. 
      Base your decision solely on spending, income, and risk indicators.
      Respond ONLY in the structured JSON format requested. Do not include any explanation outside the JSON.
      `.trim(),
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `
      Evaluate this financial profile and return a decision.
      
      Inputs:
      - Total Spending: ${totalSpending}
      - Total Income: ${totalIncome}
      - Suspicious Flags: ${JSON.stringify(suspiciousFlags)}
      - Summaries: ${JSON.stringify(summaries)}
      
      Return the result in this JSON format:
      
      {
        "approved": true | false,
        "risk_score": number (0 to 100),
        "reasoning": "short justification for the decision"
      }
      `.trim(),
          },
        ],
      },
    ],
  });
  console.log("====================");
  console.log("====================");
  console.log(result);
  console.log("====================");
  console.log("====================");

  const filePath = path.join(
    os.homedir(),
    "./workspace/ai-lender/riskreport.txt"
  );
  console.log(filePath);
  await promises.writeFile(filePath, JSON.stringify(result));

  return result;
}
export async function analyzePDFWithClaudeAttachment(
  file: globalThis.File,
  filepath: string
) {
  if (!filepath) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64 = buffer.toString("base64");

  const result = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    // betas: ["files-api-2025-04-14"],
    max_tokens: 20000,
    temperature: 1,
    system:
      " You are a certified CPA and expert financial analyst. Your job is to assess the financial health of a small business using a single bank statement.",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `
            1. **Extract all transactions** in this format:
            
            \`\`\`json
            {
              "transaction_date": "YYYY-MM-DD",
              "value_date": "YYYY-MM-DD",
              "description": "string",
              "debit": number,
              "credit": number,
              "balance": number,
              "category": "ExpenditureCategory"
            }
            \`\`\`
            
            **Category must be one of**:
            
            \`\`\`json
            [
              "HousingAndRent",
              "Utilities",
              "FoodAndGroceries",
              "Healthcare",
              "Transportation",
              "Entertainment",
              "DebtRepayment",
              "CashWithdrawals",
              "ShoppingAndDiscretionary",
              "BusinessExpenses",
              "Insurance",
              "Education",
              "GovernmentAndTaxes",
              "Miscellaneous"
            ]
            \`\`\`
            
            2. **Calculate totals**:
            - \`total_income\`: sum of all credits
            - \`total_spending\`: sum of all debits
            
            3. **Flag any suspicious activity**, including:
            - unusually large transactions
            - frequent cash withdrawals
            - inconsistent income
            - overdrafts
            
            4. **Summarize the financial health** of the business.
            
            Respond **only with JSON** in the following structure:
            
            \`\`\`json
          {
            "total_income": number,
            "total_spending": number,
            "suspicious_activity": [...],
            "summary": "string"
          }
            \`\`\`
            `,
          },
          {
            type: "document",
            source: {
              type: "base64",
              media_type: "application/pdf",
              data: base64,
            },
          },
        ],
      },
    ],
  });

  console.log("====================");
  console.log("====================");
  console.log(result);
  console.log("====================");
  console.log("====================");

  const filePath = path.join(
    os.homedir(),
    "./workspace/ai-lender/claudeoutput.txt"
  );
  console.log(filePath);
  await promises.writeFile(filePath, JSON.stringify(result));

  return result;
}
