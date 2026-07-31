require("dotenv").config();

const { Worker } = require("bullmq");
const ingest = require("./services/ingest");


const connection = {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
};



const worker = new Worker(
    "pdf-processing",

    async (job) => {

        console.log("\n================================");
        console.log(`🚀 Processing Job #${job.id}`);
        console.log("File Details:");
        console.log(job.data);
        console.log("================================");


        try {

            const result = await ingest(
                job.data.filePath,
                job.data.fileName
            );


            console.log("================================");
            console.log(`✅ Finished Job #${job.id}`);
            console.log("Ingestion Result:");
            console.log(result);
            console.log("================================\n");


            return result;


        } catch(error) {

            console.error(
                `❌ Error processing Job #${job.id}`
            );

            console.error(error);

            throw error;

        }

    },


    {
        connection,

        // retry failed jobs
        attempts: 3,

        backoff: {
            type: "exponential",
            delay: 5000,
        },

    }
);




worker.on(
    "completed",
    (job, result) => {

        console.log(
            `🎉 Job ${job.id} completed`
        );

    }
);



worker.on(
    "failed",
    (job, err) => {

        console.error(
            `❌ Job ${job?.id} failed`
        );

        console.error(err);

    }
);



worker.on(
    "error",
    (err)=>{

        console.error(
            "Worker Error:",
            err
        );

    }
);



console.log(
    "🚀 Worker is listening..."
);