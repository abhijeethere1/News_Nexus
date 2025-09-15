import { useState, useEffect } from "react";
import { fetchCategoryNews } from "../services/newsService";
import NewsCard from "../components/NewsCard";

const categories = ["business", "entertainment", "health", "science", "sports", "technology"];

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState("business");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchCategoryNews(selectedCategory).then((data) => {
      setArticles(data);
      setLoading(false);
    });
  }, [selectedCategory]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Categories</h1>

      {/* Category Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              selectedCategory === cat
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-indigo-500 hover:text-white"
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* News Grid */}
      {loading ? (
        <p className="text-gray-700 dark:text-gray-300">Loading {selectedCategory} news...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <NewsCard key={index} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
