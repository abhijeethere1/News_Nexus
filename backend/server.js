// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  methods: ["GET", "POST", "DELETE"],
  credentials: true,
}));
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// Schema & model
const savedNewsSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: { type: String, required: true, unique: true },
  urlToImage: String,
  publishedAt: String,
  source: { id: String, name: String },
  category: String,
}, { timestamps: true });

const SavedNews = mongoose.model("SavedNews", savedNewsSchema);

// POST /api/saved  -> save article (prevents duplicate by url)
app.post("/api/saved", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "url required" });

    const existing = await SavedNews.findOne({ url });
    if (existing) return res.json({ message: "already_saved", article: existing });

    const doc = await SavedNews.create(req.body);
    res.json({ message: "saved", article: doc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/saved -> list saved articles
app.get("/api/saved", async (req, res) => {
  try {
    const list = await SavedNews.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/saved/:id -> remove saved article
app.delete("/api/saved/:id", async (req, res) => {
  try {
    await SavedNews.findByIdAndDelete(req.params.id);
    res.json({ message: "deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
