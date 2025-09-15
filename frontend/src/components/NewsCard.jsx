// frontend/src/components/NewsCard.jsx
import { useEffect, useState } from "react";
import { saveArticle, removeArticle } from "../services/articleService";

export default function NewsCard({ article, isSavedPage = false, onRemoved }) {
  const [savedId, setSavedId] = useState(article._id || null);
  const [loading, setLoading] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setSavedId(article._id || null);
  }, [article._id]);

  const handleToggle = async () => {
    try {
      setLoading(true);
      if (savedId) {
        // remove
        await removeArticle(savedId);
        setSavedId(null);
        if (onRemoved) onRemoved(savedId);
      } else {
        // save - send a trimmed payload
        const payload = {
          title: article.title,
          description: article.description,
          url: article.url,
          urlToImage: article.urlToImage,
          publishedAt: article.publishedAt || "",
          source: article.source || { name: article.source?.name || "" },
          category: article.category || "",
        };
        const res = await saveArticle(payload);
        const saved = res.article || res;
        setSavedId(saved._id || saved.id || null);
      }
    } catch (err) {
      console.error("Save/Remove error:", err);
      alert("Operation failed: " + (err.message || err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden flex flex-col">
      {(article.urlToImage || !imgError) && (
        <img
          src={
            !imgError && article.urlToImage
              ? article.urlToImage
              : "https://via.placeholder.com/400x250.png?text=No+Image"
          }
          alt={article.title}
          className="h-48 w-full object-cover"
          onError={() => setImgError(true)}
        />
      )}

      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 flex-grow">
          {article.description}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm"
          >
            Read More →
          </a>

          <button
            onClick={handleToggle}
            disabled={loading}
            className={`ml-3 px-3 py-1 rounded-md transition ${
              savedId
                ? "bg-red-50 text-red-600 hover:bg-red-100"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
            title={savedId ? "Remove from saved" : "Save article"}
          >
            {loading ? "..." : savedId ? "💔 Remove" : "🔖 Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
