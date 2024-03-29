import {
  addToCart,
  allRemoveFromCart,
  decrementQuantity,
  removeFromCart,
} from "./feature/cart/cartSlice";

export const cartLocalstorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  // Store only the cart value in local storage after the actions have been dispatched
  if (
    action.type === addToCart.type ||
    action.type === removeFromCart.type ||
    action.type === decrementQuantity.type ||
    action.type === allRemoveFromCart.type
  ) {
    localStorage.setItem("cart", JSON.stringify(store.getState().cart));
  }

  return result;
};
