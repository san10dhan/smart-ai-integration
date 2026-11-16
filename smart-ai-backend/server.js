import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "*",
  }),
);
app.use(express.json({ limit: "10kb" }));

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

app.post("/api/chat", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (typeof prompt !== "string" || prompt.trim().length === 0) {
      return res.status(400).json({ error: "Prompt is required" });
    }
    if (prompt.trim().length > 4000) {
      return res.status(400).json({ err: "Length exceeds max limit" });
    }
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
    });
    res.json({
      reply: response.text ?? "",
    });
  } catch (error) {
    console.error("Gemini API error:", error);

    res.status(502).json({
      error: "Unable to generate AI response",
    });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running...");
});
