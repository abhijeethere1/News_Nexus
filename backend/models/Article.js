import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
  urlToImage: String,
  source: {
    name: String,
  },
});

export default mongoose.model("Article", articleSchema);
