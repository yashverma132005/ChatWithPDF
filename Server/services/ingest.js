

require("dotenv").config();

const loadPDF = require("./pdfLoader");
const splitDocuments = require("./splitter");
const embeddings = require("./embeddings");

const {
    client,
    initializeCollection
} = require("./qdrant");

const {
    QdrantVectorStore
} = require("@langchain/qdrant");



async function ingest(filePath) {

    console.log("📄 Loading PDF");


    const docs = await loadPDF(filePath);


    console.log(
        `Pages loaded: ${docs.length}`
    );



    console.log("✂️ Splitting document");


    const chunks = await splitDocuments(docs);


    console.log(
        `Chunks created: ${chunks.length}`
    );



    await initializeCollection();



    console.log(
        "🧠 Creating embeddings and storing vectors"
    );



    await QdrantVectorStore.fromDocuments(

        chunks,

        embeddings,

        {
            client,

            collectionName:
                process.env.QDRANT_COLLECTION
        }

    );


    console.log(
        "✅ Stored in Qdrant"
    );


    return {
        pages: docs.length,
        chunks: chunks.length
    };

}



module.exports = ingest;