// frontend/src/services/articleService.js
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

async function request(url, options = {}) {
  const res = await fetch(url, options);
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) throw new Error(data?.error || data?.message || res.statusText);
  return data;
}

export async function saveArticle(article) {
  return request(`${API_BASE}/saved`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(article),
  });
}

export async function getSavedArticles() {
  return request(`${API_BASE}/saved`);
}

export async function removeArticle(id) {
  return request(`${API_BASE}/saved/${id}`, { method: "DELETE" });
}
