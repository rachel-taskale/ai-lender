// app/api/account/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getDocuments, getUser } from "@/lib/sql";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log("here");
  const id = params.id;
  console.log(id);
  const userAccount = await query(getUser, [id]);
  if (userAccount.rowCount === 0) {
    return new Response(JSON.stringify({ message: "user not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  const userDocuments = await query(getDocuments, [id]);
  const results = {
    userAccount,
    userDocuments,
  };
  console.log(userDocuments);
  return new Response(JSON.stringify(results), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
