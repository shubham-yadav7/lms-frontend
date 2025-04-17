import React, { useEffect, useState } from "react";
import { HiFilter } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import CourseCard from "../commonComponents/CourseCard";
import { setFilterData, setShowFilterNav } from "../../store/courseSlice";
import { levels, price, rating } from "./courseFilter";
import FilterOptionRadio from "../helpComponents/FilterOptionRadio";
import FilterOptionCheckbox from "../helpComponents/FilterOptionCheckbox";
import notification from "../../helpers/notification";
import CourseServices from "../../auth/services/CourseServices"; // ✅ import service

const Listing = () => {
  const { showFilterNav, courseLanguages, courseCategories, filterData } =
    useSelector((state) => state.course);
  const dispatch = useDispatch();

  const [courses, setCourses] = useState([]); // ✅ local courses state

  const fetchCourses = async () => {
    try {
      const { courses } = await CourseServices.fetchCourses(); // same as Home
      setCourses(courses);
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

  useEffect(() => {
    fetchCourses();
  }, []);

  const onChangeHandler = (e) => {
    let filterName = e.target.name;
    switch (filterName) {
      case "languages": {
        if (e.target.checked) {
          dispatch(
            setFilterData({
              languages: [...filterData.languages, e.target.value],
            })
          );
        } else {
          const index = filterData?.languages.indexOf(e.target.value);
          let _selectedLanguages = [...filterData?.languages];
          _selectedLanguages.splice(index, 1);
          dispatch(setFilterData({ languages: _selectedLanguages }));
        }
        break;
      }
      case "categories": {
        if (e.target.checked) {
          dispatch(
            setFilterData({
              categories: [...filterData.categories, e.target.value],
            })
          );
        } else {
          const index = filterData?.categories.indexOf(e.target.value);
          let _selectedCategories = [...filterData?.categories];
          _selectedCategories.splice(index, 1);
          dispatch(setFilterData({ categories: _selectedCategories }));
        }
        break;
      }
      case "levels": {
        if (e.target.checked) {
          dispatch(
            setFilterData({ levels: [...filterData.levels, e.target.value] })
          );
        } else {
          const index = filterData?.levels.indexOf(e.target.value);
          let _selectedLevels = [...filterData?.levels];
          _selectedLevels.splice(index, 1);
          dispatch(setFilterData({ levels: _selectedLevels }));
        }
        break;
      }
      case "rating": {
        dispatch(setFilterData({ rating: e.target.value }));
        break;
      }
      case "price": {
        dispatch(setFilterData({ price: e.target.value }));
        break;
      }
      default: {
        notification("warning", "Please Apply valid filters");
      }
    }
  };

  const handleReset = () => {
    dispatch(
      setFilterData({
        languages: [],
        categories: [],
        levels: [],
        rating: "",
        price: "",
      })
    );
  };

  return (
    <div className="filter-parameter mt-3">
      <div className="container">
        <div className="popular-courses listing-page">
          <div className="row">
            {courses?.map((course, i) => (
              <div key={i} className="col-lg-4 col-md-6 mt-5">
                <CourseCard course={course} />
              </div>
            ))}
          </div>
          <div className="fixed-filter-btn" id="filter-btn-fix">
            <button
              className="redirect-link"
              onClick={() => {
                dispatch(setShowFilterNav(!showFilterNav));
              }}
            >
              <HiFilter /> Filter
            </button>
          </div>
        </div>
        <div
          className={`filter-side-nav ${
            showFilterNav ? "show-filter-nav" : ""
          } `}
        >
          <h4 className="filter-title">Filters</h4>
          <div className="filter-nav-wrap">
            <form id="filter-form">
              <FilterOptionCheckbox
                title="languages"
                data={courseLanguages}
                onChangeHandler={onChangeHandler}
                filterData={filterData}
              />
              <FilterOptionCheckbox
                title="categories"
                data={courseCategories}
                onChangeHandler={onChangeHandler}
                filterData={filterData}
              />
              <FilterOptionCheckbox
                title="levels"
                data={levels}
                onChangeHandler={onChangeHandler}
                filterData={filterData}
              />
              <FilterOptionRadio
                title="rating"
                data={rating}
                onChangeHandler={onChangeHandler}
                filterData={filterData}
              />
              <FilterOptionRadio
                title="price"
                data={price}
                onChangeHandler={onChangeHandler}
                filterData={filterData}
              />
              <div className="filter-btn-wrap d-flex align-items-center mt-4">
                <button
                  type="button"
                  className="custom-btn filled mr-4"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
          <div
            className="side-nav-close"
            onClick={() => dispatch(setShowFilterNav(!showFilterNav))}
          >
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listing;
