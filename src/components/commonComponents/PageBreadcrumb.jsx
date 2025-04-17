import React from "react";
import { Link } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";

const PageBreadcrumb = ({ pageTitle, prevPage, currentPage }) => {
  return (
    <section className="page-bredcrumb">
      <div className="container">
        <div className="detail-page-breadcrumb all-page">
          <div className="current-page">
            <h4>{pageTitle}</h4>
          </div>
          <ol className="breadcrumb flex-wrap">
            <li className="breadcrumb-item">
              <Link to="FIXME:">Home</Link>
            </li>
            <BiChevronRight />
            <li className="breadcrumb-item">
              <Link to="FIXME:">{currentPage}</Link>
            </li>
            {/* <BiChevronRight /> */}
            {/* <li className="breadcrumb-item active"></li> */}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default PageBreadcrumb;
