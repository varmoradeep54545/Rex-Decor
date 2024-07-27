  import React, { createContext, useReducer, useContext } from 'react';
  import axios from 'axios';

  const CartContext = createContext();

  const cartReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        const itemInCart = state.find((item) => item.id === action.product.id);
        if (itemInCart) {
          return state.map((item) =>
            item.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [...state, { ...action.product, quantity: 1 }];
        }
      case 'REMOVE_FROM_CART':
        return state.filter((item) => item.id !== action.id);
      case 'UPDATE_QUANTITY':
        return state.map((item) =>
          item.id === action.id ? { ...item, quantity: action.quantity } : item
        );
      case 'CLEAR_CART':
        return [];
      default:
        return state;
    }
  };

  export const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, []);

    const saveCartToServer = async (userId) => {
      try {
        await axios.post('https://backend-2m3p.onrender.com/api/cart/save-cart', { userId, cart });
      } catch (error) {
        console.error('Failed to save cart', error);
      }
    };
    const clearCart = () => {
      dispatch({ type: "CLEAR_CART" });
    };

    return (
      <CartContext.Provider value={{ cart, dispatch, saveCartToServer ,clearCart}}>
        {children}
      </CartContext.Provider>
    );
  };

  export const useCart = () => useContext(CartContext);
