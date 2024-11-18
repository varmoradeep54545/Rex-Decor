import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { CartProvider } from "./components/CartContext"; 
import Home from "./pages/Home";
import Items from "./pages/Items";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ProductDetails from "./pages/ProductDetails";
import AddToCartPage from "./pages/AddToCartPage";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "./components/AuthContext"; 
import Profile  from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import OrderHistory from "./pages/OrderHistory";

const App = () => {
  return (
    <AuthProvider> 
      <CartProvider> 
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/items" element={<Items />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/product/:id" element={<ProductDetailsWrapper />} />
            <Route path="/add-to-cart" element={<AddToCartPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

          </Routes>
        </Router>
        <ToastContainer />
      </CartProvider>
    </AuthProvider>
  );
};

const ProductDetailsWrapper = () => {
  const location = useLocation();
  const product = location.state?.product;

  return <ProductDetails product={product} />;
};

export default App;
