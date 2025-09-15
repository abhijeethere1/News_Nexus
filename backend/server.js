// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// CORS config
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// News API routes
app.get("/api/news/top", async (req, res) => {
  try {
    const url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=20&apiKey=${process.env.NEWS_API_KEY}`;
    const response = await fetch(url); // ✅ Node 18+ has fetch built-in
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/news/category/:cat", async (req, res) => {
  try {
    const category = req.params.cat;
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=20&apiKey=${process.env.NEWS_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// MongoDB setup
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// Schema & model
const savedNewsSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    url: { type: String, required: true, unique: true },
    urlToImage: String,
    publishedAt: String,
    source: { id: String, name: String },
    category: String,
  },
  { timestamps: true }
);

const SavedNews = mongoose.model("SavedNews", savedNewsSchema);

// Saved news routes
app.post("/api/saved", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "url required" });

    const existing = await SavedNews.findOne({ url });
    if (existing)
      return res.json({ message: "already_saved", article: existing });

    const doc = await SavedNews.create(req.body);
    res.json({ message: "saved", article: doc });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/saved", async (req, res) => {
  try {
    const list = await SavedNews.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/saved/:id", async (req, res) => {
  try {
    await SavedNews.findByIdAndDelete(req.params.id);
    res.json({ message: "deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
