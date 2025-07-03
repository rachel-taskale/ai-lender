import { query } from "@/lib/db";
import { getFiles } from "@/lib/sql";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { accountId: string } }
) {
  const result = await query(getFiles, [params.accountId]);
  return NextResponse.json(result.rows);
}
