import { createContext, useState } from "react";
import allProducts from "../data";

export const OrdersContext = createContext();

export const OrdersProvider = (props) => {
  const [orders, setOrders] = useState([]);

  const addOrder = (productId) => {
    const existingOrderIndex = orders.findIndex(
      (order) => order.id === productId
    );

    if (existingOrderIndex !== -1) {
      const updatedOrders = [...orders];
      updatedOrders[existingOrderIndex].quantity += 1;
      setOrders(updatedOrders);
    } else {
      const product = allProducts.find((p) => p.id === productId);
      const order = { ...product, quantity: 1 };
      setOrders((prevOrders) => [...prevOrders, order]);
    }
  };

  const removeOrder = (productId) => {
    const orderIndex = orders.findIndex((order) => order.id === productId);
    if (orderIndex !== -1) {
      const updatedOrders = [...orders];
      updatedOrders.splice(orderIndex, 1);
      setOrders(updatedOrders);
    }
  };

  return (
    <OrdersContext.Provider
      value={{ orders, setOrders, addOrder, removeOrder }}
    >
      {props.children}
    </OrdersContext.Provider>
  );
};
