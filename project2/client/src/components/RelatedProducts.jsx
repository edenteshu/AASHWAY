import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const RelatedProducts = ({ products }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-yellow-500">
        Other Jewelries
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-32 object-cover mb-4 rounded-lg" // Decrease the height to h-32
            />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {product.name}
            </h3>
            <p className="text-red-600 font-semibold">${product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="bg-[#FFC028] border-2 border-primary p-2 rounded-2xl mt-4 py-1 px-4 hover:scale-105 duration-200 hover:text-black"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
