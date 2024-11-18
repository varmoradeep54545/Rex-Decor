import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls the window to the top when component mounts
  }, []);

  // Animation variants for each section
  const sectionVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Privacy Policy
        </h1>
        <motion.div
          initial="initial"
          animate="animate"
          variants={{
            animate: {
              transition: {
                staggerChildren: 0.2, // Adds stagger effect between each section
              },
            },
          }}
          className="divide-y divide-gray-300"
        >
          <motion.div variants={sectionVariants} className="py-4 bg-slate-100 rounded-md mb-2 px-6">
            <h2 className="text-xl font-semibold mb-2">Introduction</h2>
            <p className="text-gray-600">
              This Privacy Policy outlines how "Decoration" collects, uses,
              protects, and shares your personal information when you use our
              website and services.
            </p>
          </motion.div>
          <motion.div variants={sectionVariants} className="py-4 bg-slate-100 rounded-md mb-2 px-6">
            <h2 className="text-xl font-semibold mb-2">
              Information We Collect
            </h2>
            <p className="text-gray-600">
              We collect personal information such as your name, address,
              email, and payment details when you make a purchase on our
              website.
            </p>
          </motion.div>
          <motion.div variants={sectionVariants} className="py-4 bg-slate-100 rounded-md mb-2 px-6">
            <h2 className="text-xl font-semibold mb-2">How We Use Your Information</h2>
            <p className="text-gray-600">
              We use your information to process orders, communicate with you,
              and improve our services.
            </p>
          </motion.div>
          <motion.div variants={sectionVariants} className="py-4 bg-slate-100 rounded-md mb-2 px-6">
            <h2 className="text-xl font-semibold mb-2">Sharing Your Information</h2>
            <p className="text-gray-600">
              We may share your information with third-party service providers
              to fulfill orders and improve our website functionality.
            </p>
          </motion.div>
          {/* Add more sections as needed */}
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
