require("dotenv").config();

const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");


const model = new ChatGoogleGenerativeAI({

    model: "gemini-2.5-flash",

    temperature: 0,

});


async function askGemini(prompt){

    const response = await model.invoke(prompt);


    return response.content;

}


module.exports = askGemini;