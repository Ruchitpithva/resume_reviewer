import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // or gemini-1.5-pro

export async function analyzeResume(resume, jobDescription) {
    const prompt = `
        You are a professional resume evaluator.
        
        Analyze the candidate's resume against the job description provided below.
        
        Resume:
        ${resume}
        
        Job Description:
        ${jobDescription}
        
        Your response must include:
        
        1. **Match Percentage** (from 0 to 100%) — Indicate how well the resume aligns with the job description.
        
        2. **Key Strengths & Qualities** — List the strengths in the resume that match the job requirements.
        
        3. **Missing or Weak Areas** — Point out specific skills, technologies, or experiences from the job description that are not present or are weakly represented in the resume.
        
        4. **Final Evaluation** — Analyze whether this candidate is a good fit for the role, based on the resume. Give your reasoning.
        
        5. **Resume Fit Rating** — Give a one-word rating for the resume:
        - 🌟 **Very Strong** (90–100%)
        - ✅ **Strong** (75–89%)
        - ⚠️ **Moderate** (50–74%)
        - ❌ **Weak** (below 50%)

        Respond in structured markdown format & no asterisk formatting.
    `;

    const result = await model.generateContent({
        contents: [
            {
                role: "user",
                parts: [{ text: prompt }],
            },
        ],
    });

    const response = await result.response;
    return await response.text();
}
