import fs from 'fs';
import pkg from 'pdfjs-dist/legacy/build/pdf.js';
const { getDocument } = pkg;

export async function extractTextFromPDF(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found at path: ${filePath}`);
  }

  const buffer = fs.readFileSync(filePath);
  const pdf = await getDocument({ data: buffer }).promise;

  let fullText = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const text = content.items.map(item => item.str).join(' ');
    fullText += text + '\n';
  }

  return fullText;
}