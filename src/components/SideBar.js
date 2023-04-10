import React from "react";

const Sidebar = () => {
  return (
    <div className="flex flex-col w-64 h-screen px-4 py-8 bg-gray-100">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Menu</h2>
        <ul className="mt-2">
          <li className="mb-2">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Dashboard
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Orders
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Customers
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Settings
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h2 className="text-lg font-semibold">User</h2>
        <ul className="mt-2">
          <li className="mb-2">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Profile
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
