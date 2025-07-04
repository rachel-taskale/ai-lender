import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
// import { uploadDocument } from "@/lib/sql";

export async function POST(req: NextRequest) {
  const { account_id, filename, content } = await req.json();
  const result = await query(uploadDocument, [account_id, filename, content]);
  return NextResponse.json(result.rows[0]);
}
