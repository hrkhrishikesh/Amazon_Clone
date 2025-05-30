import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  products: [],
  userInfo: null,
};

export const amazonSlice = createSlice({
  name: "amazon",
  initialState,
  reducers: {
    // ============= Product Reducers Start here ===============
    // Add to cart
    addToCart: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },
    increaseQuantity: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload);
      if (item) {
        item.quantity++;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload);
      if (item) {
        if (item.quantity <= 1) {
          // Remove item when quantity is 1 or less
          state.products = state.products.filter(
            (item) => item.id !== action.payload
          );
        } else {
          item.quantity--;
        }
      }
    },
    // Delete item from cart
    deleteItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload
      );
    },
    // Reset cart to initial state
    resetCart: (state) => {
      state.products = [];
    },

    //firebase stuff

    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },

    userSignOut: (state) => {
      state.userInfo = null;
    },
  },
});

export const {
  addToCart,
  deleteItem,
  resetCart,
  increaseQuantity,
  decreaseQuantity,
  setUserInfo,
  userSignOut,
} = amazonSlice.actions;
export default amazonSlice.reducer;
