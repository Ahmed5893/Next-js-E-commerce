import Rating from "@/components/Rating";
import connectDB from "@/config/db";
import Product from "@/models/productModel";
import { ADD_TO_CART, UPDATE_CART_QTY } from "@/store/constants/cartConstants";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ADD_TO_LIST, REMOVE_FROM_LIST, SET_WISHLIST, STATUE_ON_LIST_UPDATE } from "@/store/constants/wishListConstants";
import axios from "axios";
import { BsClockHistory } from "react-icons/bs";

const productDetails = ({ product }) => {
  const [qty, setQty] = useState(1);
  const [favorite, setFavorite] = useState(null);
  const { data: session } = useSession();
  const router = useRouter();
  // const { redirect } = router.query;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const wishList = useSelector((state) => state.wishList);
  const { listItems } = wishList ;
  console.log("list Items :",[listItems])


  const cartQuantityHandler = (e) => {
    setQty(e.target.value);
    dispatch({
      type: UPDATE_CART_QTY,
      payload: { ...product, qty: e.target.value },
    });
  };

  const addToCartHandler = () => {
    // const existItem=cartItems.find(x=>x._id===product._id)
    // const quantity=existItem?qty+1:qty
    dispatch({ type: ADD_TO_CART, payload: { ...product, qty: +qty } });
    // Cookies.set("cart",JSON.stringify(cartItems))
  };
  useEffect(() => {
    Cookies.set("cartItems", JSON.stringify(cartItems));


  }, [cartItems,listItems]);

  
  
  const addToList = async() => {
    const productId=product._id
    const userId=session.user._id
    if(!favorite)
    {   
      try {
       
       const res= await axios.post(`/api/mylist/wishList?userId=${userId}`,{productId})
       dispatch({ type: ADD_TO_LIST, payload:res.data })
       dispatch({ type: SET_WISHLIST, payload: res.data });

      //  console.log('DATA',res.data)

          // .then(response => {
          //   const wishlistItem = response.data;
          //   console.log(wishlistItem)
          //   dispatch({ type: ADD_TO_LIST, payload:wishlistItem })
          // })
          const wishlistItem = res.data;
          // console.log('wishlistdata',wishlistItem)
          // .catch(error => {
          //   console.log(error)
          // });
      } catch (error) {
        console.log(error);
      }
    }else if (favorite===false) {
      try {
        await axios.delete(`/api/mylist/wishList?userId=${userId}`,{productId})
        dispatch({type:REMOVE_FROM_LIST,payload:productId})

      } catch (error) {
        console.log(error);

      }
    }

  };
  return (
    <>
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container px-5 py-24 mx-auto">
          <div className="md:ml-36 md:mb-6 font-bold">
            <Link href="/">Go Back</Link>
          </div>

          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <Image
              src={product.image}
              alt={product.name}
              className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
              width={300}
              height={200}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                BRAND NAME
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.name}
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <div>
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  </div>
                </span>
              </div>
              <p className="leading-relaxed">{product.description}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                <div className="flex items-center">
                  <span className="mr-3 font-bold">Status :</span>
                  <span
                    className={`font-bold text-lg text-center ${
                      product.countInStock > 0
                        ? "text-green-500"
                        : "text-red-600"
                    }`}
                  >
                    {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                  </span>
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Qty</span>
                  <div className="relative">
                    <select
                      className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-green-300 text-base pl-3 pr-10"
                      value={qty}
                      onChange={(e) => cartQuantityHandler(e)}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  ${product.price}
                </span>
                <button
                  className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                  disabled={product.countInStock === 0}
                  onClick={addToCartHandler}
                >
                  {product.countInStock === 0 ? "Out of Stock" : "Add to Cart"}
                </button>
                <button
                  className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                  onClick={(e) => {
                    if (session?.user) {
                      setFavorite(!favorite);
                      e.stopPropagation();
                      e.preventDefault();
                      addToList();
                    } else {

                      router.push("/login");
                    }
                  }}
                >
                  <svg
                    fill={favorite ? "red" : "currentColor"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default productDetails;

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;
  await connectDB();
  const product = await Product.find({ _id: id }).lean();
  // Convert _id field of each product to a string
  const stringifiedProducts = product.map((prod) => {
    return {
      ...prod,
      _id: prod._id.toHexString(),
      createdAt : prod.createdAt.toISOString(),
      updatedAt : prod.updatedAt.toISOString(),


    };
  });

  return {
    props: {
      product: stringifiedProducts.length > 0 ? stringifiedProducts[0] : null,
    },
  };
}
