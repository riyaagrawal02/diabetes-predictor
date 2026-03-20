import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuth(!!token);
  }, []);

  const isActive = (path) =>
    location.pathname === path ? "text-teal-600 font-semibold" : "text-gray-700";

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white/90 backdrop-blur shadow-md fixed w-full top-0 z-50">
       <Link to="/" className="flex items-center space-x-3">
        <img
          src="/logo.png"
          alt="App Logo"
          className="w-10 h-10 object-contain drop-shadow-sm"
        />
        <span className="text-xl font-extrabold text-teal-600 tracking-tight">
          Diabetes Predictor
        </span>
      </Link>

      <ul className="flex space-x-6 text-gray-700 font-medium">
        <li>
          <Link to="/" className={`hover:text-teal-600 transition ${isActive("/")}`}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className={`hover:text-teal-600 transition ${isActive("/about")}`}>
            About
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className={`hover:text-teal-600 transition ${isActive("/contact")}`}
          >
            Contact
          </Link>
        </li>
      </ul>

      {!auth ? (
        <Link
          to="/login"
          className="bg-teal-600 text-white px-5 py-2 rounded-lg shadow hover:bg-teal-700 transition"
        >
          Login
        </Link>
      ) : (
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
            setAuth(false);
          }}
          className="bg-teal-600 text-white px-5 py-2 rounded-lg shadow hover:bg-teal-700 transition"
        >
          Logout
        </button>
      )}
    </nav>
  );
}

export default Navbar;
