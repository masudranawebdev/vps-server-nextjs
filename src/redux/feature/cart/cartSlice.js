import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  totalPrice: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { productId, price, product_price, quantity } = action.payload;

      // Check if the product is already in the cart
      const existingProduct = state.products.find(
        (p) => p.productId === productId
      );

      if (!existingProduct) {
        // If not already added, add the product to the cart
        state.products.push(action.payload);
        // Update total price and total quantity
        state.totalPrice += price;
        state.totalQuantity += quantity;
      } else {
        // If already added, increment the quantity
        existingProduct.quantity += 1;
        // Update total price and total quantity
        state.totalPrice += product_price;
        state.totalQuantity += 1;
      }
    },

    removeFromCart: (state, action) => {
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

    decrementQuantity: (state, action) => {
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

    addToCartFromPcBuild: (state, action) => {
      const productsToAdd = action.payload; // Assuming payload is an array of products

      productsToAdd.forEach((productToAdd) => {
        const { productId, product_price, quantity } = productToAdd;

        // Find the product in the cart
        const existingProductIndex = state.products.findIndex(
          (p) => p.productId === productId
        );

        if (existingProductIndex !== -1) {
          // Product already exists in the cart
          const existingProduct = state.products[existingProductIndex];

          // Increment the quantity
          existingProduct.quantity += quantity;

          // Update total price and total quantity
          state.totalPrice += product_price * quantity;
          state.totalQuantity += quantity;
        } else {
          // Product doesn't exist in the cart, add it
          state.products.push({ ...productToAdd, quantity });

          // Update total price and total quantity
          state.totalPrice += product_price * quantity;
          state.totalQuantity += quantity;
        }
      });
    },

    allRemoveFromCart: (state) => {
      state.products = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decrementQuantity,
  addToCartFromPcBuild,
  allRemoveFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
