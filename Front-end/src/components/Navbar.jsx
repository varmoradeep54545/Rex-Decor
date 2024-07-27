import React, { useState, useEffect } from "react";
import { IoCartSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import Logo from "../assets/logo.png";

const Navbar = () => {  
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, dispatch } = useCart();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const isActive = (path) =>
    location.pathname === path ? "text-slate-500" : "";

  const handleUserIconClick = () => setShowDropdown((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "CLEAR_CART" });
    setShowDropdown(false);
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="flex bg-slate-200 text-black">
      <div className="container mx-auto py-2 px-10 flex items-center justify-between">
        <div className="flex-shrink-0">
          <Link
            to="/"
            className="font-bold text-2xl sm:text-3xl gap-2 tracking-wider font-cursive"
          >
            <img src={Logo} alt="Logo" className="w-16 h-10" />
          </Link>
        </div>
        <div className="flex-grow flex justify-center">
          <div className="flex gap-4">
            <Link
              to="/"
              className={`inline-block text-xl hover:text-slate-500 duration-200 ${isActive(
                "/"
              )}`}
            >
              Home
            </Link>
            <Link
              to="/items"
              className={`inline-block text-xl hover:text-slate-500 duration-200 ${isActive(
                "/items"
              )}`}
            >
              Items
            </Link>
            <Link
              to="/contact-us"
              className={`inline-block text-xl hover:text-slate-500 duration-200 ${isActive(
                "/contact-us"
              )}`}
            >
              Contact Us
            </Link>
            <Link
              to="/about-us"
              className={`inline-block text-xl hover:text-slate-500 duration-200 ${isActive(
                "/about-us"
              )}`}
            >
              About Us
            </Link>
          </div>
        </div>
        <div className="flex-shrink-0 flex gap-4 relative">
          <Link
            to="/add-to-cart"
            className="text-xl hover:text-slate-500 duration-200 relative"
          >
            <IoCartSharp className="w-8 h-8" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-orange-500 text-white rounded-full text-xs px-1">
                {totalItems}
              </span>
            )}
          </Link>
          {isLoggedIn ? (
            <div className="relative">
              <FaUserCircle
                className="w-8 h-8 cursor-pointer hover:text-slate-500 duration-200"
                onClick={handleUserIconClick}
              />
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
                  <Link
                  to={"/profile"}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-block text-xl hover:text-slate-500 duration-200"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
