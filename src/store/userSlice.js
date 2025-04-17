import { createSlice } from "@reduxjs/toolkit";
// import AuthServices from "../auth/services/AuthServices";

export const STATUS = Object.freeze({
  SUCCESS: "success",
  ERROR: "error",
  LOADING: "loading",
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    purchasedCourses: [],
    purchasedBundles: [],
    purchasedProducts: [],
    status: STATUS.SUCCESS,
  },
  reducers: {
    setPurchasedCourses(state, action) {
      state.purchasedCourses = [...state.purchasedCourses, action.payload];
    },
    setPurchasedBundles(state, action) {
      state.purchasedBundles = [...state.purchasedBundles, action.payload];
    },
    setPurchasedProducts(state, action) {
      state.purchasedProducts = [...state.purchasedProducts, action.payload];
    },
  },
});

export const { setPurchasedCourses, setPurchasedBundles, setPurchasedProducts } = userSlice.actions;

export default userSlice.reducer;
