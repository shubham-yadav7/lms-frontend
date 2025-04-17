import React, { lazy } from "react";
import ReactPaginate from "react-paginate";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setPaginate } from "../../store/courseSlice";

const FilterNav = lazy(() => import("../courseComponents/FilterNav.jsx"));
const Listing = lazy(() => import("../courseComponents/Listing.jsx"));

const FilterAndList = () => {
  const { paginate } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const handlePageClick = ({ selected }) => {
    dispatch(setPaginate({ page: Number(selected) + 1 }));
  };

  return (
    <section className="filter py-5">
      <FilterNav />
      <Listing />
      {paginate?.total > 1 && (
        <div className="d-flex justify-content-center align-items-center mt-5">
          <ReactPaginate
            breakLabel="..."
            nextLabel={<AiOutlineRight />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={paginate?.perPage}
            pageCount={paginate?.total}
            previousLabel={<AiOutlineLeft />}
            className="pagination"
            renderOnZeroPageCount={null}
          />
        </div>
      )}
    </section>
  );
};

export default FilterAndList;
