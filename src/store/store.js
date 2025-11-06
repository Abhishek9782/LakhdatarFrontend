import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";
import favProductSlice from "./FavPSlice";
import AdminSlice from "./adminSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    admin: AdminSlice,
    carts: cartReducer,
    favprod: favProductSlice,
  },
});
