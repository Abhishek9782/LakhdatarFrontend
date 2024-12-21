import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";
import favProductSlice from "./FavPSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    carts: cartReducer,
    favprod: favProductSlice,
  },
});
