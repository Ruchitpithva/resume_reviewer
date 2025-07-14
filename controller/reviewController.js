import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import _ from "lodash";

import { analyzeResume } from '../utils/gemini.js';
import { extractTextFromPDF } from '../utils/extractTextFromPDF.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fallbackResumePath = path.resolve(__dirname, '../uploads/.tmp/JAY_PATEL.pdf');

export const reviewResume = async (req, res) => {
  const jobDescription = req.body.jobDescription;
  const uploadedFilePath = req.file?.path;

  if (_.isEmpty(jobDescription)) {
    return res.status(200).send({ status: false, message: "Job description is required." })
  }

  if (_.isEmpty(uploadedFilePath)) {
    return res.status(200).send({ status: false, message: "File is required." })
  }

  try {
    const filePathToUse = uploadedFilePath || fallbackResumePath;
    const resumeText = await extractTextFromPDF(filePathToUse); // or use file.path
    const analysis = await analyzeResume(resumeText, jobDescription);

    const cleanedHTML = analysis
      // Replace numbered headings (1. ..., 2. ...) with h3
      .replace(/(\n|^)(\d+\.\s\*\*)(.*?)(\*\*)/g, '<h3>$2$3$4</h3>')

      // Replace remaining markdown bold with <strong>
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

      // Convert * bullets to list items
      .replace(/^\s*[*]\s?(.*)$/gm, '<li>$1</li>')

      // Wrap <li> items with <ul> group
      .replace(/(<li>.*?<\/li>)/gs, match => {
        const listItems = match.match(/<li>.*?<\/li>/g);
        if (listItems && listItems.length > 1) {
          return `<ul>${listItems.join('')}</ul>`;
        }
        return match;
      })

      // Replace remaining newlines with <br> to preserve spacing
      .replace(/\n+/g, '<br>')

      // Remove excessive <br> (2+ in a row becomes one)
      .replace(/(<br\s*\/?>\s*){2,}/g, '<br>');

    await unlinkFile(uploadedFilePath);
    return res.status(200).send({ analysis: cleanedHTML });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'Failed to analyze resume.', reason: err.message });
  }

};

const unlinkFile = async (file_path) => {
  try {
    fs.unlink(file_path, (err) => {
      if (err) {
        return { status: false, message: err }
      }
      return { status: true, message: "File successfully removed from local." }
    });
  } catch (error) {
    return { status: false, message: error?.message };
  }
}