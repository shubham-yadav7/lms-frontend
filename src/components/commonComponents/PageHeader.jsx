import React from "react";
import { Link } from "react-router-dom";
import { BsChevronRight } from "react-icons/bs";

const PageHeader = ({ type, blogPage }) => {
  return (
    <section className="page-header py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="heading center">
              <h2 className={blogPage}>{type}</h2>

              <div className="breadcrumb-wrap">
                <ol className="breadcrumb flex-wrap">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <BsChevronRight />
                  <li className="breadcrumb-item active" title={type}>
                    {type?.length > 35 ? `${type?.substring(0, 35)}...` : type}
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="plus moving-elem">
        <img
          className="spin"
          src="assets/images/homepage/benefits/benefits_add.png"
          alt=""
        />
      </div>
      <div className="spiral moving-elem">
        <img
          className="circleLeftRight"
          src="assets/images/homepage/benefits/spiral_icon.png"
          alt=""
        />
      </div>
    </section>
  );
};

export default PageHeader;
