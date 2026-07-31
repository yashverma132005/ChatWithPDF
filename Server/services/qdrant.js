require("dotenv").config();


const { QdrantClient } = require("@qdrant/js-client-rest");


const client = new QdrantClient({

    url:process.env.QDRANT_URL,

});



async function initializeCollection(){


    const collections = await client.getCollections();


    const exists = collections.collections.some(

        collection =>
            collection.name === process.env.QDRANT_COLLECTION

    );



    if(!exists){


        await client.createCollection(

            process.env.QDRANT_COLLECTION,

            {

                vectors: {
                    size: 384,
                    distance: "Cosine"
                }

            }

        );


        console.log("✅ Qdrant collection created");


    }


}



module.exports={

    client,

    initializeCollection

};