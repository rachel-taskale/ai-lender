import { query } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET - get all the info related to a specific borrower
export async function GET(request: NextRequest) {
  const result = await query("SELECT * FROM users");
  //   res.status(200).json(result.rows);

  return new Response(
    JSON.stringify({ message: "GET - /account  not implemented yet" }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

// POST - add another bank statement/file to their account
export async function POST(request: NextRequest) {
  return new Response(
    JSON.stringify({ message: "POST - /account not implemented yet" }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
