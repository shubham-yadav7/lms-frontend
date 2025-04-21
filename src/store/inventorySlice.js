import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import InventoryServices from "../auth/services/InventoryServices";
import notification from "../helpers/notification";

export const STATUS = Object.freeze({
  SUCCESS: "success",
  ERROR: "error",
  LOADING: "loading",
});

// Fetch Cart
export const fetchCart = createAsyncThunk(
  "user/cart",
  async (_, { getState }) => {
    try {
      // Access values from current state
      const state = getState();
      const { coupon = '' } = state.inventory;

      const res = await InventoryServices.fetchCart(coupon);
      return res;
    } catch (error) {
      console.log(error);
      notification(
        "error",
        error.response ? error.response.data.message : "Something went wrong"
      );
    }
  }
);

// Fetch coupons
export const fetchCoupons = createAsyncThunk("inventory/coupon", async (coupon) => {
  try {
    // TODO: fetch coupons for independent user
    const { coupons } = await InventoryServices.fetchCoupons();
    return coupons;
  } catch (error) {
    console.log(error);
    notification(
      "error",
      error.response ? error.response.data.message : "Something went wrong."
    );
  }
});

const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    cart: [],
    coupons: [],
    state: STATUS.SUCCESS,
    isFetchCoupon: false,
    coupon: "",
    cartSummary: {
      gst: 0,
      cartTotal: 0,
      grandTotal: 0,
    },
  },
  reducers: {
    setCart(state, action) {
      state.cart = [...state.cart, action.payload];
    },
    setCartSummary(state, action) {
      state.cartSummary = { ...state.cartSummary, ...action.payload };
    },
    setCoupons(state, action) {
      state.coupons = action.payload;
    },
    setCoupon(state, action) {
      state.coupon = action.payload;
    },
    setIsFetchCoupon(state, action) {
      state.isFetchCoupon = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state, action) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        const { cartItems, gst, cartTotal, grandTotal } = action.payload;
        state.cart = cartItems;
        state.cartSummary = {
          ...state.cartSummary,
          gst,
          cartTotal,
          grandTotal,
          cartItems
        };
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = STATUS.ERROR;
      })
      .addCase(fetchCoupons.pending, (state, action) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchCoupons.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.coupons = action.payload;
      })
      .addCase(fetchCoupons.rejected, (state, action) => {
        state.status = STATUS.ERROR;
      });
  },
});

export const {
  setCart,
  setCartSummary,
  setRatingDetails,
  setRatingShow,
  setCoupons,
  setCoupon,
  setIsFetchCoupon,
} = inventorySlice.actions;

export default inventorySlice.reducer;
