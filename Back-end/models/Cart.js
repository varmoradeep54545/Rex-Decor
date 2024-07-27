const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  thumbnail1: { type: String },
  quantity: { type: Number, required: true }
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  products: [productSchema],
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
