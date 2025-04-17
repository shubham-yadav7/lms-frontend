import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import moment from "moment";
import { RiCalendar2Line } from "react-icons/ri";

const BlogsCardItem = ({ blogDetails }) => {
  return (
    <>
      {blogDetails && (
        <div className="course-item">
          <Link to={`/blog/${blogDetails.slug}`}>
            <figure className="mb-0">
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/uploads/blog/thumbnail/${blogDetails.thumbImg}`}
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
                <span>{blogDetails?.category.title}</span>
              </div>
            </div>
            <Link
              to={`/blog/${blogDetails.slug}`}
              className="course-title d-flex align-items-center"
            >
              <h4>
                {(blogDetails?.title).length > 40
                  ? `${(blogDetails?.title).substring(0, 40)}...`
                  : blogDetails?.title}
              </h4>
            </Link>

            <div className="course-price-wrap pt-3">
              <div className="course-price">
                <span>
                  {" "}
                  <RiCalendar2Line />{" "}
                  {moment(blogDetails.createdAt).format("DD MMM, YYYY")}{" "}
                </span>
              </div>
              <div className="course-rating blog-link">
                <Link
                  className="flex-direction-row"
                  to={`/blog/${blogDetails.slug}`}
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

export default BlogsCardItem;
