import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loginlogo from "../assets/loginlogo.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [passwordError, setPasswordError] = useState(""); // Password validation error message
  const navigate = useNavigate();

  // Function to validate password
  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return "Password must be at least 8 characters long.";
    } else if (!hasUpperCase) {
      return "Password must contain at least one uppercase letter.";
    } else if (!hasLowerCase) {
      return "Password must contain at least one lowercase letter.";
    } else if (!hasNumbers) {
      return "Password must contain at least one number.";
    } else if (!hasSpecialChar) {
      return "Password must contain at least one special character.";
    }
    return ""; // Return empty if the password is valid
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password before submitting
    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return; // Stop submission if password is invalid
    } else {
      setPasswordError(""); // Clear error if password is valid
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      console.log("response", response.data);

      localStorage.setItem("token", response.data.token); // Save JWT token to local storage
      localStorage.setItem("userid", response.data.user.userId);

      toast.success("Successful Login", { position: "top-center" });
      setTimeout(() => {
        navigate("/"); // Redirect to home page after successful login
      }, 1500);
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data : error.message
      );
      toast.error(
        error.response ? error.response.data.message : "Login failed",
        { position: "top-center" }
      );
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:h-[600px] border border-gray-300 bg-white rounded-md shadow-lg m-5  overflow-hidden">
      {/* Image Section */}
      <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <img
              src={loginlogo}
              className="w-full h-full object-cover"
            />
          </motion.div>

      {/* Form Section */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex w-full md:w-1/2 bg-white items-center justify-center p-4 md:p-10"
      >
        <div className="max-w-md w-full space-y-8">
          <div>
            <FaUserAlt className="mx-auto h-12 w-auto" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>
          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}
          {passwordError && (
            <div className="text-red-500 text-center mb-4">{passwordError}</div>
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
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center"></div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
          <div className="mt-6 flex items-center justify-center">
            <div className="w-full border-t border-gray-300" />

            <div className="w-full border-t border-gray-300" />
          </div>

          <div className="w-full flex justify-center text-sm text-gray-600 ">
            Don't have an account?{" "}
            <Link to="/register" className="text-indigo-500 font-bold pl-2">
              Sign up here
            </Link>
          </div>
        </div>
      </motion.div>
      <ToastContainer />
    </div>
  );
};

export default Login;
