import PDFParser from "pdf2json";
import { decode } from "html-entities";

export const extractStructuredFromPDF = (buffer: Buffer): Promise<any> => {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      resolve(pdfData);
    });

    pdfParser.on("pdfParser_dataError", (err) => {
      reject(err);
    });

    pdfParser.parseBuffer(buffer);
  });
};

export function extractTextStringsFromPdf2Json(parsed: any): string[][] {
  return parsed.Pages.map((page: any) =>
    page.Texts.map((t: any) => decodeURIComponent(t.R[0].T))
  );
}
