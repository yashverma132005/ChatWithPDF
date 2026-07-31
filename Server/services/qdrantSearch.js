

require("dotenv").config();

const { QdrantClient } = require("@qdrant/js-client-rest");
const embeddings = require("./embeddings");


const client = new QdrantClient({
    url: process.env.QDRANT_URL,
});



async function searchSimilarChunks(question) {


    console.log("🔎 Searching:", question);


    const queryVector = await embeddings.embedQuery(
        question
    );


    const results = await client.search(

        process.env.QDRANT_COLLECTION,

        {
            vector: queryVector,

            limit: 5,

            with_payload: true,
        }

    );
    console.log(JSON.stringify(results[0], null, 2));

    console.log(
        "Qdrant Raw Result:"
    );

    console.log(
        JSON.stringify(results, null, 2)
    );



    return results.map((item)=>({

        text:
            item.payload?.content ||
            "No text found",


        metadata:
            item.payload?.metadata || {},


        score:item.score

    }));


}



module.exports = searchSimilarChunks;