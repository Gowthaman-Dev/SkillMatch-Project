import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const NavBar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-xl md:text-2xl font-semibold text-gray-900 cursor-pointer"
        >
          SkillMatch
        </h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8 text-gray-700 text-sm font-medium">
          <Link to="/topjobs" className="hover:text-black transition">
            Top Jobs
          </Link>
          <Link to="/people" className="hover:text-black transition">
            People
          </Link>
          <Link to="/job" className="hover:text-black transition">
            Jobs
          </Link>
          <Link to="/getapp" className="hover:text-black transition">
            Get the App
          </Link>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 text-sm border border-gray-400 text-gray-700 rounded-md hover:bg-gray-100 transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-5 py-2 text-sm bg-black text-white rounded-md hover:opacity-90 transition"
          >
            Register
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-4">
          <Link to="/topjobs" onClick={() => setMenuOpen(false)} className="block">
            Top Jobs
          </Link>
          <Link to="/people" onClick={() => setMenuOpen(false)} className="block">
            People
          </Link>
          <Link to="/job" onClick={() => setMenuOpen(false)} className="block">
            Jobs
          </Link>
          <Link to="/getapp" onClick={() => setMenuOpen(false)} className="block">
            Get the App
          </Link>

          <hr />

          <button
            onClick={() => {
              navigate("/login");
              setMenuOpen(false);
            }}
            className="w-full border border-gray-400 py-2 rounded-md"
          >
            Login
          </button>

          <button
            onClick={() => {
              navigate("/register");
              setMenuOpen(false);
            }}
            className="w-full bg-black text-white py-2 rounded-md"
          >
            Register
          </button>
        </div>
      )}
    </header>
  );
};

export default NavBar;
