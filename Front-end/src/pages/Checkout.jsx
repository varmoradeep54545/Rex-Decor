import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../components/CartContext";
import { useAuth } from "../components/AuthContext";

const Checkout = () => {
  const { currentUser } = useAuth();
  const { cart, dispatch } = useCart();
  const [orderTotal, setOrderTotal] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    name: "",
    address: "",
    city: "",
    country: "",
    postal: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [saveInfo, setSaveInfo] = useState(false);
  const [userId, setUserId] = useState(null); // Manage userId in state
  const navigate = useNavigate();

  useEffect(() => {
    calculateOrderTotal();
  }, [cart]);

  useEffect(() => {
    // Load script for Razorpay
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    // Load saved form data from sessionStorage if needed
    const savedInfo = JSON.parse(sessionStorage.getItem("checkoutInfo"));
    if (savedInfo) {
      setFormData(savedInfo);
    }

    // If the user is authenticated, use their userId
     // Manage userId from localStorage
     const storedUserId = localStorage.getItem("userid");
     if (currentUser) {
       // If user is authenticated, use Firebase user ID
       setUserId(currentUser.uid);
       localStorage.setItem("userid", currentUser.uid); // Save to localStorage
     } else if (storedUserId) {
       // Use stored userId for unauthenticated users
       setUserId(storedUserId);
     } else {
       // Generate or fetch a guest userId if none exists
       const guestUserId = `guest_${Date.now()}`;
       localStorage.setItem("userid", guestUserId); // Save to localStorage
       setUserId(guestUserId);
     }
   }, [currentUser]);

  

  const calculateOrderTotal = () => {
    const total =
      cart.reduce((acc, item) => acc + item.price * item.quantity, 0) * 1.08;
    setOrderTotal(total.toFixed(2));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveInfoChange = (e) => {
    setSaveInfo(e.target.checked);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.email) errors.email = "Email is required";
    if (!formData.phone) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Phone number must be 10 digits";
    }
    if (!formData.name) errors.name = "Full name is required";
    if (!formData.address) errors.address = "Address is required";
    if (!formData.city) errors.city = "City is required";
    if (!formData.country) errors.country = "Country is required";
    if (!formData.postal) errors.postal = "Postal code is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (saveInfo) {
        sessionStorage.setItem("checkoutInfo", JSON.stringify(formData));
      } else {
        sessionStorage.removeItem("checkoutInfo");
      }
      handlePayment();
    }
  };

  const handlePayment = async () => {
    const response = await fetch("http://localhost:5000/api/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: Math.round(orderTotal), // Convert to paise
        currency: "INR",
        receipt: "receipt_123",
      }),
    });

    const orderData = await response.json();

    if (orderData) {
      const options = {
        key: "rzp_test_e5wgNQ5IiRmx82",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Rex Decor",
        description: "Purchase Description",
        order_id: orderData.id,
        handler: function (response) {
          console.log("Payment successful:", response);

          const orderDetails = {
            userId,
            email: formData.email,
            phone: formData.phone,
            name: formData.name,
            address: formData.address,
            city: formData.city,
            country: formData.country,
            postal: formData.postal,
            totalAmount: orderTotal,
            items: cart.map((item) => ({
              itemId: item.id,
              itemName: item.name,
              itemQuantity: item.quantity,
              currency: "INR",
            })),
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
          };

          // Send the order details to the backend for saving to MongoDB
          fetch("http://localhost:5000/api/save-order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(orderDetails),
          })
            .then((res) => res.json())
            .then(() => {
              dispatch({ type: "CLEAR_CART" });
              navigate("/order-history");
            })
            .catch((err) => console.error("Error saving order:", err));
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#3399cc",
        },
      };

      if (window.Razorpay) {
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } else {
        console.error("Razorpay is not loaded");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <header className="flex justify-center mb-8">
          <h3 className="text-3xl md:text-4xl font-medium text-gray-800">Checkout</h3>
        </header>

        <main className="flex flex-col lg:flex-row justify-center gap-8 lg:gap-16">
          <section className="w-full lg:w-1/2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h6 className="text-xl sm:text-2xl font-medium">Contact Information</h6>
                <div className="relative mt-2">
                  <label htmlFor="checkout-email" className="block text-sm sm:text-base mb-1">E-mail</label>
                  <input
                    type="email"
                    id="checkout-email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email..."
                    className={`w-full pl-2 py-2 rounded-lg border ${
                      formErrors.email ? "border-red-500" : "border-gray-400"
                    } focus:outline-none text-sm sm:text-base font-semibold`}
                  />
                  {formErrors.email && <p className="text-red-500 text-xs sm:text-sm">{formErrors.email}</p>}
                </div>

                <div className="relative mt-2">
                  <label htmlFor="checkout-phone" className="block text-sm sm:text-base mb-1">Phone</label>
                  <input
                    type="tel"
                    id="checkout-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone..."
                    className={`w-full pl-2 py-2 rounded-lg border ${
                      formErrors.phone ? "border-red-500" : "border-gray-400"
                    } focus:outline-none text-sm sm:text-base font-semibold`}
                  />
                  {formErrors.phone && <p className="text-red-500 text-xs sm:text-sm">{formErrors.phone}</p>}
                </div>
              </div>

              <div>
                <h6 className="text-xl sm:text-2xl font-medium">Shipping Address</h6>
                <div className="relative mt-2">
                  <label htmlFor="checkout-name" className="block text-sm sm:text-base mb-1">Full Name</label>
                  <input
                    type="text"
                    id="checkout-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name..."
                    className={`w-full pl-2 py-2 rounded-lg border ${
                      formErrors.name ? "border-red-500" : "border-gray-400"
                    } focus:outline-none text-sm sm:text-base font-semibold`}
                  />
                  {formErrors.name && <p className="text-red-500 text-xs sm:text-sm">{formErrors.name}</p>}
                </div>

                <div className="relative mt-2">
                  <label htmlFor="checkout-address" className="block text-sm sm:text-base mb-1">Address</label>
                  <input
                    type="text"
                    id="checkout-address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your address..."
                    className={`w-full pl-2 py-2 rounded-lg border ${
                      formErrors.address ? "border-red-500" : "border-gray-400"
                    } focus:outline-none text-sm sm:text-base font-semibold`}
                  />
                  {formErrors.address && <p className="text-red-500 text-xs sm:text-sm">{formErrors.address}</p>}
                </div>

                <div className="relative mt-2">
                  <label htmlFor="checkout-city" className="block text-sm sm:text-base mb-1">City</label>
                  <input
                    type="text"
                    id="checkout-city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Enter your city..."
                    className={`w-full pl-2 py-2 rounded-lg border ${
                      formErrors.city ? "border-red-500" : "border-gray-400"
                    } focus:outline-none text-sm sm:text-base font-semibold`}
                  />
                  {formErrors.city && <p className="text-red-500 text-xs sm:text-sm">{formErrors.city}</p>}
                </div>

                <div className="relative mt-2">
                  <label htmlFor="checkout-country" className="block text-sm sm:text-base mb-1">Country</label>
                  <input
                    type="text"
                    id="checkout-country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="Enter your country..."
                    className={`w-full pl-2 py-2 rounded-lg border ${
                      formErrors.country ? "border-red-500" : "border-gray-400"
                    } focus:outline-none text-sm sm:text-base font-semibold`}
                  />
                  {formErrors.country && <p className="text-red-500 text-xs sm:text-sm">{formErrors.country}</p>}
                </div>

                <div className="relative mt-2">
                  <label htmlFor="checkout-postal" className="block text-sm sm:text-base mb-1">Postal Code</label>
                  <input
                    type="text"
                    id="checkout-postal"
                    name="postal"
                    value={formData.postal}
                    onChange={handleInputChange}
                    placeholder="Enter postal code..."
                    className={`w-full pl-2 py-2 rounded-lg border ${
                      formErrors.postal ? "border-red-500" : "border-gray-400"
                    } focus:outline-none text-sm sm:text-base font-semibold`}
                  />
                  {formErrors.postal && <p className="text-red-500 text-xs sm:text-sm">{formErrors.postal}</p>}
                </div>
              </div>

              <div className="mt-4">
                <label className="flex items-center text-sm sm:text-base">
                  <input
                    type="checkbox"
                    checked={saveInfo}
                    onChange={handleSaveInfoChange}
                    className="mr-2"
                  />
                  Save this information for next time
                </label>
              </div>

              <div className="mt-8 flex justify-between items-center">
                <div className="text-xl font-semibold">
                  Total: ₹{orderTotal}
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-8 rounded-lg hover:bg-blue-500 transition duration-300"
                >
                  Pay with Razorpay
                </button>
              </div>
            </form>
          </section>

          <section className="w-full lg:w-1/2">
            {/* Cart items summary */}
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
