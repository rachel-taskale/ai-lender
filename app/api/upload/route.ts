import { extractStructuredTransactions } from "@/app/common/claude";
import { extractTextFromPDF } from "@/app/common/extractText";
import { NextRequest, NextResponse } from "next/server";

// POST - save document related to a specific person
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    console.log("here");
    // extract the data from the document
    const { fileBuffer } = req.body;
    const rawText = await extractTextFromPDF(fileBuffer);
    const structuredJSON = await extractStructuredTransactions(rawText);
    return new Response(JSON.stringify({ data: structuredJSON }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
