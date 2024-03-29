import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [], // Initialize products as an empty array
};

const compareSlice = createSlice({
  name: "compare",
  initialState,
  reducers: {
    addToCompare: (state, action) => {
      // Check if the product is already in the comparison
      const isAlreadyAdded = state.products.some(
        (p) => p._id === action.payload._id
      );

      if (!isAlreadyAdded && state.products.length < 4) {
        // If not already added and the comparison has less than 4 products, add the product
        state.products.push(action.payload);
      }
    },

    removeFromCompare: (state, action) => {
      // Find the index of the product in the comparison
      const indexToRemove = state.products.findIndex(
        (product) => product._id === action.payload._id
      );

      if (indexToRemove !== -1) {
        // Remove the product from the comparison
        state.products.splice(indexToRemove, 1);
      }
    },
  },
});

export const { addToCompare, removeFromCompare } = compareSlice.actions;

export default compareSlice.reducer;
