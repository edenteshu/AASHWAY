import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import ProductDetails from "./ProductDetails";
import CustomerReviews from "./CustomerReviews";
import RelatedProducts from "./RelatedProducts";

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reviews = [
    {
      name: "Hana",
      rating: 4,
      comment: "Wow beautiful! The quality is amazing.",
    },
    {
      name: "Abel",
      rating: 5,
      comment: "Very nice, it fits my beautiful wife perfectly.",
    },
    {
      name: "Amen",
      rating: 3,
      comment: "Nice, but not as expected.",
    },
  ];

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/category/jewelery")
      .then((response) => {
        const allJewelryProducts = response.data;
        const firstProduct = allJewelryProducts[0];
        setProduct(firstProduct);
        setRelatedProducts(allJewelryProducts.slice(1, 5));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error.message);
        setError("Could not load product data. Please try again later.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-center text-red-600 mt-10">{error}</div>;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div>
        <h1 className="text-center font-extrabold text-4xl mb-6 text-yellow-500">
          Your Jewelries
        </h1>
      </div>
      {product && (
        <div className="flex flex-col md:flex-row gap-8">
          <ProductImages images={[product.image]} />
          <ProductInfo product={product} />
        </div>
      )}
      {product && <ProductDetails details={product.description} />}
      <CustomerReviews reviews={reviews} />
      {relatedProducts.length > 0 && (
        <RelatedProducts products={relatedProducts} />
      )}
    </div>
  );
};

export default ProductPage;
