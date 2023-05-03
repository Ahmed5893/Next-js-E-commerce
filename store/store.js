import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { cartReducer } from './reducers/cartReducer'
import { wishListReducer } from './reducers/wishListReducer'

import Cookies from 'js-cookie'
import { orderListReducer, orderPayReducer, ordersDetailsReducer } from './reducers/ordersReducer'





const reducer =combineReducers({
cart:cartReducer,
wishList: wishListReducer,
orderDetails: ordersDetailsReducer,
orderPay:orderPayReducer,
orderList:orderListReducer,
})
const cartItemsFromStorage =Cookies.get("cartItems")? JSON.parse(Cookies.get("cartItems")): [];
const wishListFromStorage =Cookies.get("listItem")? JSON.parse(Cookies.get("listItem")): [];
const shippingAddressFromStorage =Cookies.get("shippingAddress")? JSON.parse(Cookies.get("shippingAddress")): [];
const paymentMethodFromStorage =Cookies.get("paymentMethods")? JSON.parse(Cookies.get("paymentMethods")): [];


const initialState = {
cart:{cartItems:cartItemsFromStorage,
  shippingAddress:shippingAddressFromStorage,
  PaymentMethod:paymentMethodFromStorage
},
wishList:{listItems:wishListFromStorage },

}
const middleware =[thunk]
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  )


export default store

