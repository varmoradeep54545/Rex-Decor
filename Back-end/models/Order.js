const mongoose = require("mongoose");

// Define the Order schema
const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    postal: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    items: [
      {
        itemId: { type: String, required: true },
        itemName: { type: String, required: true },
        itemQuantity: { type: Number, required: true },
        currency: { type: String, required: true },
      },
    ],
    razorpay_order_id: { type: String, required: true },
    razorpay_payment_id: { type: String, required: true },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
);

// Export the model
module.exports = mongoose.model("Order", orderSchema);
