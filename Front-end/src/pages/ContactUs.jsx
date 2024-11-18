import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUserCircle } from 'react-icons/fa';  // Import FaUserCircle icon
import Logo from "./../assets/logo.png";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add isLoggedIn state

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls the window to the top when component mounts

    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // Set logged in state if token exists
    }
  }, []);

  const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z]+\d+$/;
    return usernameRegex.test(username);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    if (!isLoggedIn) { // Check if the user is logged in
      toast.error('Please login first to submit the form', { position: "top-center" });
      return; // Do not submit the form if not logged in
    }

    if (!validateUsername(username)) {
      toast.error('Invalid username. Example: name123', { position: "top-center" });
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Invalid email address.', { position: "top-center" });
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, message }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.msg, { position: "top-center" });
        setUsername('');
        setEmail('');
        setMessage('');
      } else {
        toast.error(data.msg, { position: "top-center" });
      }
    } catch (error) {
      toast.error('Failed to submit the message. Please try again later.', { position: "top-center" });
    }
  };

  return (
    <>
      
      <Navbar />
      <motion.section 
        className="flex  flex-col md:flex-row w-full md:w-[80%] lg:w-[1000px] mx-auto my-5 bg-slate-300 rounded-md p-5 md:p-8 backdrop-blur-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative p-6 pt-18 md:pl-8 md:py-10 ">
          <motion.div 
            className="flex-shrink-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Link to="/" className="font-bold text-2xl sm:text-3xl gap-2 tracking-wider font-cursive">
              <img src={Logo} alt="Logo" className="w-16 h-10" />
            </Link>
          </motion.div>
        </div>

        <motion.form 
          className="relative flex-grow p-6 md:p-12 bg-white text-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="mb-12">
            <h2 className="mb-2 text-3xl text-center md:text-left">CONTACT US</h2>
            <p className="text-center md:text-left">Feel free to reach out to us, we'd love to hear from you!</p>
          </div>

          {/* Username input */}
          <div className="relative mb-6">
            <i className="fa-regular fa-user absolute top-2.5 left-3"></i>
            <input
              name="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full py-2 pl-10 pr-3 border border-gray-300 rounded bg-gray-100"
            />
          </div>

          {/* Email input */}
          <div className="relative mb-6">
            <i className="fa-regular fa-envelope absolute top-2.5 left-3 text-gray-600"></i>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-2 pl-10 pr-3 border border-gray-300 rounded bg-gray-100"
            />
          </div>

          {/* Message textarea */}
          <div className="relative mb-6">
            <i className="fa-regular fa-message absolute top-2.5 left-3 text-gray-600"></i>
            <textarea
              name="message"
              cols="30"
              rows="10"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full py-2 pl-10 pr-3 border border-gray-300 rounded bg-gray-100 resize-none"
            ></textarea>
          </div>

          {/* FaUserCircle icon visible only if logged in */}
          {isLoggedIn && (
            <div className="mb-4 flex items-center">
              <FaUserCircle className="text-3xl mr-2 hidden" />
              <span className="text-lg hidden">Logged in as: {localStorage.getItem("username") || "User"}</span>
            </div>
          )}

          <input
            className="w-full px-9 py-3 border-none rounded bg-blue-500 hover:bg-blue-700 shadow-inner text-white text-lg font-bold cursor-pointer"
            type="button"
            value="Submit"
            onClick={handleSubmit}
          />
        </motion.form>

        <motion.div 
          className="p-6 md:p-12 text-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <h3 className="mb-12 text-xl text-center md:text-left">OUR INFORMATION</h3>
          <ul className="space-y-8 text-sm text-center md:text-left">
            <li>
              <i className="fa-solid fa-location-dot w-6 pr-3"></i> Ahmedabad, India 380015
            </li>
            <li>
              <i className="fa-solid fa-envelope w-6 pr-3"></i> Email: Pateldeep1071@gmail.com
            </li>
            <li>
              <i className="fa-solid fa-phone w-6 pr-3"></i> Phone: +91 9409-214-160
            </li>
          </ul>
        </motion.div>
      </motion.section>
    
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Contact;
