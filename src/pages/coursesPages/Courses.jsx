import React, { lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../store/courseSlice";

const PageHeader = lazy(() =>
  import("../../components/commonComponents/PageHeader")
);
const FilterAndList = lazy(() =>
  import("../../components/courseComponents/FilterAndList.jsx")
);

const Courses = () => {
  const dispatch = useDispatch();
  const {
    filterData,
    paginate: { page },
  } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(fetchCourses({ ...filterData, page, type: "learner" }));
  }, [dispatch, filterData, page]);

  return (
    <>
      <PageHeader type="All Courses" />
      <FilterAndList />
    </>
  );
};

export default Courses;
