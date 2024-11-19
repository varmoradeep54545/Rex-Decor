import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

const ForgotPassword = () => {
  const [showChangePassword, setShowChangePassword] = useState(true);
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const navigate = useNavigate(); // Hook for navigation

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();

    const { oldPassword, newPassword, confirmPassword } = passwords;
    const passwordErrors = validateNewPassword(newPassword);
    if (passwordErrors.length > 0) {
      alert(`Password Validation Failed:\n${passwordErrors.join("\n")}`);
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const userId = localStorage.getItem("userid") || "";

    if (!userId) {
      alert("User ID is missing. Please log in again.");
      return;
    }

    try {
      const response = await fetch(
        `https://rex-decor-api.vercel.app/profile/change-password/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ oldPassword, newPassword }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Password changed successfully!");
        setShowChangePassword(false);
        navigate("/login"); // Redirect to the login page
      } else {
        toast.error(data.message || "Failed to change password.");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("Failed to change password. Please try again.");
    }
  };

  const validateNewPassword = (password) => {
    const errors = [];
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long.");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter.");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter.");
    }
    if (!/\d/.test(password)) {
      errors.push("Password must contain at least one number.");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("Password must contain at least one special character.");
    }
    return errors;
  };

  const handlePasswordCancel = () => {
    setPasswords({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setShowChangePassword(true);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row h-auto md:h-[600px] border border-gray-300 bg-white rounded-md shadow-lg m-4 md:m-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2 h-48 md:h-full flex items-center justify-center"
          style={{
            backgroundImage: `url('/src/assets/loginlogo.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></motion.div>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex w-full md:w-1/2 bg-white items-center justify-center p-4"
        >
          <div className="max-w-md w-full space-y-6">
            <div className="text-center">
              <FaUserAlt className="mx-auto h-12 w-auto" />
              <h2 className="mt-6 text-2xl md:text-3xl font-extrabold text-gray-900">
                Change Password
              </h2>
            </div>
            {showChangePassword && (
              <form onSubmit={handlePasswordSave} className="space-y-4">
                <div>
                  <label
                    htmlFor="oldPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Old Password:
                  </label>
                  <input
                    type="password"
                    name="oldPassword"
                    value={passwords.oldPassword}
                    onChange={handlePasswordChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    New Password:
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwords.newPassword}
                    onChange={handlePasswordChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm New Password:
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwords.confirmPassword}
                    onChange={handlePasswordChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="submit"
                    className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Save Password
                  </button>
                  <motion.button
                    onClick={handlePasswordCancel}
                    className="w-full md:w-auto px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    Cancel
                  </motion.button>
                  <Link
                    to="/login"
                    className="w-full md:w-auto px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 text-center"
                  >
                    Back
                  </Link>
                </div>
              </form>
            )}
          </div>
        </motion.div>
        <ToastContainer />
      </div>
    </>
  );
};

export default ForgotPassword;
