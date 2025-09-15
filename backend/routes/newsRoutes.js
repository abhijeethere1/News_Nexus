import express from "express";
import SavedNews from "../models/SavedNews.js";

const router = express.Router();

// Save news
router.post("/save", async (req, res) => {
  try {
    const news = new SavedNews(req.body);
    await news.save();
    res.json({ message: "News saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all saved news
router.get("/saved", async (req, res) => {
  try {
    const news = await SavedNews.find();
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove saved news by id
router.delete("/remove/:id", async (req, res) => {
  try {
    await SavedNews.findByIdAndDelete(req.params.id);
    res.json({ message: "News removed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
