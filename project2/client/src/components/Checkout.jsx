import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";

const Checkout = () => {
  const { cart } = useContext(CartContext);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = async (e) => {
    e.preventDefault();

    const orderData = {
      name: e.target.name.value,
      address: e.target.address.value,
      cardNumber: e.target.cardNumber.value,
      cartItems: cart,
      totalPrice,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/checkout",
        orderData
      );
      alert("Order placed successfully!");
      console.log("Order Response:", response.data);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("There was an issue placing your order.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Checkout</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id} className="mb-4 flex items-center">
            <img
              src={item.image}
              alt={item.title}
              className="w-16 h-16 object-cover rounded-lg mr-4"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {item.title}
              </h3>
              <p className="text-red-600 font-semibold">
                ${item.price} x {item.quantity}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <p className="text-lg font-semibold text-gray-800">
          Total: ${totalPrice.toFixed(2)}
        </p>
        <form onSubmit={handleCheckout} className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Shipping Address</label>
            <input
              type="text"
              name="address"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your address"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Credit Card</label>
            <input
              type="text"
              name="cardNumber"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Card number"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#FFC028] border-2 border-primary p-2 rounded-2xl mt-4 py-1 px-4 hover:scale-105 duration-200 hover:text-black"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
