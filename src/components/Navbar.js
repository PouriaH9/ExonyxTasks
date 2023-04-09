import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiTrash2 } from "react-icons/fi";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { OrdersContext } from "../Context/OrdersContext";

const Navbar = () => {
  const [showCart, setShowCart] = useState(false);
  const { cartCount } = useContext(CartContext);
  const orders = JSON.parse(localStorage.getItem("orders"));
  const { setOrders } = useContext(OrdersContext);

  const handleCartClick = () => {
    setShowCart(!showCart);
  };

  const handleTrashClick = (title) => {
    const updatedOrders = orders.map((order) => {
      if (order.title === title) {
        order.quantity = 0;
      }
      return order;
    });
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
  };

  return (
    <div>
      <nav className="bg-gray-800">
        <div className="max-w-7xl ml-[200px] px-2 sm:px-6">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0">
                <div className="text-white font-bold text-xl">My Website</div>
              </div>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  <Link
                    to="/"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Home
                  </Link>
                  <Link
                    to="/projectTwo"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Store
                  </Link>
                  <Link
                    to="/projectOne"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Users
                  </Link>
                </div>
              </div>
            </div>
            <div
              onClick={handleCartClick}
              className="inline text-gray-200 text-xl cursor-pointer hover:text-white "
            >
              <div className="fixed translate-x-4 translate-y-[-8px] bg-red-800 p-[10px] w-[15px] h-[15px] rounded-full flex justify-center items-center text-white text-sm font-light">
                {cartCount}
              </div>
              <FiShoppingCart />
            </div>
          </div>
        </div>
        {showCart && (
          <div className="fixed inset-0 z-50 bg-white bg-opacity-20 flex items-center justify-end">
            <div className="w-1/5 h-full bg-white fixed right-0 top-0 shadow-lg">
              <button
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                onClick={handleCartClick}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div>
                <h1 className="font-bold text-gray-900 text-center p-4 bg-gray-200">
                  Your order list
                </h1>

                {orders.map((order) => {
                  return (
                    <div
                      key={order.index}
                      className="border  rounded mt-3 mx-2 flex"
                    >
                      <div className="w-[50%]">
                        <h2 className="text-xl font-bold mt-3 text-center text-gray-600">
                          {order.quantity}
                          <span className="text-sm text-gray-600">kg</span>{" "}
                          {order.title}
                        </h2>
                        <p className="mt-4 text-center text-2xl text-gray-600">
                          {order.price}$
                        </p>
                        <FiTrash2
                          onClick={handleTrashClick}
                          className="text-2xl text-gray-400 mx-auto mt-5 bottom-0 cursor-pointer hover:text-red-500"
                        />
                      </div>
                      <img
                        className=" w-[50%]"
                        src={order.image}
                        alt={order.title}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div
              className="w-4/5 h-full bg-white bg-opacity-50 absolute inset-0"
              onClick={handleCartClick}
            ></div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
