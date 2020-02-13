import {
  TOGGLE_CART_HIDDEN,
  ADD_ITEM,
  CLEAR_ITEM_FROM_CART,
  REMOVE_ITEM
} from './cart.types';
import {
  addItemToCart,
  clearItemFromCart,
  removeItem
} from "./cart.utils";

const INITIAL_STATE = {
  hidden: true,
  cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case TOGGLE_CART_HIDDEN:
      return { ...state, hidden: !state.hidden };
    case ADD_ITEM:
      return { ...state, cartItems: addItemToCart(state.cartItems, action.payload) };
    case CLEAR_ITEM_FROM_CART:
      return { ...state, cartItems: clearItemFromCart(state.cartItems, action.payload) };
    case REMOVE_ITEM:
      return { ...state, cartItems: removeItem(state.cartItems, action.payload) };
    default:
      return state;
  }
};

export default cartReducer;