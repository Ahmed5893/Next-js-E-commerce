import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import DropdownLink from "@/components/DropdownLink";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { SAVE_PAYMENT_METHOD, SAVE_SHIPPING_ADDRESS } from "@/store/constants/cartConstants";
import CheckoutSteps from "@/components/CheckoutSteps";

const index = () => {
  const [hydrated, setHydrated] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('CARD');

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

  let total = cartItems.reduce((a, c) => a + c.price * c.qty, 0);

  useEffect(() => {
if(!shippingAddress) return router.push('/shipping-screen')
  
    setHydrated(true);
  }, []);
 

  const handlerSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: SAVE_PAYMENT_METHOD, payload: paymentMethod });
    Cookies.set("paymentMethods", JSON.stringify(paymentMethod));
    router.push("/place-order");
  };
  return (
    <>
      {hydrated && (
        <div className="overflow-y-hidden">
          <CheckoutSteps activeStep={2}/>
          <div className="flex justify-center items-center 2xl:container 2xl:mx-auto lg:py-16 md:py-12 py-9 px-4 md:px-6 lg:px-20 xl:px-44 ">
            <div className="flex w-full sm:w-9/12 lg:w-full flex-col lg:flex-row justify-center items-center lg:space-x-10 2xl:space-x-36 space-y-12 lg:space-y-0">
              <form
                className="flex w-full  flex-col justify-start items-start"
                onSubmit={handlerSubmit}
              >
                <div>
                  <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
                    Payment
                  </p>
                </div>
                <div className="mt-2">
                  <DropdownLink
                    href="/shipping-screen"
                    className="text-base leading-4 underline  hover:text-gray-800 text-gray-600"
                  >
                    Back to Shipping
                  </DropdownLink>
                </div>
                <div className="mt-12">
                  <p className="text-xl font-semibold leading-5 text-gray-800">
                    Payment Methods
                  </p>
                </div>
                <div className="mt-8 flex flex-col justify-start items-start w-full space-y-8 ">
                <div className="p-8 bg-gray-100 flex flex-col lg:w-full xl:w-4/5">
                            <button className="border border-transparent hover:border-gray-300 bg-gray-900 hover:bg-white text-white hover:text-gray-900 flex flex-row justify-center items-center space-x-2 py-4 rounded w-full" onClick={()=>setPaymentMethod('Paypal')}>
                                <div>
                                    <svg className="fill-current" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M10.9099 4.27692C9.6499 4.27692 9.1174 4.87817 8.2399 4.87817C7.34021 4.87817 6.65396 4.28129 5.56208 4.28129C4.49333 4.28129 3.35365 4.93379 2.6299 6.04535C1.61365 7.61285 1.78615 10.565 3.43208 13.08C4.02083 13.9804 4.80708 14.99 5.83833 15.001H5.85708C6.75333 15.001 7.01958 14.4141 8.25302 14.4072H8.27177C9.48677 14.4072 9.73052 14.9975 10.623 14.9975H10.6418C11.673 14.9866 12.5015 13.8679 13.0902 12.971C13.514 12.326 13.6715 12.0022 13.9965 11.2725C11.6155 10.3688 11.233 6.99348 13.5877 5.69942C12.869 4.79942 11.859 4.27817 10.9068 4.27817L10.9099 4.27692Z"
                                            fill="currentColor"
                                        />
                                        <path d="M10.6338 1C9.88379 1.05094 9.00879 1.52844 8.49629 2.15188C8.03129 2.71688 7.64879 3.555 7.79879 4.36781H7.85879C8.65754 4.36781 9.47504 3.88688 9.95254 3.27063C10.4125 2.68406 10.7613 1.85281 10.6338 1V1Z" fill="currentColor" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-base leading-4">Pay</p>
                                </div>
                            </button>

                            <div className="flex flex-row justify-center items-center mt-6">
                                <hr className="border w-full" />
                                <p className="flex flex-shrink-0 px-4 text-base leading-4 text-gray-600">or pay with card</p>
                                <hr className="border w-full" />
                            </div>

                            <div className="mt-8">
                                <input className="border border-gray-300 p-4 rounded w-full text-base leading-4 placeholder-gray-600 text-gray-600" type="email" placeholder="Email" />
                            </div>

                            <label className="mt-8 text-base leading-4 text-gray-800">Card details</label>
                            <div className="mt-2 flex-col">
                                <div>
                                    <input className="border rounded-tl rounded-tr border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600" type="email" placeholder="0000 1234 6549 15151" />
                                </div>
                                <div className="flex-row flex">
                                    <input className="border rounded-bl border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600" type="email" placeholder="MM/YY" />
                                    <input className="border rounded-br border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600" type="email" placeholder="CVC" />
                                </div>
                            </div>

                            <label className="mt-8 text-base leading-4 text-gray-800">Name on card</label>
                            <div className="mt-2 flex-col">
                                <div>
                                    <input className="border rounded border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600" type="email" placeholder="Name on card" />
                                </div>
                            </div>

                           

                            <button className="mt-8 border border-transparent hover:border-gray-300 bg-gray-900 hover:bg-white text-white hover:text-gray-900 flex justify-center items-center py-4 rounded w-full"  type="submit">
                                <div>
                                    <p className="text-base leading-4">Place Order</p>
                                </div>
                            </button>
                        </div>
                </div>
               
              </form>
              
            </div>
          </div>
        </div>
      )}
    </>
  );
};
index.auth=true;
export default index;
