import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { REMOVE_FROM_LIST } from "@/store/constants/wishListConstants";
import wishList from "@/models/wishListModel";
import Cookies from "js-cookie";

import connectDB from "@/config/db";
import axios from "axios";
import { useState } from "react";
import DropdownLink from "@/components/DropdownLink";


export default function index({ item }) {
  const wishList = useSelector((state) => state.wishList);
  const { listItems } = wishList;
  const dispatch = useDispatch();


  const { data: session } = useSession();
  console.log("ITEM", listItems);

  const router = useRouter();
  const handleDelete = async (productId) => {
    // dispatch({type:REMOVE_FROM_LIST,payload:listItems})
    await axios.delete(`/api/mylist/wishList?userId=${session?.user._id}`, {
      data: {
        productId: productId,
      },
    });
  };
 
  useEffect(() => {
    Cookies.set("listItem", JSON.stringify(item));
  }, [item]);


  return (
    <div className=" py-12">
      {/* Desktop Responsive Start */}
      <div className="hidden sm:flex flex-col justify-start items-start">
        <div className="pl-4 lg:px-10 2xl:px-20 flex flex-row justify-center items-end space-x-4">
          <h1 className="text-4xl font-semibold leading-9 text-gray-800">
            Favourites
          </h1>
          <p className="text-base leading-4 text-gray-600 pb-1">
            {" "}
            {item.length > 0 ? `${item.length} Items` : "List Is Empty"}
          </p>
        </div>

        <table className="w-full mt-16 whitespace-nowrap">
          <thead
            aria-label="table heading"
            className="w-full h-16 text-left py-6 bg-gray-50 border-gray-200 border-b "
          >
            <tr>
              <th className="text-base font-medium leading-4 text-gray-600 2xl:pl-20 pl-4 lg:pl-10">
                YOUR PRODUCT
              </th>
              <th className="text-base font-medium leading-4 text-gray-600 pl-6 lg:pl-20 2xl:pl-52">
                DESCRIPTION
              </th>
              <th className="text-base font-medium leading-4 text-gray-600 pl-6 lg:pl-20 2xl:pl-52">
                PRICE
              </th>
              <th className="text-base font-medium leading-4 text-gray-600 pl-6 lg:pl-20 2xl:pl-52">
                MORE OPTIONS
              </th>
              <th className="text-base font-medium leading-4 text-gray-600 2xl:pl-28 2xl:pr-20 pr-4 lg:pr-10" />
            </tr>
          </thead>
          <tbody className="w-full text-left">
            {item.length > 0 &&
              item.map((item) => (
                <tr className="border-gray-200 border-b  ">
                  <th>
                    <img
                      className="my-10 pl-4 lg:pl-10 2xl:pl-20"
                      src={item.image}
                      alt={item.name}
                    />
                  </th>
                  <th className="mt-10 text-base font-medium leading-4 text-gray-600 pl-6 lg:pl-20 2xl:pl-52">
                    <p className=" text-base leading-4 text-gray-800">
                      {item.name}
                    </p>
                  </th>
                  <th className="my-10  pl-6 lg:pl-20 2xl:pl-52">
                    <p className>${item.price}</p>
                  </th>
                  <th className="my-10 text-base font-medium leading-4 text-gray-600 pl-6 lg:pl-20 2xl:pl-52">
                    <DropdownLink
                      href={`/product/${item._id}`}
                      className="hover:underline text-base font-medium leading-none  text-gray-800 focus:outline-none focus:underline"
                    >
                      View details
                    </DropdownLink>
                  </th>
                  <th className="my-10 pl-4 lg:pl-12  2xl:pl-28 pr-4 2xl:pr-20">
                    <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-800 text-base leading-none text-red-600 hover:text-red-800">
                      <p>Remove Item</p>
                    </button>
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {/* Desktop Responsive End */}
      {/* Mobile Responsive Start */}
      <div className=" flex justify-center items-center">
        <div className="sm:hidden flex flex-col justify-start items-start ">
          <div className="px-4 lg:px-10 2xl:px-20 flex flex-row justify-start items-end space-x-4">
            <p className="text-4xl font-semibold leading-9 text-gray-800">
              Favourites
            </p>
            <p className="text-base leading-4 text-gray-600 pb-1">
              {item.length > 0 ? `${item.length} Items` : "List Is Empty"}
            </p>
          </div>
          {item.length > 0 &&
            item.map((item) => (
              <div className="border-gray-200 border-b pb-10">
                <div className="px-4 flex flex-col jusitfy-center items-start mt-10">
                  <div>
                    <img src={item.image} alt={item.name} />
                  </div>
                </div>
                <div className="px-4 mt-6  justify-between w-full flex jusitfy-center items-center">
                  <div>
                    <p className="w-36 text-base leading-6 text-gray-800">
                      {item.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-base font-semibold leading-4 text-gray-800">
                      ${item.price}
                    </p>
                  </div>
                </div>
                <div className="px-4 mt-6  justify-between w-full flex jusitfy-center items-center">
                  <div>
                    <DropdownLink
                      href={`/product/${item._id}` }
                      className="hover:underline text-base font-medium leading-none focus:outline-none focus:underline  text-gray-800"
                    >
                      {" "}
                      View details
                    
                    </DropdownLink>
                  </div>
                  <div>
                    <button
                      className="focus:outline-none focus:ring-red-800 focus:ring-offset-2 focus:ring-2 text-base leading-none text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(item._id)}
                    >
                      <p>Remove Item</p>
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      {/* Mobile Responsive End */}
    </div>
  );
}
index.auth=true;

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;
  await connectDB();
  // const data= await wishList.find({user:id}).lean();
  const data = await wishList.find({ user: id }).populate("prod_code").lean();
  const prodCodes = data.map((item) => item.prod_code);

  return {
    props: {
      item: JSON.parse(JSON.stringify(prodCodes)),
    },
  };
}
