import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../components/CartContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const [userid, setUserid] = useState(null);
  const [orderTotal, setOrderTotal] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    name: '',
    address: '',
    city: '',
    country: '',
    postal: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [saveInfo, setSaveInfo] = useState(false);
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userid'); // or from a different source
    if (storedUserId) {
      setUserid(storedUserId);
    }
  }, []);

  useEffect(() => {
    calculateOrderTotal();
  }, [cart]);

  useEffect(() => {
    const savedInfo = JSON.parse(localStorage.getItem('checkoutInfo'));
    if (savedInfo) {
      setFormData(savedInfo);
    }
  }, []);

  const calculateOrderTotal = () => {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0) * 1.08;
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
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.phone) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = 'Phone number must be 10 digits';
    }
    if (!formData.name) errors.name = 'Full name is required';
    if (!formData.address) errors.address = 'Address is required';
    if (!formData.city) errors.city = 'City is required';
    if (!formData.country) errors.country = 'Country is required';
    if (!formData.postal) errors.postal = 'Postal code is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePayment = async () => {
    if (validateForm()) {
      if (saveInfo) {
        localStorage.setItem('checkoutInfo', JSON.stringify(formData));
      } else {
        localStorage.removeItem('checkoutInfo');
      }
      try {
        const amountInPaise = Math.round(orderTotal ); // Convert to paise and ensure it's an integer

        const razorresponse = await fetch(
          'https://backend-2m3p.onrender.com/api/razorpay/create-order',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: amountInPaise }), // Razorpay expects amount in paise
          }
        );

        if (!razorresponse.ok) {
          throw new Error('Network response was not ok');
        }

        const { orderId, amount, key } = await razorresponse.json();

        const options = {
          key: 'rzp_test_hujz1oK26gONzr', // Your Razorpay Key ID
          amount: amount, // Amount in paise
          currency: 'INR',
          name: 'Resort Decor',
          description: 'Order Payment',
          order_id: orderId,
          handler: async function (response) {
            try {
              // Handle payment success
              console.log(response);
              toast.success('Payment and order successful!');
              navigate('/', { replace: true }); // Redirect to home page
              clearCart(); // Clear the cart

              // Save order to database
              const orderData = {
                userId: userid,
                products: cart,
                razorpay_order_id: orderId,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                totalAmount: orderTotal,
              };

              const paymentMethod = { 
                type: 'razorpay',
                payment_id: response.razorpay_payment_id,
              };
              const response2 = await fetch('https://backend-2m3p.onrender.com/api/order/order-success', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderData, paymentMethod }),
              });

              if (!response2.ok) {
                throw new Error(`Error: ${response2.status}`);
              }

              const result = await response2.json();
              console.log(result);
            } catch (error) {
              console.error(error);
              toast.error('Payment failed. Please try again.');
            }
          },
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.phone,
          },
          notes: {
            address: formData.address,
          },
          theme: {
            color: '#3399cc',
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (error) {
        console.error(error);
        toast.error('Error creating order. Please try again.');
      }
    }
  };

  
  return (
    <>
      <Navbar />
      <div className="container  p-12 ">
        <header className="flex justify-center mb-8">
          <h3 className="text-4xl font-medium text-gray-800">Checkout</h3>
        </header>

        <main className="flex flex-col lg:flex-row justify-center gap-12">
          <section className="w-full lg:w-1/2">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <div>
                <h6 className="text-2xl font-medium">Contact information</h6>
                <div className="relative mt-2">
                  <label
                    htmlFor="checkout-email"
                    className="block text-[20px] mb-1"
                  >
                    E-mail
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="checkout-email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email..."
                      className={`w-full pl-2 py-2 rounded-lg border ${
                        formErrors.email ? "border-red-500" : "border-gray-400"
                      } focus:outline-none text-sm font-semibold`}
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-sm">{formErrors.email}</p>
                    )}
                  </div>
                </div>
                <div className="relative mt-2">
                  <label
                    htmlFor="checkout-phone"
                    className="block text-[20px] mb-1"
                  >
                    Phone
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="checkout-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone..."
                      className={`w-full pl-2 py-2 rounded-lg border ${
                        formErrors.phone ? "border-red-500" : "border-gray-400"
                      } focus:outline-none text-sm font-semibold`}
                    />
                    {formErrors.phone && (
                      <p className="text-red-500 text-sm">{formErrors.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h6 className="text-2xl font-medium">Shipping address</h6>
                <div className="relative mt-2">
                  <label
                    htmlFor="checkout-name"
                    className="block text-[20px] mb-1"
                  >
                    Full name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="checkout-name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name..."
                      className={`w-full pl-2 py-2 rounded-lg border ${
                        formErrors.name ? "border-red-500" : "border-gray-400"
                      } focus:outline-none text-sm font-semibold`}
                    />
                    {formErrors.name && (
                      <p className="text-red-500 text-sm">{formErrors.name}</p>
                    )}
                  </div>
                </div>
                <div className="relative mt-2">
                  <label
                    htmlFor="checkout-address"
                    className="block text-[20px] mb-1"
                  >
                    Address
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="checkout-address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter your address..."
                      className={`w-full pl-2 py-2 rounded-lg border ${
                        formErrors.address
                          ? "border-red-500"
                          : "border-gray-400"
                      } focus:outline-none text-sm font-semibold`}
                    />
                    {formErrors.address && (
                      <p className="text-red-500 text-sm">
                        {formErrors.address}
                      </p>
                    )}
                  </div>
                </div>
                <div className="relative mt-2">
                  <label
                    htmlFor="checkout-city"
                    className="block text-[20px] mb-1"
                  >
                    City
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="checkout-city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Enter your city..."
                      className={`w-full pl-2 py-2 rounded-lg border ${
                        formErrors.city ? "border-red-500" : "border-gray-400"
                      } focus:outline-none text-sm font-semibold`}
                    />
                    {formErrors.city && (
                      <p className="text-red-500 text-sm">{formErrors.city}</p>
                    )}
                  </div>
                </div>
                <div className="relative mt-2">
                  <label
                    htmlFor="checkout-country"
                    className="block text-[20px] mb-1"
                  >
                    Country
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="checkout-country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      placeholder="Enter your country..."
                      className={`w-full pl-2 py-2 rounded-lg border ${
                        formErrors.country
                          ? "border-red-500"
                          : "border-gray-400"
                      } focus:outline-none text-sm font-semibold`}
                    />
                    {formErrors.country && (
                      <p className="text-red-500 text-sm">
                        {formErrors.country}
                      </p>
                    )}
                  </div>
                </div>
                <div className="relative mt-2">
                  <label
                    htmlFor="checkout-postal"
                    className="block text-[20px] mb-1"
                  >
                    Postal code
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="checkout-postal"
                      name="postal"
                      value={formData.postal}
                      onChange={handleInputChange}
                      placeholder="Enter your postal code..."
                      className={`w-full pl-2 py-2 rounded-lg border ${
                        formErrors.postal ? "border-red-500" : "border-gray-400"
                      } focus:outline-none text-sm font-semibold`}
                    />
                    {formErrors.postal && (
                      <p className="text-red-500 text-sm">
                        {formErrors.postal}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="relative mt-4 flex items-center">
                <input
                  type="checkbox"
                  id="save-info"
                  checked={saveInfo}
                  onChange={handleSaveInfoChange}
                  className="mr-2"
                />
                <label htmlFor="save-info" className="text-[18px]">
                  Save this information for next time
                </label>
              </div>

              <button
                type="button"
                onClick={handlePayment}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Proceed to Payment
              </button>
            </form>
          </section>

          <section className="w-full lg:w-1/2 bg-gray-100 p-6 rounded-lg">
            <h6 className="text-2xl font-medium mb-4">Order Summary</h6>
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <h6 className="text-lg font-semibold">{item.name}</h6>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-lg font-semibold">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
              <hr />
              <div className="flex items-center justify-between">
                <div className="text-lg font-medium">Total</div>
                <div className="text-lg font-semibold">₹{orderTotal}</div>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default Checkout;
