require("dotenv").config();

const { ChatGroq } = require("@langchain/groq");

const model = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "llama-3.1-8b-instant",
    temperature: 0,
});

async function askGroq(prompt) {
    const response = await model.invoke(prompt);
    return response.content;
}

module.exports = askGroq;