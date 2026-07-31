// const llm = require("./llm");


// async function generateAnswer(question, chunks) {

//     console.log("📚 Retrieved chunks:", chunks.length);

//     const context = chunks
//         .map(chunk => chunk.text)
//         .join("\n\n");


//     console.log("📄 Context preview:");
//     console.log(context.substring(0, 1000));


//     const prompt = `
// You are a helpful AI assistant.

// Answer the user's question using the PDF context provided below.

// Rules:
// - Use only the given context.
// - If the answer is not available in the context, say:
// "I couldn't find that information in the uploaded PDF."
// - For broad questions like "What is this document about?", summarize the main topic of the document.

// Context:
// ${context}


// Question:
// ${question}


// Answer:
// `;


//     const response = await llm.invoke(prompt);


//     console.log("🤖 Model response generated");


//     return response.content;
// }


// module.exports = generateAnswer;








require("dotenv").config();

const llm = require("./llm"); // Change to "./llm" if llm.js is in the same folder

async function askLLM(question, chunks) {
  const context = chunks
    .map((chunk) => chunk.text)
    .join("\n\n");

  const prompt = `
You are a helpful AI assistant.

Answer ONLY using the information present in the context below.

Rules:
- Do NOT use outside knowledge.
- If the answer is not found in the context, reply exactly:
"I couldn't find that information in the uploaded PDF."

Context:
${context}

Question:
${question}

Answer:
`;

  const response = await llm.invoke(prompt);

  return response.content;
}

module.exports = askLLM;