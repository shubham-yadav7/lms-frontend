import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthServices from "../auth/services/AuthServices";

export const STATUS = Object.freeze({
  SUCCESS: "success",
  ERROR: "error",
  LOADING: "loading",
});

// Fetch User
export const fetchUser = createAsyncThunk("user/fetch", async () => {
  const { learner: user } = await AuthServices.fetchUser();
  return user;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    user: null,
    isUserFetched: false,
    signUpShow: false,
    signInShow: false,
    profileDeleteShow: false,
    forgotPasswordShow: false,
    status: STATUS.SUCCESS,
  },
  reducers: {
    setSignUpShow(state, action) {
      state.signUpShow = action.payload;
    },
    setSignInShow(state, action) {
      state.signInShow = action.payload;
    },
    setForgotPasswordShow(state, action) {
      state.forgotPasswordShow = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setProfileDeleteShow(state, action) {
      state.profileDeleteShow = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = STATUS.ERROR;
      });
  },
});

export const {
  setSignUpShow,
  setSignInShow,
  setForgotPasswordShow,
  setUser,
  setToken,
  setProfileDeleteShow,
} = authSlice.actions;

export default authSlice.reducer;
