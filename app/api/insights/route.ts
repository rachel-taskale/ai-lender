// GET - generate an insight about a specific borrower/account holder
export async function GET(request: Request) {
  return new Response(
    JSON.stringify({ message: "GET - /insights  not implemented yet" }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

// POST - save the result that the loaner decides on so the AI agent can learn from history
export async function POST(request: Request) {
  return new Response(
    JSON.stringify({ message: "POST - /insights not implemented yet" }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
