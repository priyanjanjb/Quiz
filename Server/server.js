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
    await mongoose.connect(process.env.MONGO_URI); // no extra options needed
    console.log("✅ MongoDB Connected!");
  } catch (err) {
    console.error("❌ MongoDB connection failed:");
    console.error(err.message);
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
  responses: { type: Object, required: true },
  answerType: { type: String },
  score: { type: Number },
  timeSpent: { type: Object }, // store time spent on each form
  audioPlays: { type: Object }, // store how many times audio was played
  createdAt: { type: Date, default: Date.now },
});

const Response = mongoose.model("Response", responseSchema);

// ======================
// API
// ======================

app.post("/api/submit", async (req, res) => {
  try {
    const { name, responses, answerType, score, timeSpent, audioPlays } = req.body;

    if (!name || !responses) {
      return res.status(400).json({ message: "Name and responses are required." });
    }

    const newResponse = new Response({ name, responses, answerType, score, timeSpent, audioPlays });
    await newResponse.save();

    res.json({ message: "Responses saved successfully!", score });
  } catch (error) {
    console.error("Error saving response:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ======================
// Server Start
// ======================

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));