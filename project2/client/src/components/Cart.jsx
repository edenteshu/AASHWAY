import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Cart</h2>
      {cart.length > 0 ? (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="mb-4 flex items-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-lg mr-4"
                />
                <div className="flex justify-between items-center flex-1">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.title}
                    </h3>
                    <p className="text-red-600 font-semibold">
                      ${item.price} x {item.quantity}
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 text-right">
            <p className="text-lg font-semibold text-gray-800">
              Total: ${totalPrice.toFixed(2)}
            </p>
            <Link to="/checkout">
              {" "}
              <button className="bg-[#FFC028] border-2 border-primary p-2 rounded-2xl mt-4 py-1 px-4 hover:scale-105 duration-200 hover:text-black">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-700">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
