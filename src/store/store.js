import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import courseReducer from "./courseSlice";
import inventoryReducer from "./inventorySlice";
import bundleReducer from "./bundleSlice";
import productReducer from "./productSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    // Add reducer here
    auth: authReducer,
    course: courseReducer,
    inventory: inventoryReducer,
    bundle: bundleReducer,
    product: productReducer,
    user: userReducer,
  },
});

export default store;
