import * as React from "react";
import { Routes, Route } from "react-router-dom";

import ProjectOne from "./pages/projectOne";
import ProjectTwo from "./pages/projectTwo";
import Home from "./pages";
import { CartProvider } from "./Context/CartContext";
import { OrdersProvider } from "./Context/OrdersContext";

export default function App() {
  return (
    <OrdersProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="projectOne" element={<ProjectOne />} />
          <Route path="projectTwo" element={<ProjectTwo />} />
        </Routes>
      </CartProvider>
    </OrdersProvider>
  );
}
