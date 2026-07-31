// require("dotenv").config();

// const askGemini = require("./services/gemini");
// const express = require("express");
// const multer = require("multer");
// const cors = require("cors");
// const path = require("path");
// const fs = require("fs");

// const pdfQueue = require("./queue");
// const searchSimilarChunks = require("./services/qdrantSearch");
// const askLLM = require("./services/chat");

// const app = express();


// // Middleware
// app.use(
//     cors({
//         origin: "http://localhost:3000",
//     })
// );

// app.use(express.json());


// // Create uploads folder if not exists
// const uploadDir = path.join(__dirname, "uploads");

// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir);
// }


// // Multer configuration
// const storage = multer.diskStorage({

//     destination: (req, file, cb) => {
//         cb(null, uploadDir);
//     },

//     filename: (req, file, cb) => {
//         cb(
//             null,
//             `${Date.now()}-${file.originalname}`
//         );
//     }

// });

// const upload = multer({
//     storage,
// });


// // ==========================
// // PDF Upload Route
// // ==========================

// app.post(
//     "/upload",
//     upload.single("file"),
//     async (req, res) => {

//         try {

//             if (!req.file) {
//                 return res.status(400).json({
//                     success: false,
//                     message: "No file uploaded",
//                 });
//             }

//             console.log(
//                 "📄 Uploaded:",
//                 req.file.originalname
//             );

//             const job = await pdfQueue.add(
//                 "process-pdf",
//                 {
//                     fileName: req.file.originalname,
//                     filePath: req.file.path,
//                 }
//             );

//             console.log(
//                 `📦 Job ${job.id} added to queue`
//             );

//             res.status(200).json({

//                 success: true,

//                 message: "File uploaded and queued successfully",

//                 jobId: job.id,

//                 file: {
//                     name: req.file.originalname,
//                     path: req.file.path,
//                 }

//             });

//         } catch (error) {

//             console.error("Upload Error:", error);

//             res.status(500).json({

//                 success: false,

//                 message: "Internal Server Error"

//             });

//         }

//     }
// );


// // ==========================
// // Chat Route (RAG + Ollama)
// // ==========================

// app.post(
//     "/chat",
//     async (req, res) => {

//         try {

//             const { question } = req.body;

//             if (!question) {

//                 return res.status(400).json({

//                     success: false,

//                     message: "Question required"

//                 });

//             }

//             console.log("💬 Question:", question);

//             // Retrieve relevant chunks
//             const chunks = await searchSimilarChunks(question);

//             // Ask Ollama
//             const answer = await askLLM(question, chunks);

//             res.json({

//                 success: true,

//                 question,

//                 answer,

//                 sources: chunks

//             });

//         } catch (error) {

//             console.error("Chat Error:", error);

//             res.status(500).json({

//                 success: false,

//                 message: "Chat failed"

//             });

//         }

//     }
// );


// // ==========================
// // Test Route
// // ==========================

// app.get("/test-chat", (req, res) => {
//     res.send("Chat route area working");
// });


// // ==========================
// // Start Server
// // ==========================

// console.log("Routes loaded: /upload /chat");

// app.listen(
//     5000,
//     () => {

//         console.log(
//             "🚀 Server running on http://localhost:5000"
//         );

//     }
// );








// require("dotenv").config();

// const express = require("express");
// const multer = require("multer");
// const cors = require("cors");
// const path = require("path");
// const fs = require("fs");

// const pdfQueue = require("./queue");
// const searchSimilarChunks = require("./services/qdrantSearch");
// // const askLLM = require("./services/chat");
// const askLLM = require("./services/rag");


// const app = express();


// // ==========================
// // Middleware
// // ==========================

// app.use(
//     cors({
//         origin: "http://localhost:3000",
//     })
// );

// app.use(express.json());


// // ==========================
// // Create uploads folder
// // ==========================

// const uploadDir = path.join(__dirname, "uploads");

// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir);
// }


// // ==========================
// // Multer configuration
// // ==========================

// const storage = multer.diskStorage({

//     destination: (req, file, cb) => {
//         cb(null, uploadDir);
//     },

//     filename: (req, file, cb) => {
//         cb(
//             null,
//             `${Date.now()}-${file.originalname}`
//         );
//     }

// });


// const upload = multer({
//     storage,
// });


// // ==========================
// // PDF Upload Route
// // ==========================

// app.post(
//     "/upload",
//     upload.single("file"),
//     async (req, res) => {

//         try {

//             if (!req.file) {
//                 return res.status(400).json({
//                     success: false,
//                     message: "No file uploaded",
//                 });
//             }


//             console.log(
//                 "📄 Uploaded:",
//                 req.file.originalname
//             );


//             const job = await pdfQueue.add(
//                 "process-pdf",
//                 {
//                     fileName: req.file.originalname,
//                     filePath: req.file.path,
//                 }
//             );


//             console.log(
//                 `📦 Job ${job.id} added to queue`
//             );


//             res.status(200).json({

//                 success: true,

//                 message: "File uploaded and queued successfully",

//                 jobId: job.id,

//                 file: {
//                     name: req.file.originalname,
//                     path: req.file.path,
//                 }

//             });


//         } catch (error) {

//             console.error("Upload Error:", error);


//             res.status(500).json({

//                 success: false,

//                 message: "Internal Server Error"

//             });

//         }

//     }
// );


// // ==========================
// // Chat Route (RAG + Gemini)
// // ==========================

// app.post(
//     "/chat",
//     async (req, res) => {

//         try {

//             const { question } = req.body;


//             if (!question) {

//                 return res.status(400).json({

//                     success: false,

//                     message: "Question required"

//                 });

//             }


//             console.log("💬 Question:", question);


//             // Retrieve relevant chunks from Qdrant
//             const chunks = await searchSimilarChunks(question);


//             // Ask Gemini
//             const answer = await askLLM(question, chunks);


//             console.log("✅ Answer generated using Gemini");


//             res.json({

//                 success: true,

//                 question,

//                 answer,

//                 model: "gemini-2.5-flash",

//                 sources: chunks

//             });


//         } catch (error) {

//             console.error("Chat Error:", error);


//             res.status(500).json({

//                 success: false,

//                 message: "Chat failed"

//             });

//         }

//     }
// );


// // ==========================
// // Test Route
// // ==========================

// app.get(
//     "/test-chat",
//     (req, res) => {
//         res.send("Chat route working with Gemini");
//     }
// );


// // ==========================
// // Start Server
// // ==========================

// console.log("Routes loaded: /upload /chat");


// app.listen(
//     5000,
//     () => {

//         console.log(
//             "🚀 Server running on http://localhost:5000"
//         );

//     }
// );







require("dotenv").config();

const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const pdfQueue = require("./queue");
const searchSimilarChunks = require("./services/qdrantSearch");
const askLLM = require("./services/rag");

const app = express();

// ==========================
// Middleware
// ==========================

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

// ==========================
// Create uploads folder
// ==========================

const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// ==========================
// Multer configuration
// ==========================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
});

// ==========================
// PDF Upload Route
// ==========================

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    console.log("📄 Uploaded:", req.file.originalname);

    const job = await pdfQueue.add("process-pdf", {
      fileName: req.file.originalname,
      filePath: req.file.path,
    });

    console.log(`📦 Job ${job.id} added to queue`);

    res.status(200).json({
      success: true,
      message: "File uploaded and queued successfully",
      jobId: job.id,
      file: {
        name: req.file.originalname,
        path: req.file.path,
      },
    });
  } catch (error) {
    console.error("Upload Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

// ==========================
// Chat Route (RAG + Groq)
// ==========================

app.post("/chat", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question required",
      });
    }

    console.log("💬 Question:", question);

    // Retrieve relevant chunks from Qdrant
    const chunks = await searchSimilarChunks(question);

    // Generate answer using Groq
    const answer = await askLLM(question, chunks);

    console.log("✅ Answer generated using Groq");

    res.json({
      success: true,
      question,
      answer,
      model: "Groq - Llama 3.1 8B Instant",
      sources: chunks,
    });
  } catch (error) {
    console.error("Chat Error:", error);

    res.status(500).json({
      success: false,
      message: "Chat failed",
      error: error.message,
    });
  }
});

// ==========================
// Test Route
// ==========================

app.get("/test-chat", (req, res) => {
  res.send("✅ Chat route working with Groq");
});

// ==========================
// Start Server
// ==========================

console.log("Routes loaded: /upload /chat");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});