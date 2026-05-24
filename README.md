# 🎓 EduBot — AI-Powered College Admissions Advisor

<div align="center">

![EduBot Banner](https://img.shields.io/badge/EduBot-AI%20College%20Advisor-6C63FF?style=for-the-badge&logo=graduation-cap&logoColor=white)

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React_19-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Gemini AI](https://img.shields.io/badge/Gemini_2.5_Flash-4285F4?style=flat&logo=google&logoColor=white)](https://ai.google.dev/)
[![ChromaDB](https://img.shields.io/badge/ChromaDB-FF6B35?style=flat&logo=databricks&logoColor=white)](https://www.trychroma.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

**EduBot** is an AI-powered chatbot that helps students navigate Indian college admissions — answering questions about fees, cutoffs, placements, courses, and more — using **Retrieval-Augmented Generation (RAG)** with Google Gemini AI.

</div>

---

## ✨ Features

- 🤖 **AI-Powered Answers** — Powered by Google Gemini 2.5 Flash Lite for smart, context-aware responses
- 🔍 **RAG Architecture** — Retrieves relevant college data from a vector database before generating answers
- 🎓 **Education-Focused** — Intelligently filters queries to only answer college/higher-education related questions
- 📚 **Rich Knowledge Base** — Covers admissions, fees, cutoffs, placements, courses, rankings, and more
- 💬 **Markdown Rendering** — Responses are formatted beautifully with bold, lists, and paragraphs
- ⚡ **Fast & Responsive** — React + Vite frontend with real-time chat UI
- 🏫 **Wide College Coverage** — Supports SSN, VIT, SRM, BITS, IITs, NITs, PSG, KCT, Amrita, and 50+ more institutions

---

## 🏗️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI Framework |
| Vite 7 | Build Tool & Dev Server |
| react-markdown | Render AI markdown responses |
| Vanilla CSS | Custom, responsive styling |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express 5 | REST API Server |
| Google Gemini 2.5 Flash Lite | Large Language Model |
| ChromaDB | Vector Database for RAG |
| Xenova/all-MiniLM-L6-v2 | Local Text Embeddings |
| dotenv | Environment Variable Management |
| nodemon | Hot Reload for Development |

---

## 📁 Project Structure

```
ChatbotAI-New/
├── backend/
│   ├── server.js        # Express API server with college-filter logic
│   ├── gemini.js        # Google Gemini AI integration
│   ├── rag.js           # RAG retrieval using ChromaDB + embeddings
│   ├── ingest.js        # Script to embed & store college data in ChromaDB
│   ├── data/
│   │   └── colleges.json  # Knowledge base (college information)
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── App.jsx           # Root app with header layout
    │   ├── components/
    │   │   ├── Chatbox.jsx   # Main chat interface component
    │   │   └── Message.jsx   # Individual message bubble
    │   ├── services/         # API call utilities
    │   ├── index.css         # Global styles
    │   └── main.jsx          # React entry point
    ├── index.html
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18+
- [ChromaDB](https://www.trychroma.com/) running locally on port `8000`
- A [Google Gemini API Key](https://ai.google.dev/)

### 1. Clone the Repository

```bash
git clone https://github.com/Vetrivel8/ChatbotAI-New.git
cd ChatbotAI-New
```

### 2. Set Up ChromaDB

Make sure ChromaDB is running on `localhost:8000`. You can start it using:

```bash
pip install chromadb
chroma run --host localhost --port 8000
```

### 3. Set Up the Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```env
GEMINI_API_KEY=your_google_gemini_api_key_here
```

**Ingest college data into ChromaDB (run once):**

```bash
node ingest.js
```

**Start the backend server:**

```bash
npm start
```

The backend will be running at: `http://localhost:3000`

### 4. Set Up the Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will be running at: `http://localhost:5173`

---

## 💡 How It Works

```
User Question
     │
     ▼
┌─────────────────────┐
│  College Filter     │  ← Rejects non-education queries
│  (server.js)        │
└─────────────────────┘
     │
     ▼
┌─────────────────────┐
│  RAG Retrieval      │  ← Embeds query using MiniLM-L6-v2
│  (rag.js)           │  ← Searches ChromaDB for top 5 chunks
└─────────────────────┘
     │
     ▼
┌─────────────────────┐
│  Gemini AI          │  ← Generates answer from context
│  (gemini.js)        │  ← Acts as "EduBot" advisor persona
└─────────────────────┘
     │
     ▼
  AI Response (Markdown formatted)
```

1. **User asks a question** in the chat UI.
2. **College filter** checks if the question is education-related using keyword patterns and institution name matching.
3. **RAG retrieval** converts the query into a vector embedding and retrieves the top 5 most relevant chunks from ChromaDB.
4. **Gemini AI** generates a helpful, markdown-formatted answer using the retrieved context.
5. **Response** is sent back and rendered beautifully in the chat UI.

---

## 🎯 Supported Query Topics

EduBot can answer questions about:

- 🏫 College names, rankings & accreditation (NAAC, NBA, AICTE, UGC)
- 💰 Tuition fees & scholarship information
- 📊 Entrance exam cutoffs (TNEA, JEE, GATE, CAT)
- 🎓 Courses & programs (B.Tech, M.Tech, MBA, BSc, ME)
- 💼 Placement statistics & companies
- 🏠 Campus life, hostels & infrastructure
- 📚 Departments, faculties & syllabi
- 🔬 Research, internships & labs

---

## 🔧 API Endpoints

### `GET /`
Health check — returns a status message.

### `POST /chat`
Send a message to EduBot.

**Request Body:**
```json
{
  "message": "What is the fee structure at VIT Vellore?"
}
```

**Response:**
```json
{
  "reply": "**VIT Vellore** offers B.Tech programs with fees ranging from ₹1.98L to ₹3.98L per year depending on the specialization..."
}
```

---

## 🛡️ Environment Variables

| Variable | Description | Required |
|---|---|---|
| `GEMINI_API_KEY` | Your Google Gemini API Key | ✅ Yes |

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **ISC License** — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Vetrivel** — [@Vetrivel8](https://github.com/Vetrivel8)

---

<div align="center">

Made with ❤️ for students navigating Indian college admissions

⭐ If you find this useful, please give it a star!

</div>
