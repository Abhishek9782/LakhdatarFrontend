import { createSlice } from "@reduxjs/toolkit";
import calculateCartSummary from "../utils/helperFunction";

const initialState = {
  carts: JSON.parse(localStorage.getItem("carts")) || [],
  qty: JSON.parse(localStorage.getItem("cartQuantity")) || 0,
  charges: JSON.parse(localStorage.getItem("charges")) || {
    subtotal: 0,
    deliveryFees: 0,
    platformFees: 0,
    gst: 0,
    discount: 0,
    finalAmount: 0,
  },
  loading: false,
  error: null,
};

export const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    cartAdd: (state, action) => {
      const newProduct = action.payload;
      // Check if item with same _id and quantity ("half"/"full") already exists
      const exists = state.carts.find(
        (item) =>
          item._id === newProduct._id && item.quantity === newProduct.quantity
      );

      if (exists) {
        // If exists, increase its qty
        state.carts = state.carts.map((item) =>
          item._id === newProduct._id && item.quantity === newProduct.quantity
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      } else {
        // Add new product with qty 1
        state.carts.push({ ...newProduct, qty: 1 });
      }

      // Update cart total quantity
      state.qty += 1;

      let total = calculateCartSummary(state.carts);
      // Sync with localStorage
      localStorage.setItem("carts", JSON.stringify(state.carts));
      localStorage.setItem("cartQuantity", state.qty);
      localStorage.setItem("charges", JSON.stringify(total));

      state.loading = false;
      state.error = null;
    },
    setCharges: (state, action) => {
      state.charges = action.payload;
      localStorage.setItem("charges", JSON.stringify(action.payload));
    },

    cartClear: (state) => {
      state.carts = [];
      state.qty = 0;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("carts");
      localStorage.removeItem("cartQuantity");
    },
    increaseQuantity: (state, action) => {
      const updatedCarts = state.carts.map((prod) =>
        prod._id === action.payload ? { ...prod, qty: prod.qty + 1 } : prod
      );

      state.carts = updatedCarts;
      state.qty += 1;

      const total = calculateCartSummary(state.carts);
      state.charges = total; // ✅ Update Redux charges

      localStorage.setItem("carts", JSON.stringify(state.carts));
      localStorage.setItem("charges", JSON.stringify(total));
      localStorage.setItem("cartQuantity", JSON.stringify(state.qty));
    },

    decreaseQuantity: (state, action) => {
      let itemRemoved = false;

      const updatedCarts = state.carts.reduce((acc, prod) => {
        if (prod._id === action.payload) {
          if (prod.qty > 1) {
            acc.push({ ...prod, qty: prod.qty - 1 });
          } else {
            itemRemoved = true;
          }
        } else {
          acc.push(prod);
        }
        return acc;
      }, []);

      state.carts = updatedCarts;
      state.qty = itemRemoved ? state.qty - 1 : state.qty - 1;

      const total = calculateCartSummary(state.carts);
      state.charges = total; // ✅ Update Redux charges

      localStorage.setItem("carts", JSON.stringify(state.carts));
      localStorage.setItem("charges", JSON.stringify(total));
      localStorage.setItem("cartQuantity", JSON.stringify(state.qty));
    },

    cartQuantityHandle: (state, action) => {
      const newQty = state.qty + action.payload;
      state.qty = newQty < 0 ? 0 : newQty;
      localStorage.setItem("cartQuantity", state.qty);
    },
    setCartQuantity: (state, action) => {
      state.qty = action.payload;
      localStorage.setItem("cartQuantity", state.qty);
    },
  },
});

export const {
  cartAdd,
  cartClear,
  cartQuantityHandle,
  increaseQuantity,
  decreaseQuantity,
  setCartQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
