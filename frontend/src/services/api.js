// frontend/src/services/articleService.js
const API_URL = import.meta.env.VITE_API_URL;

export async function saveArticle(news) {
  const res = await fetch(`${API_URL}/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(news),
  });
  console.log(res)
  return res.json();
}

export async function getSavedNews() {
  const res = await fetch(`${API_URL}/saved`);
  return res.json();
}

export async function removeArticle(id) {
  const res = await fetch(`${API_URL}/remove/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
