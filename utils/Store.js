import Cookies from 'js-cookie';
import { createContext, useReducer } from 'react';

export const Store = createContext();
const initialState = {
  lightsMode: Cookies.get('lightsMode')
    ? Cookies.get('lightsMode') == 'ON'
      ? true
      : false
    : true,

  firstStyle: Cookies.get('firstStyle')
    ? Cookies.get('firstStyle')
    : Cookies.set('firstStyle', 'firstcolor'),
  secondStyle: Cookies.get('secondStyle')
    ? Cookies.get('secondStyle')
    : Cookies.set('secondStyle', 'secondcolor'),
  thirdStyle: Cookies.get('thirdStyle')
    ? Cookies.get('thirdStyle')
    : Cookies.set('thirdStyle', 'thirdcolor'),

  cart: {
    cartItems: Cookies.get('cartItems')
      ? JSON.parse(Cookies.get('cartItems'))
      : [],
    shippingAddress: Cookies.get('shippingAddress')
      ? JSON.parse(Cookies.get('shippingAddress'))
      : {},
    paymentMethod: Cookies.get('paymentMethod')
      ? Cookies.get('paymentMethod')
      : '',
  },
  userInfo: Cookies.get('userInfo')
    ? JSON.parse(Cookies.get('userInfo'))
    : null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'BASIC_MODE': {
      Cookies.set('firstStyle', 'firstcolor');
      Cookies.set('secondStyle', 'secondcolor');
      Cookies.set('thirdStyle', 'thirdcolor');

      return {
        ...state,
        lightsMode: true,
      };
    }

    case 'COLOR_MODE': {
      Cookies.set('firstStyle', 'first');
      Cookies.set('secondStyle', 'second');
      Cookies.set('thirdStyle', 'third');
      return {
        ...state,
        lightsMode: false,
      };
    }
    case 'CART_ADD_ITEM': {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      Cookies.set('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      Cookies.set('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'SAVE_SHIPPING_ADDRESS':
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: {
            ...state.cart.shippingAddress,
            ...action.payload,
          },
        },
      };

    case 'SAVE_PAYMENT_METHOD':
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };
    case 'CART_CLEAR':
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    case 'USER_LOGIN':
      return { ...state, userInfo: action.payload };
    case 'USER_LOGOUT':
      return {
        ...state,
        userInfo: null,
        cart: {
          cartItems: [],
          shippingAddress: {},
          paymentMethod: '',
        },
      };

    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
