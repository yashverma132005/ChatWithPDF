// const { ChatOllama } = require("@langchain/ollama");

// const model = new ChatOllama({
//   model: "llama3.2",
//   temperature: 0,
// });

// async function askLLM(question, chunks) {
//   const context = chunks
//     .map(chunk => chunk.text)
//     .join("\n\n");

//   const prompt = `
// You are a helpful AI assistant.

// Answer ONLY using the context below.

// If the answer is not present, say:
// "I couldn't find that information in the uploaded PDF."

// Context:
// ${context}

// Question:
// ${question}
// `;

//   const response = await model.invoke(prompt);

//   return response.content;
// }

// module.exports = askLLM;








// const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");

// const model = new ChatGoogleGenerativeAI({
//   model: "gemini-2.5-flash",
//   temperature: 0,
// });


// async function askLLM(question, chunks) {
//   const context = chunks
//     .map(chunk => chunk.text)
//     .join("\n\n");

//   const prompt = `
// You are a helpful AI assistant.

// Answer ONLY using the context below.

// If the answer is not present, say:
// "I couldn't find that information in the uploaded PDF."

// Context:
// ${context}

// Question:
// ${question}
// `;

//   const response = await model.invoke(prompt);

//   return response.content;
// }


// module.exports = askLLM;





require("dotenv").config();

const { ChatGroq } = require("@langchain/groq");

const model = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama-3.1-8b-instant",
  temperature: 0,
});

async function askLLM(question, chunks) {
  const context = chunks
    .map(chunk => chunk.text)
    .join("\n\n");

  const prompt = `
You are a helpful AI assistant.

Answer ONLY using the context below.

If the answer is not present, say:
"I couldn't find that information in the uploaded PDF."

Context:
${context}

Question:
${question}
`;

  const response = await model.invoke(prompt);

  return response.content;
}

module.exports = askLLM;