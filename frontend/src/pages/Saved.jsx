// frontend/src/pages/Saved.jsx
import { useEffect, useState } from "react";
import { getSavedArticles } from "../services/articleService";
import NewsCard from "../components/NewsCard";

export default function Saved() {
  const [savedNews, setSavedNews] = useState([]);

  const loadSaved = async () => {
    try {
      const data = await getSavedArticles();
      setSavedNews(data || []);
    } catch (err) {
      console.error("Load saved error:", err);
    }
  };

  useEffect(() => {
    loadSaved();
  }, []);

  const handleRemoved = (id) => {
    setSavedNews((prev) => prev.filter((a) => a._id !== id));
  };

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {savedNews.length === 0 ? (
        <p className="text-center col-span-full text-gray-600">No saved articles yet.</p>
      ) : (
        savedNews.map((article) => (
          <NewsCard key={article._id} article={article} isSavedPage onRemoved={handleRemoved} />
        ))
      )}
    </div>
  );
}
