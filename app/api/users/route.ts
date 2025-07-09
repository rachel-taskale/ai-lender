import { getUsers, insertUser } from "@/app/lib/sql";
import { query } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET - get all the info related to a specific borrower
export async function GET(request: NextRequest) {
  try {
    const results = await query(getUsers);
    return new Response(JSON.stringify(results), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// POST - add another bank statement/file to their account

export async function POST(req: NextRequest) {
  const { email, name } = await req.json();

  if (!email || !name) {
    return new Response(JSON.stringify({ error: "Missing fields" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const result = await query(insertUser, [email, name, new Date()]);
    console.log("result: ", result);
    return new Response(JSON.stringify({ message: "User created" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.log(err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
