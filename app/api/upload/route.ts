import { analyzePDFWithClaudeAttachment } from "@/app/common/claude";
import { NextRequest } from "next/server";
import path from "path";
import os from "os";
import { query } from "@/lib/db";

import crypto from "crypto";
import { writeFile, readFile } from "fs/promises";
import {
  getAllDocumentAnalyses,
  getDocuments,
  insertUserDocument,
} from "@/app/lib/sql";
import { updateUserRiskProfile } from "@/app/common/helper";
import { UserDocuments } from "@/app/lib/interfaces";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const files = form.getAll("files") as File[];
    let email = form.get("email") as string;
    email = "racheltaskale@gmail.com";
    // -------------- handling the claude analysis--------------
    for (const file of files) {
      const tempFilename = crypto.randomUUID() + path.extname(file.name);
      const tempFilePath = path.join(os.tmpdir(), tempFilename);
      const result = await analyzePDFWithClaudeAttachment(file, tempFilePath);

      // -------------clean data --------------------
      const cleaned = result["content"][0]["text"]
        .replace(/^```json\s*/, "")
        .replace(/```$/, "")
        .replace(/```$/, "")
        .trim();

      const filename = file.name.replace(".", "") + email;
      const parsedResults = await JSON.parse(cleaned);
      //------------------- Add the saving to the DB ---------------
      console.log("parsedResults: ", parsedResults);
      const dbResults = await query(insertUserDocument, [
        filename,
        email,
        file.name,
        new Date(),
        cleaned,
        parsedResults["total_income"],
        parsedResults["total_spending"],
        {},
        parsedResults["suspicious_activity"],
        parsedResults["summary"],
      ]);

      if (!dbResults) {
        new Response(JSON.stringify({ error: "Error saving to DB" }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    // ------------ Now do the report generation --------------

    return new Response(
      JSON.stringify({ message: "Success, document uploaded!" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
