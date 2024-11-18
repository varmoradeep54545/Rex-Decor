import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt, FaEye, FaEyeSlash } from "react-icons/fa";
<<<<<<< HEAD
import { motion } from "framer-motion";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
=======

import { motion } from "framer-motion";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
>>>>>>> 835756c (Modify code)

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
<<<<<<< HEAD
=======

>>>>>>> 835756c (Modify code)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
<<<<<<< HEAD
      toast.error('Passwords do not match', { position: 'top-center' });
      return;
    }
    try {
      const response = await axios.post('https://backend-2m3p.onrender.com/api/auth/register', { email, password });
      const { userId, token, message } = response.data;
      
      // Save userId and token in local storage or context
      localStorage.setItem('userId', userId);
      localStorage.setItem('token', token);
      console.log(userId);

      toast.success(message, { position: 'top-center' });
      setTimeout(() => {
        navigate('/login'); // Redirect to login page after successful registration
      }, 1500);
    } catch (error) {
      console.error("Registration error:", error.response ? error.response.data : error.message);
      toast.error(error.response ? error.response.data.message : 'Registration failed', { position: 'top-center' });
=======
      toast.error("Passwords do not match", { position: "top-center" });
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        { email, password }
      );

      toast.success("Registration Successful", { position: "top-center" });
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error(
        "Registration error:",
        error.response ? error.response.data : error.message
      );
      toast.error(
        error.response ? error.response.data.message : "Registration failed",
        { position: "top-center" }
      );
>>>>>>> 835756c (Modify code)
    }
  };

  return (
<<<<<<< HEAD
    <div className="flex h-[600px] flex-col md:flex-row border border-gray-300 bg-white rounded-md shadow-lg m-10 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex w-1/2 items-center justify-center"
        style={{
          backgroundImage: `url('../assets/loginlogo.jpg')`,
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      ></motion.div>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex w-1/2 bg-white items-center justify-center"
      >
        <div className="max-w-md w-full space-y-8 p-10">
=======
    <div className="flex flex-col md:flex-row md:h-[600px] border border-gray-300 bg-white rounded-md shadow-lg m-5  overflow-hidden">
      {/* Image Section */}
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center h-48 md:h-auto md:w-1/2 bg-gray-200"
        style={{
          backgroundImage: `url('/src/assets/loginlogo.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></motion.div>

      {/* Form Section */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center w-full md:w-1/2 bg-white p-6"
      >
        <div className="max-w-md w-full space-y-8">
>>>>>>> 835756c (Modify code)
          <div>
            <FaUserAlt className="mx-auto h-12 w-auto" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Create your account
            </h2>
          </div>
          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div className="relative">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
                <span
<<<<<<< HEAD
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
=======
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
>>>>>>> 835756c (Modify code)
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <div className="relative">
                <label htmlFor="confirm-password" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                />
                <span
<<<<<<< HEAD
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
=======
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
>>>>>>> 835756c (Modify code)
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

<<<<<<< HEAD
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

=======
>>>>>>> 835756c (Modify code)
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign up
              </button>
            </div>
          </form>
          <div className="mt-6 flex items-center justify-center">
            <div className="w-full border-t border-gray-300" />
<<<<<<< HEAD
            <div className="w-full flex justify-center text-sm text-gray-600 -mt-3">
              Or continue with
            </div>
            <div className="w-full border-t border-gray-300" />
          </div>
          
          <div className="w-full flex justify-center text-sm text-gray-600 ">
=======
            
            <div className="w-full border-t border-gray-300" />
          </div>

          <div className="w-full flex justify-center text-sm text-gray-600">
>>>>>>> 835756c (Modify code)
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-500 font-bold pl-2">
              Sign in here
            </Link>
          </div>
        </div>
      </motion.div>
      <ToastContainer />
    </div>
  );
};

export default Register;
