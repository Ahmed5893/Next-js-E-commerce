import Cookies from "js-cookie";
import {
  ADD_TO_CART,
  DELETE_FROM_CART,
  RESET_CART,
  SAVE_PAYMENT_METHOD,
  SAVE_SHIPPING_ADDRESS,
  UPDATE_CART_QTY,
} from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [],shippingAddress:{},paymentMethod:{} },action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x._id === existItem._id
              ? { ...existItem, qty: existItem.qty + 1 }
              : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...item, qty: item.qty }],
        };
      }
    case UPDATE_CART_QTY:
      const quantityUpdate=state.cartItems.filter((x) =>
          x._id === action.payload._id ? (x.qty = +action.payload.qty) : x.qty
         )
         Cookies.set('cartItems', JSON.stringify( quantityUpdate ));

         return { ...state, cartItems:quantityUpdate };

    case DELETE_FROM_CART:
      // return {
      //   ...state,
      //   cartItems: state.cartItems.filter((x) => x._id !== action.payload._id),
      // };
      
      const cartItem = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      Cookies.set('cartItems', JSON.stringify( cartItem ));
      return { ...state, cartItems:cartItem };
    
      case RESET_CART:
        return {...state,cartItems:[]}

case SAVE_SHIPPING_ADDRESS:
  return{
  ...state, 
  shippingAddress:action.payload
  }
  case SAVE_PAYMENT_METHOD:
    return{
    ...state, 
    paymentMethod:action.payload
    }
    default:
      return state;
  }
};
