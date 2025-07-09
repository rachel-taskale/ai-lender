import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getAllDocuments } from "@/app/lib/sql";
// import { uploadDocument } from "@/lib/sql";

export async function GET(req: NextRequest) {
  const results = await query(getAllDocuments);
  if (results.rowCount === 0) {
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
  return new Response(JSON.stringify({ results }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
