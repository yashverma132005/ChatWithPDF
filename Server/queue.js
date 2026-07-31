require("dotenv").config();

const { Queue } = require("bullmq");

const connection = {
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
};

const pdfQueue = new Queue("pdf-processing", {
  connection,
});

module.exports = pdfQueue;