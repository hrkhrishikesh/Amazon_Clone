import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useDispatch } from "react-redux";
import { resetCart } from "../redux/amazonSlice";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    setError(null);

    if (!stripe || !elements) {
      setProcessing(false);
      return;
    }

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

      if (error) {
        setError(error.message);
        setProcessing(false);
        return;
      }

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Here you would typically make an API call to your backend
      // to process the payment with the paymentMethod.id
      console.log("Payment successful!", paymentMethod);

      setPaymentSuccess(true);

      // Wait a moment to show success state before redirecting
      setTimeout(() => {
        dispatch(resetCart());
        navigate("/success");
      }, 1500);
    } catch (err) {
      setError("An unexpected error occurred.");
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md">
      <div className="mb-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
          className="p-4 border rounded-md"
        />
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <button
        type="submit"
        disabled={!stripe || processing || paymentSuccess}
        className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
          !stripe || processing || paymentSuccess
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-yellow-400 hover:bg-yellow-500"
        }`}
      >
        {processing ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Processing...
          </div>
        ) : paymentSuccess ? (
          <div className="flex items-center justify-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            Payment Successful!
          </div>
        ) : (
          `Pay ₹${amount}`
        )}
      </button>

      {/* Test Card Information */}
      <div className="mt-4 p-4 bg-gray-50 rounded-md text-sm text-gray-600">
        <p className="font-semibold mb-2">Test Card Information:</p>
        <p>Card Number: 4242 4242 4242 4242</p>
        <p>Expiry: Any future date</p>
        <p>CVC: Any 3 digits</p>
      </div>
    </form>
  );
};

export default CheckoutForm;
