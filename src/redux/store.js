import { baseApi } from "./api/baseApi";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./feature/cart/cartSlice";
import pcbuildReducer from "./feature/pcbuild/pcbuildSlice";
import compareReducer from "./feature/compare/compareSlice";
import recentViewReducer from "./feature/recentview/recentViewSlice";
import { cartLocalstorageMiddleware } from "./cartLocalstorageMiddleware";
import { compareLocalstorageMiddleware } from "./compareLocalstorageMiddleware";
import { pcbuildLocalstorageMiddleware } from "./pcbuildLocalstorageMiddleware";
import { recentlyViewLocalstorageMiddleware } from "./recentlyViewLocalstorageMiddleware";

// Function to load compare state from localStorage
const compareLoadState = () => {
  try {
    const serializedCompare = localStorage.getItem("compare");
    if (serializedCompare === null) {
      return undefined;
    }
    return JSON.parse(serializedCompare);
  } catch (error) {
    return undefined;
  }
};

// Function to load cart state from localStorage
const cartLoadState = () => {
  try {
    const serializedCart = localStorage.getItem("cart");
    if (serializedCart === null) {
      return undefined;
    }
    return JSON.parse(serializedCart);
  } catch (error) {
    return undefined;
  }
};

// Function to load pc build state from localStorage
const pcbuildLoadState = () => {
  try {
    const serializedCart = localStorage.getItem("pcbuild");
    if (serializedCart === null) {
      return undefined;
    }
    return JSON.parse(serializedCart);
  } catch (error) {
    return undefined;
  }
};

// Function to load recent view state from session storage
const recentViewLoadState = () => {
  try {
    const serializedRecentView = localStorage.getItem("recentView");
    if (serializedRecentView === null) {
      return undefined;
    }
    return JSON.parse(serializedRecentView);
  } catch (error) {
    return undefined;
  }
};

// Load preloaded states from localStorage
const comparePreloadedState = compareLoadState();
const cartPreloadedState = cartLoadState();
const pcbuildPreloadState = pcbuildLoadState();
const recentViewPreloadState = recentViewLoadState();

// Configure the Redux store
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    pcbuild: pcbuildReducer,
    compare: compareReducer,
    cart: cartReducer,
    recentView: recentViewReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      baseApi.middleware,
      compareLocalstorageMiddleware,
      cartLocalstorageMiddleware,
      pcbuildLocalstorageMiddleware,
      recentlyViewLocalstorageMiddleware
    ),

  preloadedState: {
    compare: comparePreloadedState,
    cart: cartPreloadedState,
    pcbuild: pcbuildPreloadState,
    recentView: recentViewPreloadState,
  },
});
