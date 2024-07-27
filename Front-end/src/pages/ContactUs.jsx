import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "./../assets/logo.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls the window to the top when component mounts
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
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
    if (!isLoggedIn) {
      toast.error("Please log in first.", { position: "top-center" });
      return;
    }

    if (!validateUsername(username)) {
      toast.error("Invalid username. Example: name123", {
        position: "top-center",
      });
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Invalid email address.", { position: "top-center" });
      return;
    }

    try {
      const response = await fetch("https://backend-2m3p.onrender.com/api/contact/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ username, email, message }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorText}`
        );
      }

      const result = await response.json();
      toast.success(
        result.msg,
        { position: "top-center" },
        setTimeout(() => {
          window.location.reload();
        }, 3000)
      );
      setUsername("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error(`An error occurred: ${error.message}`, {
        position: "top-center",
      });
    }
  };

  return (
    <>
      <Navbar />
      <motion.section
        className="flex flex-col md:flex-row w-[1000px] ml-[250px] h-[650px] mx-16 my-5 bg-slate-300 rounded-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative p-6 md:pl-8 md:py-10">
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Link
              to="/"
              className="font-bold text-2xl sm:text-3xl gap-2 tracking-wider font-cursive"
            >
              <img src={Logo} alt="Logo" className="w-16 h-10" />
            </Link>
          </motion.div>
        </div>
        <motion.form
          className="relative flex-grow p-12 bg-white text-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="mb-12">
            <h2 className="mb-2 text-3xl">CONTACT US</h2>
            <p className="">
              {isLoggedIn
                ? "Feel free to reach out to us, we'd love to hear from you!"
                : "Please fill out the form below. Log in to submit your message."}
            </p>
          </div>
          <div className="relative mb-6">
            <i className="fa-regular fa-user absolute top-2.5 left-3 "></i>
            <input
              name="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full py-2 pl-10 pr-3 border border-gray-300 rounded bg-gray-100"
            />
          </div>
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
          <input
            className="px-9 py-3 border-none rounded bg-blue-500 hover:bg-blue-700 shadow-inner text-white text-lg font-bold cursor-pointer"
            type="button"
            value="Submit"
            onClick={handleSubmit}
          />
        </motion.form>
        <motion.div
          className="p-12 text-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <h3 className="mb-12 text-xl">OUR INFORMATION</h3>
          <ul className="space-y-8 text-sm">
            <li>
              <i className="fa-solid fa-location-dot w-6 pr-3"></i>Ahmedabad,
              India 380015
            </li>
            <li>
              <i className="fa-solid fa-envelope w-6 pr-3"></i>Email:
              Pateldeep1071@gmail.com
            </li>
            <li>
              <i className="fa-solid fa-phone w-6 pr-3"></i> Phone: +91
              9409-214-160
            </li>
          </ul>
          <div className="social-links"></div>
        </motion.div>
      </motion.section>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Contact;
