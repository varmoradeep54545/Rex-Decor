const Cart = require('../models/Cart');

const saveCart = async (req, res) => {
  const { userId, cart } = req.body;

  try {
    console.log('Received cart data:', req.body);
    let userCart = await Cart.findOne({ userId });

    if (!userCart) {
      userCart = new Cart({ userId, products: cart });
    } else {
      cart.forEach(newProduct => {
        const existingProduct = userCart.products.find(product => product.id === newProduct.id);

        if (existingProduct) {
          existingProduct.quantity += newProduct.quantity || 1;
        } else {
          userCart.products.push(newProduct);
        }
      });
    }

    await userCart.save();
    console.log('Cart updated:', userCart);
    res.status(200).json({ message: 'Cart updated successfully' });
  } catch (error) {
    console.error('Failed to update cart', error);
    res.status(500).json({ error: 'Failed to update cart' });
  }
};

module.exports = { saveCart };
