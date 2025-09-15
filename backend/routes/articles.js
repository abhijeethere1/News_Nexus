// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Article from "./models/Article.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Save article
app.post("/api/saved", async (req, res) => {
  try {
    const article = new Article(req.body);
    await article.save();
    res.json({ success: true, message: "Article saved!" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get all saved articles
app.get("/api/saved", async (req, res) => {
  try {
    const savedArticles = await Article.find();
    res.json(savedArticles);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log("🚀 Server running");
});
