import fs from "fs";
import pdf from "pdf-parse";

export const extractTextFromPDF = async (path: string) => {
  const dataBuffer = fs.readFileSync("bankstatement.pdf");
  const data = await pdf(dataBuffer);

  console.log(data.text);
  return data.text;
};
