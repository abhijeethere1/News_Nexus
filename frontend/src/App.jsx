import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Categories from "./pages/Categories.jsx";
import Saved from "./pages/Saved.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
        
        {/* Site Heading */}
        <header className="text-center py-6 bg-indigo-800 dark:bg-indigo-900 text-white shadow-md">
          <h1 className="text-3xl md:text-4xl font-bold">NewsNexus 📰</h1>
        </header>

        {/* Navbar */}
        <nav className="flex justify-center p-4 bg-indigo-700 dark:bg-indigo-800 text-white space-x-6 shadow-md">
          <Link to="/" className="hover:text-indigo-300 transition-colors">Home</Link>
          <Link to="/categories" className="hover:text-indigo-300 transition-colors">Categories</Link>
          <Link to="/saved" className="hover:text-indigo-300 transition-colors">Saved</Link>
        </nav>

        {/* Page Content */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/saved" element={<Saved />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
