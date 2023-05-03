import Rating from "@/components/Rating";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { AiTwotoneHeart } from "react-icons/ai";

const SingleProduct = ({ product }) => {
  return (
    <div>
      {" "}
      <Link href={`/product/${product._id}`}>
        <div
          className=" relative flex flex-col md:w-72  pb-6 shadow-sm shadow-black items-center justify-between gap-1 cursor-pointer hover:scale-110 hover:shadow-lg hover:shadow-black"
        >
          {/* {favorite ? (
            <AiTwotoneHeart
              className="absolute top-0 right-2 text-2xl text-red-600 cursor-pointer "
              onClick={(e) => {
                setFavorite(!favorite);
                e.stopPropagation();
                e.preventDefault();
              }}
            />
          ) : (
            <AiOutlineHeart
              className="absolute top-0 right-2 text-2xl text-red-600 cursor-pointer"
              onClick={(e) => {
                setFavorite(!favorite);
                e.stopPropagation();
                e.preventDefault();
              }}
            />
          )} */}

          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={200}
            className=" p-3 "
          />
          <span className="text-center py-2 text-sm ">{product.name}</span>
          <div>
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </div>
          <span className="font-bold mt-2">${product.price}</span>
        </div>
      </Link>
    </div>
  );
};

export default SingleProduct;
