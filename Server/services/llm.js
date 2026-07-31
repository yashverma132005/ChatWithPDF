// const { ChatOllama } = require("@langchain/ollama");

// const llm = new ChatOllama({
//   model: "llama3.2",
//   temperature: 0.2,
// });

// module.exports = llm;









// require("dotenv").config();

// const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");

// const llm = new ChatGoogleGenerativeAI({
//   apiKey: process.env.GEMINI_API_KEY,
//   model: "gemini-2.0-flash",
//   temperature: 0.2,
// });

// module.exports = llm;











const { ChatGroq } = require("@langchain/groq");

const llm = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama-3.1-8b-instant",
  temperature: 0.2,
});

module.exports = llm;