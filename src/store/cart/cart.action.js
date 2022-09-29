import { CART_ACTION_TYPES } from "./cart.types";

import { createAction } from '../../utils/reducer/reducer.utils';

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...existingCartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => 
    cartItem.id !== cartItemToRemove.id
    );
  }

    return cartItems.map((cartItem) => 
    cartItem.id === cartItemToRemove.id
    ? {...cartItem, quantity: cartItem.quantity - 1}
    : cartItem
    );
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0
});

const clearCartItem = (cartItems, cartItemToClear) => 
cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const setIsCartOpen = (boolean) => 
createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

const addItemToCart = (productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  updateCartItemsReducers(newCartItems);
};

const removeItemFromCart = (cartItemToRemove) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  updateCartItemsReducers(newCartItems);
}

const clearItemFromCart = (cartItemToClear) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  updateCartItemsReducers(newCartItems);
}