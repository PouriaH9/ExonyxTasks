import React, { createContext, useState } from "react";

export const ProductCountContext = createContext();

export function ProductCountProvider(props) {
  const [productCount, setProductCount] = useState({});
  
  return (
    <ProductCountContext.Provider value={[productCount, setProductCount]}>
      {props.children}
    </ProductCountContext.Provider>
  );
}
