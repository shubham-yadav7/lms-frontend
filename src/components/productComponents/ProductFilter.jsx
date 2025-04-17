import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilterData, setShowFilterNav } from "../../store/productSlice";
import { BsFilter, BsChevronDown } from "react-icons/bs";
import { MdSort } from "react-icons/md";

const ProductFilter = () => {
  const {
    paginate: { totalProducts },
    showFilterNav,
  } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const [isSortOpen, setIsSortOpen] = useState(false);

  const handleSort = (sort) => {
    dispatch(setFilterData({ sort }));
  };

  return (
    <div className="filter-nav">
      <div className="container">
        <div className="filter-menu">
          <div className="row">
            <div className="col-lg-8">
              <div className="d-flex align-items-lg-center flex-column flex-sm-row">
                <div>
                  <div
                    className="filter-count-wrap"
                    id="filter-btn"
                    onClick={() => dispatch(setShowFilterNav(!showFilterNav))}
                  >
                    <BsFilter />
                    <span>Filter</span>
                  </div>
                </div>
                <div className="filter-text">
                  <p>
                    We found <b>{totalProducts}</b> courses available for you
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mt-0 mt-sm-3 mt-lg-0">
              <div className="sort-by-wrap">
                <div className="sort-by">
                  <MdSort />
                  <span>Sort By :</span>
                  <span
                    className="d-flex align-items-center"
                    onClick={() => setIsSortOpen(!isSortOpen)}
                  >
                    <b>Select an option</b>
                    <BsChevronDown
                      className={`dropDown-arrow ${isSortOpen ? "up" : ""}`}
                    />
                  </span>
                  <div
                    className={`sort-by-dropdown product_sort ${
                      isSortOpen ? "show-sort-dropdown" : ""
                    }`}
                  >
                    <ul>
                      <li onClick={() => handleSort("discountedPrice_1")}>
                        <span>Price - Low to High</span>
                      </li>
                      <li onClick={() => handleSort("discountedPrice_-1")}>
                        <span>Price - High to Low</span>
                      </li>
                      <li onClick={() => handleSort("averageRating_-1")}>
                        <span>highest rated</span>
                      </li>
                      <li onClick={() => handleSort("createdAt_-1")}>
                        <span>Newest</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
