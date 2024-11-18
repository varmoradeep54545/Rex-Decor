import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import aboutImage from "../assets/about1.jpg";
import { motion } from "framer-motion";
import Login from "./Login";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <section className="flex justify-center py-10 px-6 md:px-20 ">
        <motion.div
          className="flex flex-col md:flex-row w-full max-w-6xl border border-gray-300 bg-white rounded-md shadow-lg overflow-hidden p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <img
              src={aboutImage}
              alt="Team"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div
            className="md:w-1/2 p-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <p className="text-lg leading-7 mb-6">
              Welcome to Decoration! We are your one-stop online shop for all
              things decoration. From elegant home decor to festive party
              supplies, we provide a wide range of high-quality decoration items
              to enhance any space or occasion.
            </p>
            <p className="text-lg leading-7 mb-6">
              Our mission is to offer a seamless and enjoyable shopping
              experience for our customers, bringing the finest decoration
              products directly to your doorstep. We believe in the power of
              beautiful surroundings and aim to inspire creativity and joy
              through our diverse selection of decor items.
            </p>
            <p className="text-lg leading-7">
              At Decoration, we are committed to excellence in both product
              quality and customer service. Our dedicated team works tirelessly
              to curate the best products and provide outstanding support to our
              customers. Thank you for choosing Decoration to bring beauty and
              style to your life.
            </p>
          </motion.div>
        </motion.div>
      </section>
      <Footer />
    </>
  );
};

export default AboutUs;
