  import React, { useState, useContext, useEffect } from "react";
  import { motion } from "framer-motion";
  import { useNavigate } from "react-router-dom";
  import { useCart } from "../components/CartContext";
  import Modal from "../components/Modal";
  import ProductDetails from "./ProductDetails";
  import { AuthContext } from "../components/AuthContext";
  import { toast } from "react-toastify";

  const ProductItem = ({ product }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const { dispatch } = useCart();
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsLoggedIn(true);
      }
    }, []);
    const addToCart = (e) => {
      e.stopPropagation(); // Prevent the event from propagating to the parent div
      if (isLoggedIn) {
        dispatch({ type: "ADD_TO_CART", product });
        toast.success("Item add successfully", {
          position: "top-center",
          autoClose: 2000,
        });
      } else {
        navigate("/login");
      
      }
    };

    const openModal = () => {
      setModalIsOpen(true);
    };

    const closeModal = () => {
      setModalIsOpen(false);
    };

    return (
      <>
        <div onClick={openModal} className="w-full max-w-xs">
          <motion.div className="border rounded-lg shadow-md p-4 flex flex-col bg-slate-100 transition duration-300 ease-in-out hover:scale-105 h-full">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover mb-2 transition duration-300 ease-in-out hover:opacity-80"
            />
            <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
            <div className="flex justify-between items-center mt-auto">
              <p className="text-gray-600 font-medium">Rs. {product.price}</p>
              <button
                onClick={addToCart} // Prevent event propagation to the parent div
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
              >
                Add To Cart
              </button>
            </div>
          </motion.div>
        
        </div>
        <Modal isOpen={modalIsOpen} onClose={closeModal}>
          <ProductDetails product={product} onClose={closeModal} />
        </Modal>
      </>
    );
  };

  export default ProductItem;
