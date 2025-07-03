import { extractStructuredTransactions } from "@/app/common/claude";
import { extractTextFromPDF } from "@/app/common/extractText";
import { NextRequest, NextResponse } from "next/server";

// POST - save document related to a specific person to user_documents
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    console.log("here");
    // extract the data from the document
    const { fileBuffer } = req.body;
    console.log("fileBuffer: ", fileBuffer);

    const rawText = await extractTextFromPDF(fileBuffer);
    console.log("rawText: ", rawText);

    const structuredJSON = await extractStructuredTransactions(rawText);
    console.log("structuredJSON: ", structuredJSON);
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
