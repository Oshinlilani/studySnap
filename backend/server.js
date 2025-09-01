import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import AuthRouter from './routes/AuthRouter.js'
import SummaryRouter from './routes/Summarize.js'

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(bodyParser.json());



mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error("Mongo connect error", err));

app.use('/auth', AuthRouter);
app.use('/summary', SummaryRouter);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
