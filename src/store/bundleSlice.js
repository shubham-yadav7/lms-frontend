import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import notification from "../helpers/notification.js";
import BundleServices from "../auth/services/BundleServices.js";

export const STATUS = Object.freeze({
  SUCCESS: "success",
  ERROR: "error",
  LOADING: "loading",
});

export const fetchBundles = createAsyncThunk("bundle/list", async (data) => {
  try {
    const res = await BundleServices.getAllBundles(data);
    return res;
  } catch (error) {
    console.log(error);
    notification(
      "error",
      error.response
        ? error.response.data.message.split(":")[0]
        : "Something went wrong."
    );
  }
});

const bundleSlice = createSlice({
  name: "bundle",
  initialState: {
    courseBundles: [],
    courseCategories: [],
    courseLanguages: [],
    status: STATUS.SUCCESS,
    filterData: {
      languages: [],
      categories: [],
      levels: [],
      rating: "",
      price: "",
      sort: "",
    },
    showFilterNav: false,
    paginate: {
      page: 1,
      perPage: 0,
      total: 0,
      totalBundles: 0,
    },
  },
  reducers: {
    setBundles(state, action) {
      state.bundleCourses = action.payload;
    },
    setFilterData(state, action) {
      state.filterData = { ...state.filterData, ...action.payload };
    },
    setShowFilterNav(state, action) {
      state.showFilterNav = action.payload;
    },
    setPaginate(state, action) {
      // need to check
      state.paginate = { ...state.paginate, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBundles.pending, (state, action) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchBundles.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = STATUS.SUCCESS;

          const {
            courseBundles,
            courseCategories,
            courseLanguages,
            page,
            perPage,
            total,
            totalBundles,
          } = action.payload;

          state.courseBundles = courseBundles;
          state.courseCategories = courseCategories;
          state.courseLanguages = courseLanguages;
          state.paginate = {
            ...state.paginate,
            ...{ page, perPage, total, totalBundles },
          };
        }
      })
      .addCase(fetchBundles.rejected, (state, action) => {
        state.status = STATUS.ERROR;
      });
  },
});

export const { setBundles, setFilterData, setPaginate, setShowFilterNav } =
  bundleSlice.actions;
export default bundleSlice.reducer;
