import React from "react";
import { Link } from "react-router-dom";
import { RiCalendar2Line } from "react-icons/ri";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import moment from "moment";

const HelpCard = ({ helpDetails }) => {
  return (
    <>
      {helpDetails && (
        <div className="course-item my-3">
          <Link to={`/help/${helpDetails.slug}`}>
            <figure className="mb-0">
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/uploads/help/posterImage/${helpDetails.posterImage}`}
                alt=""
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src =
                    "/assets/images/common/image-placeholder.webp";
                }}
              />
            </figure>
          </Link>

          <div className="course-content">
            <div className="course-details-wrap">
              <div className="course-detail">
                <img
                  src="/assets/images/homepage/courses/clipboard_icon.png"
                  alt=""
                />
                <span>Help</span>
              </div>
            </div>
            <Link
              to={`/help/${helpDetails.slug}`}
              className="course-title d-block"
            >
              <h4>
                {(helpDetails?.title).length > 40
                  ? `${(helpDetails?.title).substring(0, 40)}...`
                  : helpDetails?.title}
              </h4>
            </Link>

            <div className="course-price-wrap pt-3">
              <div className="course-price">
                <span>
                  {" "}
                  <RiCalendar2Line />{" "}
                  {moment(helpDetails.createdAt).format("DD MMM, YYYY")}{" "}
                </span>
              </div>
              <div className="course-rating blog-link">
                <Link
                  className="flex-direction-row"
                  to={`/help/${helpDetails.slug}`}
                >
                  Read More <HiOutlineArrowSmRight />{" "}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HelpCard;
