import express , { Router } from 'express'
import Summary from '../models/Summarizer.js';
import dotenv from 'dotenv'
import { authMiddleware } from '../middleware/authMiddleware.js';


dotenv.config();

const MODEL = "facebook/bart-large-cnn";
const HF_API_KEY = process.env.HF_API_KEY;

console.log("HF_API_KEY:", HF_API_KEY ? "Loaded ✅" : "Missing ❌");

const router = express.Router();

router.post('/summarize', authMiddleware, async (req , res) => {
    try {
        const { text } = req.body;
        if (!text) return res.status(400).json({ error: "No text provided" });
        console.log("Incoming text:", text);
        

        //Call hugging face api
        const response = await fetch(`https://api-inference.huggingface.co/models/${MODEL}` , {
            method: "POST",
            headers: {
                Authorization: `Bearer ${HF_API_KEY}`,
                "Content-Type":"application/json",
            },

            body: JSON.stringify({ inputs: text }),
        });

        const data = await response.json();
        console.log("Huggingface response :", data);

        if(Array.isArray(data) && data[0]?.summary_text){
            const summaryText = data[0].summary_text;

            // SAVE SUMMARY LINKED TO LOGGEDIN USER
            const userId = req.user._id;

            const newSummary = new Summary({ text, summary: summaryText, user: userId });
            await newSummary.save();

            //SEND RESPONSE TO FRONTEND
            return res.json({ summary: summaryText});
        } else {
            res.status(500).json({ error: "Summarization failed", details: data });
        }

        if(data.error) return res.status(500).json({ error: data.error });

        res.json({ summary : summaryText });
    } catch (error) {
        console.log("Server error:" , error.message);
        res.status(500).json({ error: "Something went wrong "});
    }
});

router.get("/summaries",authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id; // from JWT/session
    const summaries = await Summary.find({ user: userId }).sort({ createdAt: -1 });
    res.json(summaries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/history",authMiddleware, async (req, res) => {
    try {
        const userId = req.user._id;
        const history = await Summary.find({ user: userId }).sort({ createdAt: -1 }).limit(10);
        res.json(history);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch history " });
    }
})


export default router;