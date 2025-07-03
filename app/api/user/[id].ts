// app/api/account/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getAccount } from "@/lib/sql";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const result = await query(getAccount, [params.id]);
  if (result.rowCount === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(result.rows[0]);
}
