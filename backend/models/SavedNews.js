import mongoose from "mongoose";

const savedNewsSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
  urlToImage: String,
  publishedAt: String,
  source: {
    id: String,
    name: String,
  },
}, { timestamps: true });

export default mongoose.model("SavedNews", savedNewsSchema);
