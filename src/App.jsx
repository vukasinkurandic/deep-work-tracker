import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TestPage from "./pages/TestPage";

export default function App() {
  return (
    <div>
    <nav className="w-full flex justify-center border-b border-gray-200 bg-white shadow-sm sticky top-0 z-30">
      <div className="max-w-md w-full flex gap-8 py-4 items-center justify-center">
        <Link 
          to="/" 
          className="text-gray-700 font-semibold tracking-wide hover:text-blue-600 transition"
        >
          Home
        </Link>
        <Link 
          to="/test" 
          className="text-gray-700 font-semibold tracking-wide hover:text-blue-600 transition"
        >
          Test
        </Link>
      </div>
    </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </div>
  );
}
