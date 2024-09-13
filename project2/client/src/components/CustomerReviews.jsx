import React from "react";

const CustomerReviews = ({ reviews }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-yellow-500">
        Customer Reviews
      </h2>
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} className="mb-6 border-b pb-4 last:border-b-0">
            <p className="font-bold text-lg text-gray-800 flex items-center mb-2">
              <span className="mr-2">{review.name}</span>
              <span className="text-green-500 text-sm">
                {Array(review.rating).fill("★").join("")}
              </span>
            </p>
            <p className="text-gray-600">{review.comment}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default CustomerReviews;
