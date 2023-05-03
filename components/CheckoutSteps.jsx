import Link from "next/link";
import React from "react";

const CheckoutSteps = ({ activeStep = 0 }) => {
  return (
    <div>
      <ul className="hidden md:flex flex-auto space-x-2 justify-center items-center gap-10 mt-4 ">
        {["Log In", "Shipping Address", "Payment", "Place Order"].map(
          (step, index) => (
            <li
            key={step}
            className={`${index<=activeStep ? 'text-white bg-indigo-600' : 'text-gray-600 border border-white bg-gray-50'}  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800  cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 shadow-md rounded`}
            >
              {step}
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default CheckoutSteps;
