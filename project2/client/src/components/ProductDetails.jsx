import React from "react";

const ProductDetails = ({ details }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-yellow-500">
        Product Details
      </h2>
      <p>{details}</p>
    </div>
  );
};

export default ProductDetails;
