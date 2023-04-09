import React from "react";

function Button({ content }) {
  return (
    <button className="m-10 btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow">
      {content}
    </button>
  );
}

export default Button;
