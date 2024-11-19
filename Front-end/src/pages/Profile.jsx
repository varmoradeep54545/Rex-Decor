import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { jwtDecode } from "jwt-decode";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    address: "",
    city: "",
    country: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    postalCode: "",
    userId: "",
    _id: "",
    date: "",
  });
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState({});
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const token = localStorage.getItem("token");

  // Decoding userId from JWT token
  const decoded = token ? jwtDecode(token) : null;
  const userId = decoded ? decoded.id : null;

  useEffect(() => {
    if (!userId) return; // Don't run if userId is not available

    // Fetch profile data using userId
    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          `https://rex-decor-api.vercel.app/api/profile/${userId}`
        );
        const data = await response.json();

        if (response.ok) {
          setProfileData({
            address: data.profile.address,
            city: data.profile.city,
            country: data.profile.country,
            firstName: data.profile.firstName,
            lastName: data.profile.lastName,
            email: data.profile.email,
            phone: data.profile.phone,
            postalCode: data.profile.postalCode,
          });
        } else {
          console.error(data.message || "Failed to fetch profile data.");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [userId]); // Dependency on userId to trigger fetch only when userId changes or is first set

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
    setSaved(false);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!profileData.firstName) newErrors.firstName = "First name is required";
    if (!profileData.lastName) newErrors.lastName = "Last name is required";
    if (!profileData.email || !/\S+@\S+\.\S+/.test(profileData.email))
      newErrors.email = "Valid email is required";
    if (!profileData.phone || !/^\d{10}$/.test(profileData.phone))
      newErrors.phone = "Phone number must be 10 digits";
    if (!profileData.address) newErrors.address = "Address is required";
    if (!profileData.city) newErrors.city = "City is required";
    if (!profileData.country) newErrors.country = "Country is required";
    if (!profileData.postalCode)
      newErrors.postalCode = "Postal code is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCancel = () => {
    setProfileData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      country: "",
      postalCode: "",
    });
    setErrors({});
    setSaved(false);
  };

  const handleChangePasswordClick = () => {
    setShowChangePassword(true);
  };

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
    // Ensure new password and confirm password match
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Assuming userId is stored locally or accessible via context/auth
    const userId = localStorage.getItem("userid") || ""; // Retrieve `userId` from localStorage or context

    if (!userId) {
      alert("User ID is missing. Please log in again.");
      return;
    }

    try {
      const response = await fetch(
        `https://rex-decor-api.vercel.app/api/profile/change-password/${userId}`,
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
        setShowChangePassword(false); // Hide password modal or reset state if applicable
      } else {
        alert(data.message || "Failed to change password.");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Failed to change password. Please try again.");
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
    setShowChangePassword(false);
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch(
        `https://rex-decor-api.vercel.app/api/profile/save/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profileData), // Sending profile data in the body as JSON
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSaved(true);
        alert("Profile saved successfully!");
      } else {
        alert(data.message || "Failed to save profile.");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile.");
    }
  };

  return (
    <>
      <Navbar />
      <motion.div
        className="max-w-4xl mx-auto p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Basic Info</h2>

          <div className="flex items-center mb-6">
            <div className="ml-4">
              <motion.h3
                className="text-xl font-semibold"
                initial={{ x: -50 }}
                animate={{ x: 0 }}
              >
                {profileData.firstName} {profileData.lastName}
              </motion.h3>
              <motion.button
                onClick={handleChangePasswordClick}
                className="mt-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-black rounded"
                whileHover={{ scale: 1.05 }}
              >
                Change Password
              </motion.button>
            </div>
          </div>

          <motion.div
            className="grid grid-cols-2 gap-6 mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {Object.keys(profileData).map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700">
                  {field.charAt(0).toUpperCase() +
                    field.slice(1).replace(/([A-Z])/g, " $1")}
                  :
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={profileData[field]}
                  onChange={handleInputChange}
                  placeholder={`Enter your ${field}`}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  readOnly={field === "email"} // Make email field read-only
                />
                {errors[field] && (
                  <p className="text-red-500 text-sm">{errors[field]}</p>
                )}
              </div>
            ))}
          </motion.div>

          <div className="flex justify-between mt-6">
            <motion.button
              onClick={handleCancel}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              whileHover={{ scale: 1.05 }}
            >
              Cancel
            </motion.button>
            <motion.button
              onClick={handleSave}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              whileHover={{ scale: 1.05 }}
            >
              Save Changes
            </motion.button>
          </div>

          <AnimatePresence>
            {showChangePassword && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                  <h3 className="text-xl font-semibold mb-4">
                    Change Password
                  </h3>
                  <form onSubmit={handlePasswordSave}>
                    <div className="mb-4">
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
                    <div className="mb-4">
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
                    <div className="mb-4">
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
                    <div className="flex justify-between">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Save Password
                      </button>
                      <button
                        onClick={handlePasswordCancel}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default Profile;
