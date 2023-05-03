import {
  DELETE_FROM_CART,
  UPDATE_CART_QTY,
} from "@/store/constants/cartConstants";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
const cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;
  let total = cart.cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shipping = 5;

  const handleSubmit = () => {
    
  };
 

  

  return (
    <div className="h-screen bg-gray-100 pt-20">
      <h1 className="mb-10 text-center text-2xl font-bold">
        {cart.cartItems.length > 0 ? "Cart Items" : "Cart Is Empty"}
      </h1>

      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {cart.cartItems.length > 0 &&
            cart.cartItems.map((item) => (
              <div
                key={item._id}
                className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start "
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full rounded-lg sm:w-40"
                />
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900">
                      {item.name}
                    </h2>
                    <p className="mt-1 text-xs text-gray-700">
                      *{item.qty} qty
                    </p>
                  </div>
                  <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center border-gray-100">
                      <select
                        className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-green-300 text-base pl-3 pr-10"
                        value={item.qty}
                        onChange={(e) => {
                          dispatch({
                            type: UPDATE_CART_QTY,
                            payload: { _id: item._id, qty: e.target.value },
                          });
                        }}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div
                      className="flex items-center space-x-4"
                      onClick={() =>
                        dispatch({
                          type: DELETE_FROM_CART,
                          payload: { _id: item._id },
                        })
                      }
                    >
                      <p className="text-sm">
                        ${(item.price * item.qty).toFixed(2)}
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {cart.cartItems.length > 0 && (
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">${total.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Shipping</p>
              <p className="text-gray-700">${shipping}</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">
                  ${total + shipping} USD
                </p>
                <p className="text-sm text-gray-700">including VAT</p>
              </div>
            </div>

            <button
              className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
              onClick={handleSubmit}
            >
              <Link href={`/shipping-screen?login=${session?.user}`}>
              Check out
              </Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default cart;
