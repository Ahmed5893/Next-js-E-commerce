import React, { useEffect, useState } from "react";
import { BsCart2 } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import Link from "next/link";
import { useSelector } from "react-redux";
import { signOut, useSession } from "next-auth/react";
import { Menu } from '@headlessui/react'
import DropdownLink from "./DropdownLink";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { RESET_CART } from "@/store/constants/cartConstants";

const Layout = ({ children }) => {
  const dispatch=useDispatch()
  const cart = useSelector((state) => state.cart);
  const [items, setItems] = useState([]);
  const { status, data: session } = useSession();
  useEffect(() => {
    setItems(cart.cartItems);
  }, [cart.cartItems]);
const signoutClickHandler=() => {
  Cookies.remove('cartItems')
signOut({callbackUrl:'/login'})
dispatch({type:RESET_CART})
}
  return (
    <div className="min-h-screen flex flex-col justify-between ">
      <nav>
        <div className="flex justify-between  px-2 md:px-8 md:justify-between w-100 h-16 bg-slate-800 items-center  ">
          <Link href="/">
            <span className="cursor-pointer text-white text-xl logo">
              PROSHOP
            </span>
          </Link>

          <ul className="flex gap-3 md:gap-8 cursor-pointer text-slate-400  ">
            <Link href="/cart">
              <li className="flex items-center gap-2  shadow-md shadow-white p-2 active:scale-75 hover:text-slate-50">
                <i className="relative text-center">
                  {items.length > 0 && (
                    <span className=" w-[20px] absolute -top-5 rounded-full bg-red-600 py-1 text-xs px-2 font-bold text-white ">
                      {items.reduce((a, c) => a + c.qty, 0)}
                    </span>
                  )}
                  <BsCart2 />
                </i>
                Cart
              </li>
            </Link>
            {status === "loading" ? (
              "Loading"
            ) : session?.user ? (
              
              <Menu as='div' className="relative inline-block z-30">
                <Menu.Button className="flex items-center gap-2  shadow-md shadow-white p-2 ">
                {session.user.name}
                </Menu.Button>
                <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white shadow-lg">
                  <Menu.Item>
                    <DropdownLink className="flex p-2 hover:bg-gray-200" href={`/profile/${session.user._id}`}>
                      Profile
                    </DropdownLink>
                  </Menu.Item>
                  <Menu.Item>
                    <DropdownLink className="flex p-2 hover:bg-gray-200" href={`/wishList/${session.user._id}`}>
                      My List
                    </DropdownLink>
                  </Menu.Item>
                  <Menu.Item>
                    <DropdownLink className="flex p-2 hover:bg-gray-200" href='/order-history'>
                      My Orders
                    </DropdownLink>
                  </Menu.Item>
                  <Menu.Item>
                    <DropdownLink className="flex p-2 hover:bg-gray-200" href='#' onClick={signoutClickHandler}>
                      Sign Out
                    </DropdownLink>
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            ) : (
              <Link href="/login">
                <li className="flex items-center gap-2  shadow-md shadow-white p-2 active:scale-75 hover:text-slate-50">
                  <BiUserCircle />
                  Sign In
                </li>
              </Link>
            )}
          </ul>
        </div>
      </nav>
      <div>{children}</div>
      <footer className="text-center mb-4">Copyight &copy; ProShop</footer>
    </div>
  );
};

export default Layout;
