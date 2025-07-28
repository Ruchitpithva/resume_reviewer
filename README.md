# 🧠 Resume Review AI – Backend (Gemini Only)

This is the backend for the **Resume Review AI** tool that analyzes a candidate's **resume** against a **job description** using **Google's Gemini AI**.

Built using **Node.js** and **Express**, the backend accepts PDF file, extracts the content, and uses Gemini to provide:

- A **match score**
- A **summary**
- Specific **suggestions** to improve the resume

---

## 🚀 Features

- 📁 Upload resume
- Provide job description
- 🤖 Uses **Gemini (Google AI)** for intelligent analysis
- 📊 Returns match score, summary, and suggestions
- 🧠 Session-based: 1 upload = 1 review
- 🧹 Clean up uploaded files after review or reset

---

## 🧑‍💻 Tech Stack

- **Node.js + Express**
- **Google Generative AI SDK (Gemini)**
- **Multer** (for file uploads)
- **pdf-parse**, **docx-parser** (for content extraction)
- **dotenv** (for environment config)

---

## 🧠 How It Works

- Files are uploaded via Multer.
- Text content is extracted from PDF.
- Gemini prompt is dynamically generated using both resume & JD.
- Gemini returns a structured response (score + feedback).
- Temp files are deleted after review.

---

## ⚙️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/Ruchitpithva/resume_reviewer.git
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

- Create a .env file in the root:

```bash
PORT=3000
GEMINI_API_KEY=your_google_generative_ai_key
```

### 4. Run the app

```bash
nodemon
```
