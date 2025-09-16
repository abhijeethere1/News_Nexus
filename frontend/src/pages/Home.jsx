// frontend/src/pages/Home.jsx
import { useEffect, useState } from "react";
import { fetchCategoryNews, fetchTopHeadlines } from "../services/newsService"; // your existing news API service
import { getSavedArticles } from "../services/articleService";
import NewsCard from "../components/NewsCard";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [savedNews,setSavedNews] = useState([])

  const loadData = async () => {
    try {
      const headlines = await fetchTopHeadlines();
      const saved = await fetchCategoryNews();
      setArticles(headlines);
      setSavedNews(saved)
    } catch (err) {
      console.error("Load data error:", err);
    }
  };

  useEffect(() => {
    loadData();
    console.log(articles)
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.length === 0 ? (
        <p className="text-center col-span-full text-gray-600">No news found.</p>
      ) : (
        articles.map((article, idx) => {
          // mark as saved if saved list contains same URL
          const matched = savedNews.find((s) => s.url === article.url);
          const articleWithId = matched ? { ...article, _id: matched._id } : article;
          return (
            <NewsCard key={article.url || idx} article={articleWithId} onRemoved={loadData} />
          );
        })
      )}
    </div>
  );
}
