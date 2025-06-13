import { createSlice } from "@reduxjs/toolkit";

//  THis is opur intial state

const initialState = {
  carts: JSON.parse(window.localStorage.getItem("carts")) || [],
  loading: false,
  error: null,
  qty: JSON.parse(window.localStorage.getItem("cartQuantity")) || 0,
};

export const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    cartAdd: (state, action) => {
      state.loading = false;
      state.error = null;
      state.carts.push(action.payload);
      window.localStorage.setItem("carts", JSON.stringify(state.carts));
    },

    cartClear: (state) => {
      state.carts = null;
      state.error = false;
      state.loading = false;
      window.localStorage.clear("carts");
    },
    cartQuantityHandle: (state, action) => {
      if (action.payload == 0) {
        window.localStorage.setItem("cartQuantity", action.payload);
      } else {
        state.qty = state.qty + action.payload;
        window.localStorage.setItem("cartQuantity", state.qty);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { cartAdd, cartClear, cartQuantityHandle } = cartSlice.actions;

export default cartSlice.reducer;
