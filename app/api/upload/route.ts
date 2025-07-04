import { extractStructuredTransactions } from "@/app/common/claude";
import {
  extractStructuredFromPDF,
  extractTextStringsFromPdf2Json,
} from "@/app/common/extractText";
import { NextRequest, NextResponse } from "next/server";

// POST - save document related to a specific person to user_documents
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const form = await req.formData();
    const files = form.getAll("files") as File[];
    const email = form.get("email") as string;

    let rawText: Record<string, string[]> = {};
    // Loop thru all the files and add the documents to our DB and
    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const pdfData = await extractStructuredFromPDF(buffer);
      if (pdfData) {
        const text = extractTextStringsFromPdf2Json(pdfData).flat();
        rawText[file.name] = text;
      }
    }
    // Peform analysis on each of the documents while retaining knowledge of each document
    for (const file in rawText.keys) {
      const structuredJSON = await extractStructuredTransactions(rawText[file]);
    }
    // console.log("structuredJSON: ", structuredJSON);
    return new Response(JSON.stringify({ data: rawText }), {
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
