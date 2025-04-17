import React from "react";
import { HiFilter } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import notification from "../../helpers/notification";
import ProductCard from "../commonComponents/ProductCard.jsx";
import { setFilterData, setShowFilterNav } from "../../store/productSlice";
import { levels, price, rating } from "../courseComponents/courseFilter";
import FilterOptionRadio from "../helpComponents/FilterOptionRadio";
import FilterOptionCheckbox from "../helpComponents/FilterOptionCheckbox";

const ProductListing = () => {
  const {
    products,
    showFilterNav,
    productLanguages,
    productCategories,
    filterData,
  } = useSelector((state) => state.product);

  const dispatch = useDispatch();

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
            {products?.map((product, i) => (
              <div key={i} className="col-lg-4 col-md-6 mt-5">
                <ProductCard product={product} />
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
                data={productLanguages}
                onChangeHandler={onChangeHandler}
                filterData={filterData}
              />
              <FilterOptionCheckbox
                title="categories"
                data={productCategories}
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
                {/* <button type="submit" className="custom-btn filled">
              Apply
            </button> */}
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

export default ProductListing;
