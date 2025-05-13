import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

// Make sure to call loadStripe outside of a component's render to avoid
// recreating the Stripe object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
  const products = useSelector((state) => state.amazonReducer.products);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    let price = 0;
    products.map((item) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotalAmount(price.toFixed(2));
  }, [products]);

  return (
    <div className="w-full bg-gray-100 p-4">
      <div className="container mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold mb-6">Checkout</h1>

          {/* Order Summary */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            {products.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-2"
              >
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <p className="font-semibold">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold">Total Amount:</p>
                <p className="text-xl font-bold">₹{totalAmount}</p>
              </div>
            </div>
          </div>

          {/* Stripe Payment Form */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
            <Elements stripe={stripePromise}>
              <CheckoutForm amount={totalAmount} />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
