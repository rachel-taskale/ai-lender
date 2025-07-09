import { updateUserRiskProfile } from "@/app/common/helper";
import { query } from "@/app/lib/db";
import { getDocuments } from "@/app/lib/sql";
import { NextRequest } from "next/server";

// GET - get all the info related to a specific borrower
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    const documentAnalysis = await query(getDocuments, [email]);
    const userAnalyses = documentAnalysis?.rows ?? [];

    const userRiskReport = await updateUserRiskProfile(email, userAnalyses);

    return new Response(JSON.stringify(userRiskReport), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
