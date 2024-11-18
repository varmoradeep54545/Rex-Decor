import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userid");

  const generateOrderId = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/orders/${userId}`
        );
        const data = await response.json();

        const enrichedData = data.map((order) => ({
          ...order,
          orderId: generateOrderId(),
          status: "Success",
        }));

        setOrders(enrichedData);
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <motion.h1
          className="text-2xl font-bold mb-6 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          Order History
        </motion.h1>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="overflow-x-auto">
            <motion.table
              className="table-auto w-full border-collapse border border-gray-300 text-sm sm:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-2 py-2 sm:px-4">Order ID</th>
                  <th className="border border-gray-300 px-2 py-2 sm:px-4">Name</th>
                  <th className="border border-gray-300 px-2 py-2 sm:px-4">Email</th>
                  <th className="border border-gray-300 px-2 py-2 sm:px-4">Phone</th>
                  <th className="border border-gray-300 px-2 py-2 sm:px-4">Address</th>
                  <th className="border border-gray-300 px-2 py-2 sm:px-4">City</th>
                  <th className="border border-gray-300 px-2 py-2 sm:px-4">Country</th>
                  <th className="border border-gray-300 px-2 py-2 sm:px-4">Postal</th>
                  <th className="border border-gray-300 px-2 py-2 sm:px-4">Total</th>
                  <th className="border border-gray-300 px-2 py-2 sm:px-4">Status</th>
                </tr>
              </thead>
              <motion.tbody
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
                }}
              >
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <motion.tr
                      key={order.orderId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <td className="border border-gray-300 px-2 py-2 sm:px-4"># {order.orderId}</td>
                      <td className="border border-gray-300 px-2 py-2 sm:px-4">{order.name}</td>
                      <td className="border border-gray-300 px-2 py-2 sm:px-4">{order.email}</td>
                      <td className="border border-gray-300 px-2 py-2 sm:px-4">{order.phone}</td>
                      <td className="border border-gray-300 px-2 py-2 sm:px-4">{order.address}</td>
                      <td className="border border-gray-300 px-2 py-2 sm:px-4">{order.city}</td>
                      <td className="border border-gray-300 px-2 py-2 sm:px-4">{order.country}</td>
                      <td className="border border-gray-300 px-2 py-2 sm:px-4">{order.postal}</td>
                      <td className="border border-gray-300 px-2 py-2 sm:px-4">$ {order.totalAmount}</td>
                      <td
                        className={`border border-gray-300 px-2 py-2 sm:px-4 text-center ${
                          order.status === "Success" ? "bg-green-400 font-semibold" : ""
                        }`}
                      >
                        {order.status}
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <motion.tr
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <td
                      colSpan="10"
                      className="border border-gray-300 px-4 py-2 text-center"
                    >
                      No orders found.
                    </td>
                  </motion.tr>
                )}
              </motion.tbody>
            </motion.table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderHistory;
