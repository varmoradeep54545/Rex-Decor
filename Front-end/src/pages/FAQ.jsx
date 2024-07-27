import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const FAQ = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls the window to the top when component mounts
  }, []);

  // Animation variants for each FAQ item
  const itemVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl text-center font-bold text-gray-800 mb-6">FAQ</h1>
        <motion.div
          initial="initial"
          animate="animate"
          variants={{
            animate: {
              transition: {
                staggerChildren: 0.2, // Adds stagger effect between each item
              },
            },
          }}
          className="divide-y divide-gray-300"
        >
          <motion.div variants={itemVariants} className="py-4 border bg-slate-100 mb-2 rounded-md px-6">
            <h2 className="text-xl font-semibold mb-2">How can I purchase items from Decoration?</h2>
            <p className="text-gray-600">You can purchase items directly from our website. Browse through our catalog, add items to your cart, and proceed to checkout.</p>
          </motion.div>
          <motion.div variants={itemVariants} className="py-4 border rounded-md bg-slate-100 mb-2 px-6">
            <h2 className="text-xl font-semibold mb-2">What payment methods do you accept?</h2>
            <p className="text-gray-600">We accept major credit/debit cards, PayPal, and other secure payment methods for your convenience.</p>
          </motion.div>
          <motion.div variants={itemVariants} className="py-4 border rounded-md bg-slate-100 mb-2 px-6">
            <h2 className="text-xl font-semibold mb-2">How long does shipping take?</h2>
            <p className="text-gray-600">Shipping times may vary depending on your location and the items purchased. We strive to deliver your order as quickly as possible.</p>
          </motion.div>
          <motion.div variants={itemVariants} className="py-4 border rounded-md bg-slate-100 mb-2 px-6">
            <h2 className="text-xl font-semibold mb-2">Do you offer returns or exchanges?</h2>
            <p className="text-gray-600">Yes, we have a hassle-free return and exchange policy. Please check our Returns & Exchanges page for detailed information.</p>
          </motion.div>
          {/* Add more questions and answers as needed */}
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default FAQ;
