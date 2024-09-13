import React, { useState } from "react";

const ProductImages = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex flex-col md:w-1/2">
      <img
        className="w-full h-64 object-center"
        src={selectedImage}
        alt="Product"
      />
      <div className="flex mt-5 space-x-2">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className={`w-19 h-16 object-cover cursor-pointer ${
              selectedImage === image ? "border-2 border-red-700" : ""
            }}
            onClick={() => setSelectedImage(image)`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
