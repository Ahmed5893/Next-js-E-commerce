import CheckoutSteps from "@/components/CheckoutSteps";
import DropdownLink from "@/components/DropdownLink";
import { getError } from "@/components/Error";
import Pagination from "@/components/Pagination";
import { RESET_CART } from "@/store/constants/cartConstants";
import axios from "axios";
import Cookies from "js-cookie";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const index = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const { shippingAddress } = cart;
  const { paymentMethod } = cart;
  const { data: session } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();
  const [orderNumber, setOrderNumber] = useState(null); // Get current posts
  const [loading, setLoading] = useState(null); // Get current posts

  const [itemsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1); // Get current posts
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cartItems.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const [hydrated, setHydrated] = useState(null);
  let subtotal = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  let shipping = subtotal > 200 ? 0 : 10;
  const tax = Math.ceil((subtotal / 100) * 2);
  let total = (subtotal + shipping + tax).toFixed(2);

  useEffect(() => {
    setHydrated(true);
    setOrderNumber(Math.ceil(Math.random() * 100000));
    if (!paymentMethod) {
      router.push("/payment");
    }
  }, [paymentMethod, router]);
  const handlerSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post("/api/orders", {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice: subtotal,
        shippingPrice: shipping,
        taxPrice: tax,
        totalPrice: total,
      });
      setLoading(null);
      dispatch({ type: RESET_CART });
      Cookies.set("cartItems", JSON.stringify([]));
      router.push(`/order/${data._id}`);
    } catch (err) {
      setLoading(false);
      toast.error(getError(err));
    }
  };
  return (
    <>
      {hydrated && (
        <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
          <CheckoutSteps activeStep={4} />

          {cartItems.length === 0 ? (
            <div>
              Cart is empty. <Link href="/">Go shopping</Link>
            </div>
          ) : (
            <>
              <div className="flex justify-start item-start space-y-2 flex-col ">
                <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray-800">
                  Order #{orderNumber}
                </h1>
              </div>
              <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                  <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full relative">
                    <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800 mb-3">
                      Customer’s Cart
                    </p>
                    {currentItems.map((item) => (
                      <div
                        key={item._id}
                        className="mt-6 md:mt-0 flex justify-start flex-col md:flex-row  items-start md:items-center space-y-4  md:space-x-6 xl:space-x-8 w-full "
                      >
                        <div className="w-full md:w-40">
                          <img
                            className="w-full hidden md:block"
                            src={item.image}
                            alt={item.name}
                          />
                          <img
                            className="w-full md:hidden"
                            src={item.image}
                            alt={item.name}
                          />
                        </div>
                        <div className="  flex justify-between items-start w-full flex-col md:flex-row space-y-4 md:space-y-0  ">
                          <div className="w-full flex flex-col justify-start items-start space-y-8">
                            <h3 className="text-lg  font-semibold leading-6 text-gray-800">
                              {item.name}
                            </h3>
                          </div>
                          <div className="flex justify-between space-x-8 items-start w-full">
                            <p className="text-base xl:text-lg leading-6">
                              ${item.price}
                            </p>
                            <p className="text-base xl:text-lg leading-6 text-gray-800">
                              {item.qty}
                            </p>
                            <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">
                              ${item.price * item.qty}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Pagination
                      itemsPerPage={itemsPerPage}
                      totalItems={cartItems.length}
                      paginate={paginate}
                    />
                  </div>
                  <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                    <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                      <h3 className="text-xl font-semibold leading-5 text-gray-800">
                        Summary
                      </h3>
                      <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                        <div className="flex justify-between  w-full">
                          <p className="text-base leading-4 text-gray-800">
                            Subtotal
                          </p>
                          <p className="text-base leading-4 text-gray-600">
                            ${subtotal}
                          </p>
                        </div>
                        <div className="flex justify-between items-center w-full">
                          <p className="text-base leading-4 text-gray-800">
                            TAX{" "}
                            <span className="bg-gray-200 p-1 text-xs font-medium leading-3  text-gray-800">
                              2%
                            </span>
                          </p>
                          <p className="text-base leading-4 text-gray-600">
                            +${tax}{" "}
                          </p>
                        </div>
                        <div className="flex justify-between items-center w-full">
                          <p className="text-base leading-4 text-gray-800">
                            Shipping
                          </p>
                          <p className="text-base leading-4 text-gray-600">
                            {shipping === 0 ? "Free" : "$" + shipping}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center w-full">
                        <p className="text-base font-semibold leading-4 text-gray-800">
                          Total
                        </p>
                        <p className="text-base font-semibold leading-4 text-gray-600">
                          ${total}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                      <h3 className="text-xl font-semibold leading-5 text-gray-800">
                        Payment Method
                      </h3>
                      <div className="flex justify-between items-start w-full">
                        <div className="flex justify-center items-center space-x-4">
                          <div class="w-8 h-8">
                            <img
                              class="w-full h-full"
                              alt="logo"
                              src="https://i.ibb.co/L8KSdNQ/image-3.png"
                            />
                          </div>
                          <div className="flex flex-col justify-start items-center gap-1">
                            <p className="text-lg font-semibold leading-6 text-gray-800">
                              {paymentMethod}
                            </p>
                          </div>
                        </div>
                      </div>

                      <DropdownLink
                        className="w-full flex justify-center items-center"
                        href="/payment"
                      >
                        <button className="hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">
                          Edit Payment Method
                        </button>
                      </DropdownLink>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col ">
                  <h3 className="text-xl font-semibold leading-5 text-gray-800">
                    Customer
                  </h3>
                  <div className="flex  flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
                    <div className="flex flex-col justify-start items-start flex-shrink-0">
                      <div className="flex justify-center  w-full  md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                        <img
                          src="https://i.ibb.co/5TSg7f6/Rectangle-18.png"
                          alt="avatar"
                        />
                        <div className=" flex justify-start items-start flex-col space-y-2">
                          <p className="text-base font-semibold leading-4 text-left text-gray-800">
                            {session?.user.name}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-center  md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                            stroke="#1F2937"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M3 7L12 13L21 7"
                            stroke="#1F2937"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <p className="cursor-pointer text-sm leading-5 text-gray-800">
                          {session?.user.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between xl:h-full  items-stretch w-full flex-col mt-6 md:mt-0">
                      <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row  items-center md:items-start ">
                        <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 xl:mt-8">
                          <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                            Shipping Address
                          </p>
                          <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                            {shippingAddress.firstName}{" "}
                            {shippingAddress.lastName} <br />
                            {shippingAddress.address},{shippingAddress.city}{" "}
                            {shippingAddress.zipCode}
                            <br />
                            {shippingAddress.country}
                          </p>
                        </div>
                      </div>
                      <div className="flex-col ">
                        <DropdownLink
                          className="flex w-full justify-center items-center md:justify-start md:items-start my-3"
                          href="/shipping-screen"
                        >
                          <button className="mt-6 md:mt-0 py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base leading-4 text-gray-800">
                            Edit Shipping Address
                          </button>
                        </DropdownLink>
                        <DropdownLink
                          className="w-full flex justify-center items-center"
                          href="/place-order"
                        >
                          <button
                            className="hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white"
                            onClick={handlerSubmit}
                          >
                            Place Order
                          </button>
                        </DropdownLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
index.auth=true;
export default index;
