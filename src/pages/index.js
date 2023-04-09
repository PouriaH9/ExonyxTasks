import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Transition } from "@headlessui/react";

function Home() {
  const [show, setShow] = useState(false);

  const handleToggle = () => {
    setShow((prevShow) => !prevShow);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex justify-center items-center mt-[350px]">
        <div
          className="flex justify-center cursor-pointer"
          onClick={handleToggle}
        >
          <h2 className="text-8xl font-bold text-gray-600 animate-pulse">
            Home
          </h2>
        </div>
      </div>
      <Transition
        show={show}
        enter="transition-opacity duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="absolute mb-[700px] inset-0 flex items-center justify-center">
          <div className="bg-gray-800 p-5 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-100 ">
              Hello from Pouria!
            </h2>
          </div>
        </div>
      </Transition>
    </div>
  );
}

export default Home;
