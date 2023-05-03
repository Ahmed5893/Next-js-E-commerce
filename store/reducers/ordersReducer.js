import {
  ORDER_FETCH_FAIL,
  ORDER_FETCH_REQUEST,
  ORDER_FETCH_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
} from "../constants/ordersConstants";

export const ordersDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_FETCH_REQUEST:
      return { ...state, loading: true };

    case ORDER_FETCH_SUCCESS:
      return { ...state, loading: false, order: action.payload };

    case ORDER_FETCH_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { ...state, loadingPay: true };

    case ORDER_PAY_SUCCESS:
      return { ...state, loadingPay: false, success: true };

    case ORDER_PAY_FAIL:
      return { ...state, loadingPay: false, errorPay: action.payload };
    case ORDER_PAY_RESET:
      return {};

    default:
      return state;
  }
};

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return {
        loading: true,
      }
    case ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      }
    case ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}