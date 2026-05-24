import express from "express";
import cors from "cors";
import { retrieve } from "./rag.js";
import { generate } from "./gemini.js";

const app = express();

app.use(cors());
app.use(express.json());

// Known institution name keywords / abbreviations (case-insensitive)
const INSTITUTION_NAMES = [
  "ssn", "vit", "srm", "bits", "iit", "nit", "anna", "psg", "kct", "ceg",
  "mit", "ace", "sathyabama", "saveetha", "vel tech", "veltech", "crescent",
  "rajalakshmi", "misrimal", "misrimall", "jeppiaar", "dr.mgr", "drmgr",
  "mgr", "easwari", "kongu", "karpagam", "kumaraguru", "hindusthan",
  "amrita", "vellore", "manipal", "loyola", "madras", "guindy", "pondicherry",
  "bharath", "bharathidasan", "alagappa", "periyar", "annamalai", "kalasalingam",
  "karunya", "lieu", "nyu", "jain", "reva", "presidency", "st.joseph",
  "stjoseph", "meenakshi", "mepco", "tagore", "apollo", "cit", "git"
];

function isCollegeRelated(question) {
  const q = question.toLowerCase();

  // 1. Direct education-domain keywords
  const keywords = [
    /college/i, /university/i, /engineering/i, /\bmba\b/i,
    /\bb\.?tech\b/i, /\bm\.?tech\b/i, /\bme\b/i, /\bbsc\b/i,
    /course/i, /fees?/i, /admission/i, /placement/i,
    /cutoff/i, /\brank\b/i, /campus/i, /hostel/i, /institute/i,
    /department/i, /faculty/i, /accreditation/i, /naac/i, /nba/i,
    /\baicte\b/i, /\bugc\b/i, /scholarship/i, /affiliation/i,
    /infrastructure/i, /laboratory/i, /library/i, /research/i,
    /internship/i, /faculty/i, /syllabus/i, /semester/i, /exam/i,
    /entrance/i, /tnea/i, /jee\b/i, /gate\b/i, /cat\b/i
  ];

  if (keywords.some(p => p.test(question))) return true;

  // 2. Match known institution names / abbreviations
  if (INSTITUTION_NAMES.some(name => q.includes(name))) return true;

  // 3. Catch short ALL-CAPS acronyms (2-6 letters) which are likely institution abbreviations
  if (/\b[A-Z]{2,6}\b/.test(question)) return true;

  return false;
}

app.get("/", (req, res) => {
  res.send("College Chatbot Backend is running");
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    if (!isCollegeRelated(message)) {
      return res.json({
        reply:
          "I can help only with college and higher-education related questions. You can ask about colleges, courses, admissions, fees, or placements."
      });
    }

    const context = await retrieve(message);

    const reply = await generate(
`You are EduBot — a professional, warm, and knowledgeable college admissions advisor for Indian higher education.

Guidelines:
- Answer clearly and concisely using the provided context.
- Format your response using markdown: use **bold** for key terms, bullet lists for multiple items, and short paragraphs.
- Be friendly and encouraging — speak like a helpful senior student or counselor.
- If the context contains specific data (fees, cutoffs, rankings), cite them accurately.
- If the context does not have enough information, say so honestly and suggest what the user could check (e.g., official website).
- Do NOT make up information. Stick to what the context says.
- Keep responses under 300 words unless the question demands detail.

Context (retrieved from database):
${context}

User's Question:
${message}

Your helpful, professional response:`
    );

    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI response failed" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
