# 📄 ChatWithPDF

An end-to-end, high-performance **Retrieval-Augmented Generation (RAG)** application that allows users to upload PDF documents and ask questions about their content in real-time. Built with a modern Next.js frontend, an Express & BullMQ backend queue system, local embedding models, Qdrant vector database, and Groq/Llama-3.1 LLM integration.

---

## 🚀 Technical Architecture Overview

```
 ┌────────────────┐       ┌─────────────────┐       ┌─────────────────┐
 │ Next.js 16 UI  │ ────> │  Express Server │ ────> │  BullMQ Queue   │
 │ (React 19, TS) │       │  (Port 5000)    │       │  (Redis Store)  │
 └────────────────┘       └─────────────────┘       └────────┬────────┘
          │                                                  │
          │ /chat                                            ▼
          ▼                                         ┌─────────────────┐
 ┌────────────────┐       ┌─────────────────┐       │ Background      │
 │  Groq LLM API  │ <──── │ Qdrant Vector DB│ <──── │ Worker          │
 │ (Llama 3.1 8B) │       │ (384-dim vector)│       │ (Ingestion)     │
 └────────────────┘       └─────────────────┘       └─────────────────┘
```

---

## 🛠️ Tech Stack

### **Frontend (`/my-app`)**
- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **UI & React**: React 19, TypeScript
- **Styling**: Tailwind CSS v4, Lucide React icons
- **Authentication**: Auth-ready via `@clerk/nextjs`

### **Backend (`/Server`)**
- **Runtime**: Node.js & Express.js
- **Queueing & Async Jobs**: [BullMQ](https://docs.bullmq.io/) backed by [Redis](https://redis.io/)
- **Document Loader & Parsing**: LangChain `PDFLoader` & `pdf-parse`
- **Text Chunking**: LangChain `RecursiveCharacterTextSplitter` (1000 chunk size, 200 overlap)
- **Local Embeddings Engine**: HuggingFace `Xenova/all-MiniLM-L6-v2` via `@xenova/transformers` (384-dimensional dense vectors run locally, zero embedding API costs)
- **Vector Database**: [Qdrant](https://qdrant.tech/) REST Client & LangChain Qdrant Vector Store
- **LLM / RAG Provider**: [Groq](https://groq.com/) (`llama-3.1-8b-instant`) with modular support for Google Gemini (`gemini-2.0-flash`) or local Ollama (`llama3.2`).

---

## 🎯 Key Capabilities & Features

- **⚡ Queue-Based Ingestion Pipelines**: Decouples document uploads from heavy embedding generation. Files uploaded to `/upload` are placed on a Redis-backed BullMQ queue (`pdf-processing`) and processed asynchronously by worker threads.
- **🔒 Local Feature Extraction**: Converts PDF text chunks to vector embeddings on the local Node server using `all-MiniLM-L6-v2`, avoiding third-party embedding latency and costs.
- **🔎 Vector Search with Cosine Similarity**: Stores and queries vectors inside Qdrant with top-$k$ similarity matching ($k=5$) for high precision context retrieval.
- **🛡️ Strict Context-Grounded QA**: System prompts strictly constrain the LLM to answer using only document context, fallback-responding with *"I couldn't find that information in the uploaded PDF."* to minimize hallucination.
- **🎨 Modern Dark-Themed Web Interface**: Drag-and-drop document upload workspace paired with an instant interactive message thread.

---

## 📁 Repository Structure

```
ChatWithPDF/
├── Server/                   # Node.js Express & BullMQ Backend
│   ├── services/
│   │   ├── chat.js           # Ollama RAG implementation
│   │   ├── embeddings.js     # HuggingFace all-MiniLM-L6-v2 local vectorizer
│   │   ├── gemini.js         # Google Gemini integration fallback
│   │   ├── groq.js           # Groq LLM integration
│   │   ├── ingest.js         # PDF load -> split -> embedding -> Qdrant pipeline
│   │   ├── pdfLoader.js      # LangChain PDF file parser
│   │   ├── qdrant.js         # Qdrant collection initialization & client setup
│   │   ├── qdrantSearch.js   # Vector similarity retriever
│   │   ├── rag.js            # Prompt engineering & LLM response generator
│   │   └── splitter.js       # Recursive text chunk splitter
│   ├── queue.js              # BullMQ queue producer definition
│   ├── worker.js             # Background job consumer thread
│   ├── server.js             # Express API routes (/upload, /chat)
│   └── package.json
│
└── my-app/                   # Next.js Frontend Application
    ├── app/
    │   ├── components/
    │   │   ├── ChatBox.tsx      # Interactive chat thread component
    │   │   ├── ChatPage.tsx     # Split-screen workspace container
    │   │   └── UploadPanel.tsx  # Drag & drop file upload panel
    │   ├── layout.tsx
    │   └── page.tsx             # Landing hero & chat toggle logic
    └── package.json
```

---

## ⚡ Quick Start & Installation

### Prerequisites
- **Node.js**: v18+ 
- **Redis Server**: Running locally or via Docker (`redis://localhost:6379`)
- **Qdrant Vector Database**: Running instance (Cloud or Local Docker at `http://localhost:6333`)
- **Groq API Key**: Obtain from [Groq Console](https://console.groq.com/)

---

### 1. Environment Setup

Create `.env` inside `/Server`:

```env
PORT=5000
REDIS_HOST=127.0.0.1
REDIS_PORT=6379

QDRANT_URL=http://localhost:6333
QDRANT_COLLECTION=pdf-documents

GROQ_API_KEY=your_groq_api_key_here
# GEMINI_API_KEY=your_gemini_api_key_here
```

Create `.env` inside `/my-app`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
```

---

### 2. Install & Run Backend Server

```bash
# Navigate to backend
cd Server

# Install dependencies
npm install

# Terminal 1: Start Express API Server
node server.js

# Terminal 2: Start Background Worker
node worker.js
```

---

### 3. Install & Run Frontend

```bash
# Navigate to frontend
cd my-app

# Install dependencies
npm install

# Start Next.js development server
npm run dev
```

Visit `http://localhost:3000` in your browser to begin uploading documents and asking questions!

---

## 🧪 API Endpoints

### `POST /upload`
Uploads a PDF file and queues it for vector embedding.
- **Request**: `multipart/form-data` with `file` field
- **Response**:
  ```json
  {
    "success": true,
    "message": "File uploaded and queued successfully",
    "jobId": "1",
    "file": {
      "name": "sample.pdf",
      "path": ".../uploads/1722426000000-sample.pdf"
    }
  }
  ```

### `POST /chat`
Submits a query to retrieve vector-matched context and generate an answer.
- **Request Body**:
  ```json
  {
    "question": "What are the main findings in section 3?"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "question": "What are the main findings in section 3?",
    "answer": "Section 3 highlights...",
    "model": "Groq - Llama 3.1 8B Instant",
    "sources": [...]
  }
  ```

  ## 🧪 Screenshots
  <img width="1900" height="852" alt="Screenshot 2026-07-29 191808" src="https://github.com/user-attachments/assets/f81bb570-4b9c-44ab-b842-af8894da1cd6" />
  <img width="1902" height="852" alt="Screenshot 2026-07-29 191059" src="https://github.com/user-attachments/assets/4fff2d98-f513-411e-9686-26e0b68227bf" />


