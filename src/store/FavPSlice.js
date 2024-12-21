import { createSlice } from "@reduxjs/toolkit";

//  THis is opur intial state

const initialState = {
  favProduct: JSON.parse(window.localStorage.getItem("favProduct")) || [],
};

export const favProductSlice = createSlice({
  name: "FavProducts",
  initialState,
  reducers: {
    FavCheck: (state, action) => {
      state.favProduct = action.payload;
      window.localStorage.setItem("favProduct", JSON.stringify(action.payload));
      console.log("fav slice");
    },
  },
});

// Action creators are generated for each case reducer function
export const { FavCheck } = favProductSlice.actions;

export default favProductSlice.reducer;
