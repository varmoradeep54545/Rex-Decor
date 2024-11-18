import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../components/CartContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddToCartPage() {
  const { cart, dispatch } = useCart();

  const handleQuantityChange = (id, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", id, quantity });
  };

  const handleRemoveItem = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", id });
    toast.success("Item removed from cart!", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto p-4 flex flex-col sm:flex-row flex-wrap"
      >
        <div className="w-full sm:w-2/3 lg:w-3/4 px-4 py-6 ">
          <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
            {cart.length === 0 ? (
              <div className="text-center text-gray-500">
                <h1 className="text-[30px]">Missing Cart items?</h1>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {cart.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-md shadow-md p-4"
                  >
                    <div className="flex items-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-24 h-24 rounded-md"
                      />
                      <div className="ml-4">
                        <h2 className="text-lg font-bold">{product.name}</h2>
                        <p className="text-gray-900 font-bold">
                          Rs. {product.price.toFixed(2)}
                        </p>
                        <div className="flex items-center mt-2">
                          <span className="mr-2">Quantity:</span>
                          <select
                            className="rounded-md border border-gray-300 px-2 py-1"
                            value={product.quantity}
                            onChange={(e) =>
                              handleQuantityChange(
                                product.id,
                                parseInt(e.target.value)
                              )
                            }
                          >
                            {[...Array(10).keys()].map((i) => (
                              <option key={i + 1} value={i + 1}>
                                {i + 1}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4"
                      onClick={() => handleRemoveItem(product.id)}
                    >
                      Remove
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {cart.length > 0 && (
          <div className="w-full sm:w-1/3 lg:w-1/4 px-4 py-6">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-md p-4"
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg font-bold mb-4"
              >
                Order Summary
              </motion.h2>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="grid grid-cols-2 gap-4"
              >
                <div>Subtotal</div>
                <div className="text-right">
                  Rs.{" "}
                  {cart
                    .reduce((acc, item) => acc + item.price * item.quantity, 0)
                    .toFixed(2)}
                </div>

                <div>Tax estimate</div>
                <div className="text-right">
                  Rs.{" "}
                  {(
                    cart.reduce(
                      (acc, item) => acc + item.price * item.quantity,
                      0
                    ) * 0.08
                  ).toFixed(2)}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-4 font-bold text-lg"
              >
                <span>Order total:</span>{" "}
                <span className="float-right">
                  Rs.{" "}
                  {(
                    cart.reduce(
                      (acc, item) => acc + item.price * item.quantity,
                      0
                    ) * 1.08
                  ).toFixed(2)}
                </span>
              </motion.div>
              <Link to="/checkout">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 w-full"
                >
                  Checkout
                </motion.button>
              </Link>
            </motion.div>
          </div>
        )}
      </motion.div>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default AddToCartPage;
