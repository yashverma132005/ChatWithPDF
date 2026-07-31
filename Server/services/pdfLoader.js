const { PDFLoader } = require("@langchain/community/document_loaders/fs/pdf");


async function loadPDF(filePath) {

    const loader = new PDFLoader(filePath);

    const docs = await loader.load();

    return docs;
}


module.exports = loadPDF;