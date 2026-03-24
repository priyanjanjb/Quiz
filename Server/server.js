import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const app = express();
app.use(cors());
app.use(express.json());

// ======================
// MongoDB Connection
// ======================
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected!");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    console.log("Retrying in 5 seconds...");
    setTimeout(connectDB, 5000);
  }
};
connectDB();

// ======================
// Schema
// ======================
const responseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  responses: { type: Object, required: true },       // form1 + form2 + form3
  answerType: { type: String },
  trainingInterest: { type: String },
  score: { type: Number },                           // optional
  timeSpent: { type: Object },                       // { form1: ms, form2: ms, form3: ms }
  totalTime: { type: Number },                       // sum of all forms
  audioCount: { type: Object },                      // number of audio plays per audio
  createdAt: { type: Date, default: Date.now },
});

const Response = mongoose.model("Response", responseSchema);

// ======================
// API: Submit Quiz
// ======================
app.post("/api/submit", async (req, res) => {
  try {
    const { name, responses, answerType, trainingInterest, score, timeSpent, audioCount } = req.body;

    if (!name || !responses) {
      return res.status(400).json({ message: "Name and responses are required." });
    }

    // Calculate total time automatically
    const totalTime = Object.values(timeSpent || {}).reduce((sum, val) => sum + (val || 0), 0);

    const newResponse = new Response({
      name,
      responses,
      answerType,
      trainingInterest,
      score,
      timeSpent,
      totalTime,
      audioCount,
    });

    await newResponse.save();

    res.json({ message: "Responses saved successfully!", totalTime, score });
  } catch (error) {
    console.error("Error saving response:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ======================
// API: Get All Responses (optional, for admin/testing)
// ======================
app.get("/api/responses", async (req, res) => {
  try {
    const allResponses = await Response.find().sort({ createdAt: -1 });
    res.json(allResponses);
  } catch (err) {
    console.error("Error fetching responses:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ======================
// Server Start
// ======================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));