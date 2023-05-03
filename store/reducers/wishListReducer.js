import Cookies from "js-cookie";
import { ADD_TO_LIST, REMOVE_FROM_LIST, SET_WISHLIST, STATUE_ON_LIST_UPDATE } from "../constants/wishListConstants";

export const wishListReducer = (state = { listItems:{} },action) => {
  switch (action.type) {
    case SET_WISHLIST:
      return { ...state, listItems: action.payload };
    case ADD_TO_LIST:
      const item = action.payload;
// const existItem=state.listItems.find(x=>x.prod_code === item.prod_code);
// const existUser=state.listItems.find(x=>x.user === item.user);
// if(existItem && existUser){
//   return {
//     ...state,
//     listItems: state.listItems.map((x) =>
//       x.prod_code === existItem.prod_code
//         ? { ...existItem, onList: !existItem.onList }
//         : x
//     ),
//   };
if (state.listItems && state.listItems.prod_code === item.prod_code && state.listItems.user === item.user) {
  return {
    ...state,
    listItems: { ...state.listItems, onList: !state.listItems.onList },
  };
} else {  
      return {
        ...state,
        listItems: item 
      };
    }
     case REMOVE_FROM_LIST:
      const items=state.listItems.find(x=>x.prod_code === action.payload.prod_code);
       const user=state.listItems.find(x=>x.user === action.payload.user);
      if(items && user){

      const listItem = state.listItems.filter(
        (item) => item.prod_code !== action.payload.prod_code
      );
      return { ...state, listItems:listItem };
      }
      
    default:
      return state;
  }
};
