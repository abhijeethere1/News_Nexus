const API_URL = "http://localhost:5000/api/news";

export async function saveNews(news) {
  const res = await fetch(`${API_URL}/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(news),
  });
  return res.json();
}

export async function getSavedNews() {
  const res = await fetch(`${API_URL}/saved`);
  return res.json();
}

export async function removeNews(id) {
  const res = await fetch(`${API_URL}/remove/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
