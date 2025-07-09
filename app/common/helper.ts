import { UserRiskProfile } from "../lib/interfaces";
import { createUserRiskReport } from "./claude";

export async function updateUserRiskProfile(
  userId: string,
  userAnalyses: UserRiskProfile[] // consider making this UserDocuments[] for safety
): Promise<UserRiskProfile> {
  if (!Array.isArray(userAnalyses)) {
    throw new Error("userAnalyses must be an array");
  }
  const totalIncome = userAnalyses.reduce(
    (acc, a) => acc + parseFloat(a["total_income"] ?? 0),
    0
  );

  const totalSpending = userAnalyses.reduce(
    (acc, a) => acc + parseFloat(a["total_spending"] ?? 0),
    0
  );

  const suspiciousFlags = [
    ...new Set(userAnalyses.flatMap((a) => a["suspicious_flags"] || [])),
  ];

  const summaries = [...new Set(userAnalyses.map((a) => a["summary"]))];
  const report = await createUserRiskReport(
    totalIncome,
    totalSpending,
    suspiciousFlags,
    summaries
  );

  const rawText = report.content?.[0]?.text ?? "";

  const cleaned = rawText
    .replace(/^```json\s*/g, "")
    .replace(/```$/g, "")
    .trim();

  const parsed = JSON.parse(cleaned);

  return {
    userId,
    totalIncome,
    totalSpending,
    riskScore: parsed.risk_score,
    suspiciousFlags,
    approvedForLoan: parsed.approved,
    summary: `Cumulative profile based on ${userAnalyses.length} documents. ${parsed.reasoning}`,
    lastUpdated: new Date(),
    documentCount: userAnalyses.length,
  };
}
