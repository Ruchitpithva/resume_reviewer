import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import reviewRoutes from './routes/reviewRoutes.js';
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', reviewRoutes);

const PORT = process.env.PORT || 3000;

app.use("/", (req, res) => {
    return res.status(200).send({ message: "Welcome to resume review using lanchain & gemini key." });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});