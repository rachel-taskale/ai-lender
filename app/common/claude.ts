import { extractTextFromPDF } from "./extractText";
import { buildPrompt } from "@/lib/prompt";
import { ChatAnthropic } from "langchain/chat_models/anthropic";
import { HumanMessage } from "langchain/schema";

const claude = new ChatAnthropic({
  temperature: 0,
  modelName: "claude-3-opus-20240229",
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function extractStructuredTransactions(pdfPath: string) {
  // extract the data from the document

  // plug it into langchain + claude

  // save our bank statement into a table db with all the unstructured data

  const rawText = await extractTextFromPDF(pdfPath);
  const prompt = buildPrompt(rawText);
  const result = await claude.call([new HumanMessage(prompt)]);
  console.log(result.content); // structured JSON
}

extractStructuredTransactions("./bankstatement1.pdf");
