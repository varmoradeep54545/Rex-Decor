import React from 'react';
import Image from "../assets/resort.jpg";
import { motion } from 'framer-motion';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer.jsx";
import ProductList from '../pages/ProductList.jsx';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row justify-center items-center bg-slate-100 py-10 px-6 md:px-20">
        <motion.div
          className="text-center md:text-left md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl pt-5 md:pt-10 pl-5 md:pl-10 font-bold font-playfair">
            Elegant Resort, unforgettable <br /> experiences
          </h1>
          <h3 className="text-sm sm:text-md md:text-lg lg:text-xl mt-4 px-5 md:px-10 font-roboto">
            Transform your resort with our exquisite decoration services, creating unforgettable experiences through stunning and elegant designs.
          </h3>
        </motion.div>
        <motion.div
          className="flex justify-center py-5 pr-5 md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img 
            src={Image} 
            alt="Resort Decor" 
            className="h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] w-full sm:w-[400px] md:w-[600px] lg:w-[750px] xl:h-[550px] xl:w-[1000px] rounded-xl shadow-lg" 
          />
        </motion.div>
      </div>
      <ProductList />
      <Footer />
    </>
  );
}

export default Home;
