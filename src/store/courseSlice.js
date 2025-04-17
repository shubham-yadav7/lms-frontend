import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CourseServices from "../auth/services/CourseServices.js";
import notification from "../helpers/notification.js";

export const STATUS = Object.freeze({
  SUCCESS: "success",
  ERROR: "error",
  LOADING: "loading",
});

// Fetch Course Categories
export const fetchCoursesCategories = createAsyncThunk(
  "course/categories",
  async () => {
    const { courseCategories } = await CourseServices.fetchCoursesCategories();
    return courseCategories;
  }
);

export const fetchCourses = createAsyncThunk("courses/list", async (data) => {
  const res = await CourseServices.fetchCoursesWithPagination(data);
  return res;
});

export const startCourse = async (id) => {
  try {
    // TODO: Pending controller
    const res = await CourseServices.startCourse(id);
    window.location = `/view/${res.id}`;
  } catch (error) {
    console.log(error);
    notification(
      "error",
      error.response
        ? error.response.data.message.split(":")[0]
        : "Something went wrong."
    );
  }
};

const courseSlice = createSlice({
  name: "course",
  initialState: {
    courses: [],
    downloadableCourses: [],
    pendriveCourses: [],
    bookCourses: [],
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
      totalCourses: 0,
    },
  },
  reducers: {
    setCourses(state, action) {
      state.courses = action.payload;
    },
    setDownloadableCourses(state, action) {
      state.downloadableCourses = action.payload;
    },
    setPendriveCourses(state, action) {
      state.pendriveCourses = action.payload;
    },
    setBookCourses(state, action) {
      state.bookCourses = action.payload;
    },
    setCourseCategories(state, action) {
      state.courseCategories = action.payload;
    },
    setCourseLanguage(state, action) {
      state.courseLanguages = action.payload;
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
      .addCase(fetchCoursesCategories.pending, (state, action) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchCoursesCategories.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.courseCategories = action.payload;
      })
      .addCase(fetchCoursesCategories.rejected, (state, action) => {
        state.status = STATUS.ERROR;
      })
      .addCase(fetchCourses.pending, (state, action) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        const {
          courses,
          courseCategories,
          courseLanguages,
          // search,
          page,
          perPage,
          total,
          totalCourses,
        } = action.payload;
        state.courses = courses;
        state.courseCategories = courseCategories;
        state.courseLanguages = courseLanguages;
        state.paginate = {
          ...state.paginate,
          ...{ page, perPage, total, totalCourses },
        };
        // Add search
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = STATUS.ERROR;
      });
  },
});

export const {
  setCourses,
  setDownloadableCourses,
  setPendriveCourses,
  setBookCourses,
  setCourseCategories,
  setCourseLanguage,
  setFilterData,
  setShowFilterNav,
  setPaginate,
} = courseSlice.actions;

export default courseSlice.reducer;
