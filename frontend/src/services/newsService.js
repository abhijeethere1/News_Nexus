const API_KEY = import.meta.env.VITE_NEWS_API_KEY; // fetch from .env
const BASE_URL = "https://newsapi.org/v2";

export async function fetchTopHeadlines() {
  const res = await fetch(`${BASE_URL}/top-headlines?country=us&pageSize=20&apiKey=${API_KEY}`);
  const data = await res.json();
  return data.articles;
}

export async function fetchCategoryNews(category) {
  const res = await fetch(`${BASE_URL}/top-headlines?country=us&category=${category}&pageSize=20&apiKey=${API_KEY}`);
  const data = await res.json();
  return data.articles;
}
