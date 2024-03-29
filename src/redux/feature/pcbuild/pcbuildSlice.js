import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  totalPrice: 0,
  totalQuantity: 0,
};

const pcbuildSlice = createSlice({
  name: "pcbuild",
  initialState,
  reducers: {
    addToPcbuild: (state, action) => {
      const { product_price, quantity, pc_builder_name } = action.payload;

      const existingProductIndex = state.products.findIndex(
        (product) => product.pc_builder_name === pc_builder_name
      );

      if (existingProductIndex !== -1) {
        // If a product with the same pc_builder_name exists, remove it from the products array
        state.totalPrice -= state.products[existingProductIndex].product_price;
        state.products = state.products.filter(
          (product) => product.pc_builder_name !== pc_builder_name
        );
      }
      state.products.push(action.payload);
      // Update total price and total quantity
      state.totalPrice += product_price;
      state.totalQuantity += quantity;
    },

    removeFromPcbuild: (state, action) => {
      const { productId, product_price, quantity } = action.payload;

      // Find the index of the product in the cart
      const indexToRemove = state.products.findIndex(
        (product) => product.productId === productId
      );

      if (indexToRemove !== -1) {
        // Update total price and total quantity
        state.totalPrice -= product_price * quantity;
        state.totalQuantity -= quantity;

        // Remove the product from the cart
        state.products.splice(indexToRemove, 1);
      }
    },

    decrementQuantityFromPcbuild: (state, action) => {
      const { productId, product_price } = action.payload;

      // Find the product in the cart
      const existingProduct = state.products.find(
        (p) => p.productId === productId
      );

      if (existingProduct) {
        // Decrement the quantity
        if (existingProduct.quantity > 1) {
          existingProduct.quantity -= 1;

          // Update total price and total quantity
          state.totalPrice -= product_price;
          state.totalQuantity -= 1;
        }
      }
    },
  },
});

export const { addToPcbuild, removeFromPcbuild, decrementQuantityFromPcbuild } =
  pcbuildSlice.actions;

export default pcbuildSlice.reducer;
