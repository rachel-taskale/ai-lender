import { getClaudeResponse } from "@/app/common/claude";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request) {
  console.log("here");

  const { prompt } = await req.json();
  const reply = await getClaudeResponse(prompt);
  console.log("here");
  return new Response(JSON.stringify({ message: "Testing claude" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: NextRequest) {
  console.log("here");

  //   const { prompt } = await req.json();
  const reply = await getClaudeResponse("ping");
  console.log(reply);

  return NextResponse.json({ reply });
}
