import { getError } from "@/components/Error";
import {
  ORDER_FETCH_FAIL,
  ORDER_FETCH_REQUEST,
  ORDER_FETCH_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
} from "@/store/constants/ordersConstants";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";

const index = ({data}) => {
  const { data: session } = useSession();
  const { query } = useRouter();
  const orderId = query.id;
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const orderPay = useSelector((state) => state.orderPay);
  const { success,loadingPay,errorPay } = orderPay;


  const { order, loading, error } = orderDetails;
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
console.log('ORDER', order)
  useEffect(() => {
    const getOrder = async () => {
      if(orderId){  
      try {
        dispatch({ type: ORDER_FETCH_REQUEST });
        const { data } = await axios.get(`/api/orders/${orderId}`);
       data && dispatch({ type: ORDER_FETCH_SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: ORDER_FETCH_FAIL, payload: getError(error) });
      }
    };
  }
     if(!order?._id ||success||(order?._id&&order?._id!==orderId)){getOrder()}
     if(success){dispatch({type:ORDER_PAY_RESET})}
     else{
      const loadPaypalScript=async()=>{
      const {data : clientId }=await axios.get('/api/keys/paypal');
      paypalDispatch({
      type:'resetOptions',
    value:{
    'client-id':clientId,
    currency:"USD",
    }
      });
      paypalDispatch({type:'setLoadingStatus',value:'pending'});
      }
      loadPaypalScript();
    }
  }, [orderId,order,paypalDispatch,success]);

  //PAYPal function
  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value:order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: ORDER_PAY_REQUEST });
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details
        );
        dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
        toast.success('Order is paid successfully');
      } catch (err) {
        dispatch({ type: ORDER_PAY_FAIL, payload: getError(err) });
        toast.error(getError(err));
      }
    });
  }
  function onError(err) {
    toast.error(getError(err));
  }
 
  return (
    <div>
      <h1 className="m-4 text-xl">{`Order ${orderId}`}</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="alert-error">{error}</div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <div className="card  p-5">
              <h2 className="mb-2 text-lg">Shipping Address</h2>
              <div>
                {order.shippingAddress.firstName} {" "}
                {order.shippingAddress.lastName},{" "}
                {order.shippingAddress.address},{order.shippingAddress.city},{" "}
                {order.shippingAddress.zipCode},{order.shippingAddress.country}
              </div>
              {order.isDelivered ? (
                <div className="alert-success">
                  Delivered at {order.deliveredAt}
                </div>
              ) : (
                <div className="alert-error">Not delivered</div>
              )}
            </div>

            <div className="card p-5">
              <h2 className="mb-2 text-lg">Payment Method</h2>
              <div>{order.paymentMethod}</div>
              {order.isPaid ? (
                <div className="alert-success">Paid at {order.paidAt}</div>
              ) : (
                <div className="alert-error">Not paid</div>
              )}
            </div>

            <div className="card overflow-x-auto p-5">
              <h2 className="mb-2 text-lg">Order Items</h2>
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left">Item</th>
                    <th className="    p-5 text-right">Quantity</th>
                    <th className="  p-5 text-right">Price</th>
                    <th className="p-5 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderItems.map((item) => (
                    <tr key={item._id} className="border-b">
                      <td>
                        <Link
                          href={`/product/${item._id}`}
                          className="flex items-center"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                            style={{
                              maxWidth: "100%",
                              height: "auto",
                            }}
                          ></Image>
                          {item.name}
                        </Link>
                      </td>
                      <td className=" p-5 text-right">{item.qty}</td>
                      <td className="p-5 text-right">${item.price}</td>
                      <td className="p-5 text-right">
                        ${item.qty * item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <div className="card  p-5">
              <h2 className="mb-2 text-lg">Order Summary</h2>
              <ul>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Items</div>
                    <div>${order.itemsPrice}</div>
                  </div>
                </li>{" "}
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Tax</div>
                    <div>${order.taxPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Shipping</div>
                    <div>${order.shippingPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Total</div>
                    <div>${order.totalPrice}</div>
                  </div>
                </li>
                {!order.isPaid && (
  <li>
    {isPending ? (
      <div>Loading...</div>
    ) : (
      <div className="w-full">
        <PayPalButtons
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}
        ></PayPalButtons>
      </div>
    )}
    {loadingPay && <div>Loading...</div>}
  </li>
)}
{session?.user.isAdmin && order.isPaid && !order.isDelivered && (
  <li>
    {loadingDeliver && <div>Loading...</div>}
    <button
      className="primary-button w-full"
      onClick={deliverOrderHandler}
    >
      Deliver Order
    </button>
  </li>
)}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
index.auth=true;
export default index;





