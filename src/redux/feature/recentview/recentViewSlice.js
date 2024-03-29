import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const recentViewSlice = createSlice({
  name: "recentView",
  initialState,
  reducers: {
    addToStore: (state, action) => {
      const { _id } = action.payload;

      // Check if the product is already in the cart
      const existingProductIndex = state.products.findIndex(
        (p) => p._id === _id
      );

      if (existingProductIndex === -1) {
        // If not already added, add the product to the cart
        if (state.products.length >= 5) {
          // If there are already 5 products, remove the oldest one
          state.products.pop();
        }
        state.products.push(action.payload);
        // Update total price and total quantity
      } else {
        // If already added, move it to the end of the list (most recent)
        const existingProduct = state.products[existingProductIndex];
        state.products.splice(existingProductIndex, 1);
        state.products.push(existingProduct);
      }
    },
  },
});

export const { addToStore } = recentViewSlice.actions;

export default recentViewSlice.reducer;
