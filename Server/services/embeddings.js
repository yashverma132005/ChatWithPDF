const { Embeddings } = require("@langchain/core/embeddings");
const { pipeline } = require("@xenova/transformers");


class LocalHuggingFaceEmbeddings extends Embeddings {

    constructor() {
        super();

        this.model = null;
    }


    async loadModel() {

        if (!this.model) {

            this.model = await pipeline(
                "feature-extraction",
                "Xenova/all-MiniLM-L6-v2"
            );

        }

    }


    async embedDocuments(documents) {

        await this.loadModel();

        const embeddings = [];

        for (const doc of documents) {

            const output = await this.model(
                doc,
                {
                    pooling: "mean",
                    normalize: true
                }
            );

            embeddings.push(
                Array.from(output.data)
            );

        }

        return embeddings;

    }


    async embedQuery(query) {

        await this.loadModel();

        const output = await this.model(
            query,
            {
                pooling: "mean",
                normalize: true
            }
        );


        return Array.from(output.data);

    }

}


module.exports = new LocalHuggingFaceEmbeddings();