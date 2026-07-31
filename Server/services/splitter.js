const { RecursiveCharacterTextSplitter } = require("@langchain/textsplitters");


async function splitDocuments(docs){

    const splitter = new RecursiveCharacterTextSplitter({

        chunkSize:1000,

        chunkOverlap:200,

    });


    const chunks = await splitter.splitDocuments(docs);


    return chunks;

}


module.exports = splitDocuments;