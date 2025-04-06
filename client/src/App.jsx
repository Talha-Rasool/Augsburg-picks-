import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDisplay from "./components/ProductDisplay";
import OrderHistory from "./components/OrderHistory";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";
import OrderModal from "./components/OrderModel";

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<ProductDisplay />} />
            <Route path="/history" element={<OrderHistory />} />
          </Routes>
        </div>
      </Router>
      <OrderModal />
    </CartProvider>
  );
}

export default App;
