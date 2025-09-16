// frontend/src/services/newsService.js
const API_URL = import.meta.env.VITE_API_URL; // from .env

export async function fetchTopHeadlines() {
  const res = await fetch(`${API_URL}/top`);
  if (!res.ok) throw new Error("Failed to fetch top headlines");
  const data = await res.json();
  console.log(data.articles)
  return data.articles || [];
}

export async function fetchCategoryNews(category) {
  const res = await fetch(`${API_URL}/category/${category}`);
  if (!res.ok) throw new Error("Failed to fetch category news");
  const data = await res.json();
  return data.articles || [];
}
