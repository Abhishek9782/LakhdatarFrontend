import { createSlice } from "@reduxjs/toolkit";

//  THis is opur intial state

const initialState = {
  carts: JSON.parse(window.localStorage.getItem("carts")) || null,
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
      state.carts = action.payload;
      // console.log(action.payload);
      window.localStorage.setItem("carts", JSON.stringify(action.payload));
    },
    cartClear: (state) => {
      state.carts = null;
      state.error = false;
      state.loading = false;
      window.localStorage.clear("carts");
    },
    cartQuantityHandle: (state, action) => {
      // console.log(state.qty);
      // console.log(action.payload)
      state.qty = state.qty + action.payload;
      window.localStorage.setItem("cartQuantity", state.qty);
    },
  },
});

// Action creators are generated for each case reducer function
export const { cartAdd, cartClear, cartQuantityHandle } = cartSlice.actions;

export default cartSlice.reducer;
