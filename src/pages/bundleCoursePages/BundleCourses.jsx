import React, { useEffect } from "react";
import PageHeader from "../../components/commonComponents/PageHeader";
import BundleCoursesList from "../../components/bundleComponents/BundleCoursesList.jsx";
import BundleFilterNav from "../../components/bundleComponents/BundleFilterNav.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchBundles, setPaginate } from "../../store/bundleSlice";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import ReactPaginate from "react-paginate";

// Lazy load components

const BundleCourses = () => {
  const dispatch = useDispatch();
  const {
    filterData,
    paginate: { page, total, perPage },
  } = useSelector((state) => state.bundle);

  const handlePageClick = ({ selected }) => {
    dispatch(setPaginate({ page: Number(selected) + 1 }));
  };

  useEffect(() => {
    dispatch(fetchBundles({ ...filterData, page, type: "learner" }));
  }, [dispatch, filterData, page]);

  return (
    <>
      <PageHeader type="Bundle Courses" />
      <section>
        <BundleFilterNav />
        <BundleCoursesList />
        {total > 1 && (
          <div className="d-flex justify-content-center align-items-center mt-5">
            <ReactPaginate
              breakLabel="..."
              nextLabel={<AiOutlineRight />}
              onPageChange={handlePageClick}
              pageRangeDisplayed={perPage}
              pageCount={total}
              previousLabel={<AiOutlineLeft />}
              className="pagination"
              renderOnZeroPageCount={null}
            />
          </div>
        )}
      </section>
    </>
  );
};

export default BundleCourses;
