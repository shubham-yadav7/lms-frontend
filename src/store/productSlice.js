import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import notification from "../helpers/notification.js";
import ProductServices from "../auth/services/ProductServices.js";

export const STATUS = Object.freeze({
  SUCCESS: "success",
  ERROR: "error",
  LOADING: "loading",
});

export const fetchProducts = createAsyncThunk("products/list", async (data) => {
  try {
    const res = await ProductServices.fetchAllProducts(data);
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

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    productCategories: [],
    productLanguages: [],
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
    setProducts(state, action) {
      state.products = action.payload;
    },
    setProductCategories(state, action) {
      state.productCategories = action.payload;
    },
    setProductLanguages(state, action) {
      state.productLanguages = action.payload;
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
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = STATUS.SUCCESS;
          const {
            products,
            productCategories,
            courseLanguages,
            page,
            perPage,
            total,
            totalProducts,
          } = action.payload;

          state.products = products;
          state.productCategories = productCategories;
          state.productLanguages = courseLanguages;
          state.paginate = {
            ...state.paginate,
            ...{ page, perPage, total, totalProducts },
          };
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = STATUS.ERROR;
      });
  },
});

export const {
  setProducts,
  setProductCategories,
  setProductLanguages,
  setFilterData,
  setShowFilterNav,
  setPaginate,
} = productSlice.actions;

export default productSlice.reducer;
