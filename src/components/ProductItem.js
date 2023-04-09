import React, { useState, useEffect, createContext } from "react";
import Navbar from "./Navbar";
import allProducts from "../data";
import { CartContext } from "../Context/CartContext";
import { useContext } from "react";
import { OrdersContext } from "../Context/OrdersContext";

function ProductList() {
  // State for the count of each product in the cart
  const [productCount, setProductCount] = useState({});

  // State for the orders
  const { orders, setOrders } = useContext(OrdersContext);
  // State for the cart
  const { cartCount, setCartCount } = useContext(CartContext);

  // Load the cart items and orders from local storage on mount
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (cartItems) {
      setProductCount(cartItems);
      const totalCount = Object.values(cartItems).reduce((a, b) => a + b, 0);
      setCartCount(totalCount);
    }

    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, [setCartCount]);

  // Save the orders to local storage on update
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  // Increase the count of a product in the cart
  function handleIncrease(productId) {
    setProductCount((prevCount) => ({
      ...prevCount,
      [productId]: (prevCount[productId] || 0) + 1,
    }));
    setCartCount((prevCount) => prevCount + 1);

    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || {};
    cartItems[productId] = (cartItems[productId] || 0) + 1;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    addOrder(productId); // Add order to the orders state
  }

  // Decrease the count of a product in the cart
  function handleDecrease(productId) {
    if (productCount[productId] > 0) {
      // Decrease the count and update the cart
      setProductCount((prevCount) => ({
        ...prevCount,
        [productId]: prevCount[productId] - 1,
      }));
      setCartCount((prevCount) => prevCount - 1);

      // Update the cart items in the local storage
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || {};
      cartItems[productId] = (cartItems[productId] || 0) - 1;
      if (cartItems[productId] <= 0) {
        delete cartItems[productId];
      }
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      // Find the index of the order in the orders array
      const orderIndex = orders.findIndex((order) => order.id === productId);
      if (orderIndex !== -1) {
        // If the order exists, update its quantity
        const updatedOrders = [...orders];
        updatedOrders[orderIndex].quantity -= 1;
        if (updatedOrders[orderIndex].quantity <= 0) {
          // If the quantity becomes zero, remove the order from the orders array
          updatedOrders.splice(orderIndex, 1);
        }
        setOrders(updatedOrders);
      }
    } else {
      // If the count is zero, remove the product from the cart and orders
      setProductCount((prevCount) => {
        const updatedCount = { ...prevCount };
        delete updatedCount[productId];
        return updatedCount;
      });
      setCartCount((prevCount) => prevCount - 1);

      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || {};
      delete cartItems[productId];
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      const orderIndex = orders.findIndex((order) => order.id === productId);
      if (orderIndex !== -1) {
        const updatedOrders = [...orders];
        updatedOrders.splice(orderIndex, 1);
        setOrders(updatedOrders);
      }
    }
  }

  function addOrder(productId) {
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
  }

  const totalPrice = allProducts.reduce(
    (sum, product) => sum + (productCount[product.id] || 0) * product.price,
    0
  );

  return (
    <div>
      <Navbar />
      <div className="flex items-center mt-[4%]">
        {allProducts.map((product) => (
          <div className="border shadow-xl rounded p-4 mx-10" key={product.id}>
            <img src={product.image} alt={product.title} />
            <h2 className="text-gray-600 text-3xl text-center mt-6 font-bold">
              {product.title}
            </h2>
            <p className="text-gray-600 text-center text-2xl mt-14 ">
              ${product.price}{" "}
              <span className="text-sm text-gray-400 block">per kg</span>
            </p>
            <div className="w-[70%] flex justify-between items-center mt-5 mx-auto">
              {productCount[product.id] > 0 ? (
                <>
                  <button
                    className="mt-10 drop-shadow rounded-full bg-green-50 p-5 text-2xl text-green-600"
                    onClick={() => handleIncrease(product.id)}
                  >
                    +
                  </button>
                  <p className="mt-14 text-gray-500 my-auto text-2xl font-bold">
                    {productCount[product.id] || 0}{" "}
                    <span classNameName="text-sm">kg</span>
                  </p>
                  <button
                    className="mt-10 drop-shadow rounded-full bg-red-50 p-5 text-2xl text-red-600"
                    onClick={() => handleDecrease(product.id)}
                  >
                    -
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="drop-shadow rounded w-full bg-green-50 p-5 mt-10 text-2xl text-green-600"
                    onClick={() => handleIncrease(product.id)}
                  >
                    Buy
                  </button>
                </>
              )}
            </div>
            <p className=" 200 w-full text-gray-400 mx-auto mt-10 border-gray-200 rounded-full p-4 text-2xl text-center">
              total {(productCount[product.id] || 0) * product.price} $
            </p>
          </div>
        ))}
      </div>
      <p className="text-white font-thin font-mono bg-gradient-to-r from-green-600 to-green-400 mx-auto p-5 fixed w-full bottom-0 text-center text-2xl">
        Cart price {totalPrice} $
      </p>
    </div>
  );
}

export default ProductList;
