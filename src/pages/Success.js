import React from "react";
import { Link } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Success = () => {
  return (
    <div className="w-full bg-gray-100 p-4">
      <div className="container mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="flex justify-center mb-4">
            <CheckCircleIcon style={{ fontSize: 60, color: "#22c55e" }} />
          </div>
          <h1 className="text-2xl font-semibold mb-4">Payment Successful!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been placed
            successfully.
          </p>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              A confirmation email has been sent to your registered email
              address.
            </p>
            <Link to="/">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-md">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
