// pages/ProductDetails.jsx
import React, { useState, useEffect } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/CartContext";
import { toast } from "react-toastify";

const ProductDetails = ({ product, onClose }) => {
  const { dispatch, saveCartToServer } = useCart();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const addToCart = () => {
    if (isLoggedIn) {
      // User is logged in, add the item to the cart
      toast.success("Item added to cart successfully", {
        position: "top-center",
        autoClose: 2000,
      });
      dispatch({ type: "ADD_TO_CART", product });
      
      // Save cart to server
      const userId = localStorage.getItem("userId"); // Ensure this is available
      if (userId) {
        saveCartToServer(userId);
      }
    } else {
      // User is not logged in, show a message
      toast.error("Please log in first to add items to the cart", {
        position: "top-center",
        autoClose: 2000,
      });
      navigate("/login"); // Redirect to login page
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.3 }}
      className="bg-white shadow-md rounded-lg max-w-6xl w-full p-6 relative"
    >
      <button
        onClick={onClose}
        className="absolute top-1 right-1 text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        <IoMdCloseCircleOutline className="h-6 w-6" />
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="rounded-md"
            />
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
            <p className="text-black text-xl mb-4">Rs. {product.price}</p>
            <p className="text-gray-600 mb-6">{product.description}</p>
          </div>
          <button
            onClick={addToCart}
            className="bg-white text-black border border-black px-4 py-2 rounded-md hover:bg-black hover:text-white transition duration-300"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
