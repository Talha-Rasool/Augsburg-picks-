import { createContext, useState } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";

  const submitOrder = async () => {
    try {
      const orderData = {
        customerName: customerName.trim(),
        products: cart.map((item) => ({
          productId: item.product._id,
          quantity: item.quantity,
        })),
      };

      const response = await axios.post(`${API_URL}/api/orders`, orderData);

      // Clear cart on success
      setCart([]);
      setCustomerName("");
      setIsOrderModalOpen(false);
      alert("Order placed successfully!");
      return response.data;
    } catch (error) {
      console.error("Order submission failed:", error);
      alert(
        `Failed to place order: ${
          error.response?.data?.message || error.message
        }`
      );
      throw error;
    }
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Add this function
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product._id === product._id
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { product, quantity: 1 }];
    });
  };

  return (
    <CartContext.Provider
      value={{
        addToCart,
        cart,
        setCart,
        isOrderModalOpen,
        setIsOrderModalOpen,
        customerName,
        setCustomerName,
        submitOrder,
        getCartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
