import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from "cors";
import cron from "node-cron";
import axios from "axios"

import reviewRoutes from './routes/reviewRoutes.js';
import healthRoutes from './routes/health.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', reviewRoutes);
app.use('/health', healthRoutes);

const PORT = process.env.PORT || 3000;

cron.schedule('*/15 * * * *', async () => {
    const response = await axios.post("http://resume-review-server.onrender.com/health/check");
    console.log("Health check successful:", response.data);
});

app.use("/", (req, res) => {
    return res.status(200).send({ message: "Welcome to resume review using lanchain & gemini key." });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});