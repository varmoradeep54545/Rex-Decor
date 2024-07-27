import React from "react";
import ProductList from "../pages/ProductList";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Items = () => {
  useEffect(() => {
    {
     window.scrollTo(0, 0);
   }
 });
  return (
    <>
      <Navbar />
      <ProductList />
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Items;
