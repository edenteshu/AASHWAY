import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

const ProductInfo = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{product.title}</h2>
      <p className="text-xl font-semibold text-red-600 mb-4">
        ${product.price}
      </p>
      <p className="text-gray-700 mb-6">{product.description}</p>

      <div className="flex items-center mb-4">
        <span className="mr-4 text-gray-800">Quantity:</span>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(2, parseInt(e.target.value)))}
          className="w-16 p-2 border rounded bg-[#efeae0] "
          min="1"
        />
      </div>

      <button
        onClick={handleAddToCart}
        className="bg-[#FFC028] border-2 border-primary p-2 rounded-2xl mt-4 py-1 px-4 hover:scale-105 duration-200 hover:text-black"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductInfo;
