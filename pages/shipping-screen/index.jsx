import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import DropdownLink from "@/components/DropdownLink";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { SAVE_SHIPPING_ADDRESS } from "@/store/constants/cartConstants";
import CheckoutSteps from "@/components/CheckoutSteps";

const index = () => {
  const [hydrated, setHydrated] = useState(null);

  const { data: session } = useSession();
  const handleLoginRedirect = () => {
    router.push({
      pathname: "/login",
      query: { redirect: "/shipping-screen" },
    });
  };
  const dispatch = useDispatch();
  const router = useRouter();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const { shippingAddress } = cart;
  console.log(shippingAddress);

  let total = cartItems.reduce((a, c) => a + c.price * c.qty, 0);

  useEffect(() => {
    const isLoggedIn = session?.user;

    if (isLoggedIn) {
      router.push("/shipping-screen");
    } else {
      handleLoginRedirect();
    }
    setHydrated(true);
  }, []);
  const [data, setData] = useState({
    firstName: shippingAddress.firstName || "",
    lastName: shippingAddress.lastName || "",
    address: shippingAddress.address || "",
    city: shippingAddress.city || "",
    region: shippingAddress.region || "",
    country: shippingAddress.country || "",
    zipCode: shippingAddress.zipCode || "",
    phone: shippingAddress.phone || "",
  });

  const handlerSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: SAVE_SHIPPING_ADDRESS, payload: data });
    Cookies.set("shippingAddress", JSON.stringify(data));
    router.push("/payment");
  };
  return (
    <>
      {hydrated && (
        <div className="overflow-y-hidden">
          <CheckoutSteps activeStep={1}/>
          <div className="flex justify-center items-center 2xl:container 2xl:mx-auto lg:py-16 md:py-12 py-9 px-4 md:px-6 lg:px-20 xl:px-44 ">
            <div className="flex w-full sm:w-9/12 lg:w-full flex-col lg:flex-row justify-center items-center lg:space-x-10 2xl:space-x-36 space-y-12 lg:space-y-0">
              <form
                className="flex w-full  flex-col justify-start items-start"
                onSubmit={handlerSubmit}
              >
                <div>
                  <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
                    Check out
                  </p>
                </div>
                <div className="mt-2">
                  <DropdownLink
                    href="/cart"
                    className="text-base leading-4 underline  hover:text-gray-800 text-gray-600"
                  >
                    Back to my bag
                  </DropdownLink>
                </div>
                <div className="mt-12">
                  <p className="text-xl font-semibold leading-5 text-gray-800">
                    Shipping Details
                  </p>
                </div>
                <div className="mt-8 flex flex-col justify-start items-start w-full space-y-8 ">
                  <input
                    className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full"
                    type="text"
                    placeholder="First Name"
                    value={data.firstName}
                    onChange={(e) =>
                      setData({ ...data, firstName: e.target.value })
                    }
                  />
                  <input
                    className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full"
                    type="text"
                    required
                    placeholder="Last Name"
                    value={data.lastName}
                    onChange={(e) =>
                      setData({ ...data, lastName: e.target.value })
                    }
                  />
                  <input
                    className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full"
                    type="text"
                    required
                    placeholder="Address"
                    value={data.address}
                    onChange={(e) =>
                      setData({ ...data, address: e.target.value })
                    }
                  />

                  <div className="flex justify-between flex-col sm:flex-row w-full items-start space-y-8 sm:space-y-0 sm:space-x-8">
                    <div className="relative w-full">
                      <input
                        className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full"
                        type="text"
                        required
                        placeholder="City"
                        value={data.city}
                        onChange={(e) =>
                          setData({ ...data, city: e.target.value })
                        }
                      />
                    </div>
                    <div className="relative w-full">
                      <input
                        className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full"
                        type="text"
                        placeholder="Region(optional)"
                        value={data.region}
                        onChange={(e) =>
                          setData({ ...data, region: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="flex justify-between flex-col sm:flex-row w-full items-start space-y-8 sm:space-y-0 sm:space-x-8">
                    <div className="relative w-full">
                      <input
                        className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full"
                        type="text"
                        required
                        placeholder="Country"
                        value={data.country}
                        onChange={(e) =>
                          setData({ ...data, country: e.target.value })
                        }
                      />
                    </div>
                    <div className="w-full">
                      <input
                        className="focus:outline-none focus:ring-2 focus:ring-gray-500 px-2 border-b border-gray-200 leading-4 text-base placeholder-gray-600 pt-4 pb-3   w-full"
                        type="number"
                        required
                        placeholder="Zip Code"
                        min={2}
                        value={data.zipCode}
                        onChange={(e) =>
                          setData({ ...data, zipCode: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <input
                    className="focus:outline-none focus:ring-2 focus:ring-gray-500 px-2 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4   w-full"
                    type="number"
                    required
                    min={8}
                    value={data.phone}
                    onChange={(e) =>
                      setData({ ...data, phone: e.target.value })
                    }
                    placeholder="Phone Number"
                  />
                </div>
                <button
                  className="focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 mt-8 text-base font-medium focus:ring-focus:ring-gray-800 leading-4 hover:bg-black py-4 w-full md:w-4/12 lg:w-full text-white bg-gray-800"
                  type="submit"
                >
                  Proceed to payment
                </button>
              </form>
              <div className="flex flex-col justify-start items-start bg-gray-50 w-full p-6 md:p-14">
                <div>
                  <h1 className="text-2xl font-semibold leading-6 text-gray-800">
                    Order Summary
                  </h1>
                </div>
                <div className="flex mt-7 flex-col items-end w-full space-y-6">
                  <div className="flex justify-between w-full items-center">
                    <p className="text-lg leading-4 text-gray-600">
                      Total items
                    </p>
                    <p className="text-lg font-semibold leading-4 text-gray-600">
                      {cartItems.length}
                    </p>
                  </div>
                  <div className="flex justify-between w-full items-center">
                    <p className="text-lg leading-4 text-gray-600">
                      Total Charges
                    </p>
                    <p className="text-lg font-semibold leading-4 text-gray-600">
                      ${total}
                    </p>
                  </div>
                  <div className="flex justify-between w-full items-center">
                    <p className="text-lg leading-4 text-gray-600">
                      Shipping charges
                    </p>
                    <p className="text-lg font-semibold leading-4 text-gray-600">
                      $5
                    </p>
                  </div>
                </div>
                <div className="flex justify-between w-full items-center mt-32">
                  <p className="text-xl font-semibold leading-4 text-gray-800">
                    Estimated Total{" "}
                  </p>
                  <p className="text-lg font-semibold leading-4 text-gray-800">
                    ${total + 5}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
index.auth=true;
export default index;
