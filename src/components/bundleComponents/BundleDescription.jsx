import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdCheck } from "react-icons/md";
import { BsStarFill, BsStar } from "react-icons/bs";
import { FiMonitor } from "react-icons/fi";
import {
  MdOutlineFilterList,
  MdOutlineWatchLater,
  MdOutlineLanguage,
} from "react-icons/md";
import { RiBookmarkLine } from "react-icons/ri";
import ReactPaginate from "react-paginate";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import BundleServices from "../../auth/services/BundleServices";
import StarRating from "../helpComponents/StarRating";
import notification from "../../helpers/notification";

const BundleDescription = ({ details, myRef, reviewsCount }) => {
  // Auth Reducer for cart and other functionality
  const navigate = useNavigate();

  // Handle cart function
  return (
    <section className="course-description pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="course-side-card-details mb-5">
              <div className="course-pricing">
                <h4>
                  ₹{details?.discountedPrice}
                  <span className="actual-price">₹{details?.price}</span>
                </h4>
                <p className="offer">
                  {100 -
                    (
                      (details?.discountedPrice / details?.price) *
                      100
                    ).toFixed()}
                  % off
                </p>
              </div>

              <div className="course-card-details">
                <ul>
                  <li>
                    <div className="detail-type">
                      <p>
                        <MdOutlineFilterList />
                        Level
                      </p>
                    </div>
                    <div className="detail-value">
                      <p className="text-capitalize">{details?.level}</p>
                    </div>
                  </li>
                  <li>
                    <div className="detail-type">
                      <p>
                        <FiMonitor />
                        Lessons
                      </p>
                    </div>
                    <div className="detail-value">
                      <p>{details?.courses?.length}</p>
                    </div>
                  </li>
                  <li>
                    <div className="detail-type">
                      <p>
                        <MdOutlineWatchLater />
                        Duration
                      </p>
                    </div>
                    <div className="detail-value">
                      <p>{details?.duration?.inWords}</p>
                    </div>
                  </li>

                  <li>
                    <div className="detail-type">
                      <p>
                        <MdOutlineLanguage />
                        Language
                      </p>
                    </div>
                    <div className="detail-value">
                      <p>
                        {details?.language?.map((lang) => lang.name)?.join(",")}
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="detail-type">
                      <p>
                        <RiBookmarkLine />
                        Access
                      </p>
                    </div>
                    <div className="detail-value">
                      <p>
                        {details?.access === 0 && <span>LifeTime</span>}
                        {details?.access === 1 && <span>1 Year</span>}
                        {details?.access === 2 && <span>2 Year</span>}
                      </p>
                    </div>
                  </li>
                  {/* <li>
                                   <div className="detail-type">
                                     <p>
                                        <BsTrophy />
                                        Certificate
                                    </p>
                                   </div>
                                   <div className="detail-value">
                                        <p>
                                        Yes
                                        </p>
                                   </div>
                               </li>
                               <li>
                                   <div className="detail-type">
                                     <p>
                                        <IoDocumentTextOutline />
                                        Recourse
                                    </p>
                                   </div>
                                   <div className="detail-value">
                                        <p>
                                        5 Downloadable Files
                                        </p>
                                   </div>
                               </li> */}
                </ul>
              </div>
              {/* {!user?.purchasedCourseBundles?.includes(
                details?._id.toString()
              ) ? (
                <div className="course-action-btn">
                  {!cart?.find((c) => c.productId == details?._id) ? (
                    <button
                      className="custom-btn cart"
                      onClick={() => handleCart(details?._id)}
                    >
                      Add to cart
                    </button>
                  ) : (
                    <button
                      className="custom-btn cart"
                      onClick={() => history("/cart")}
                    >
                      Go to cart
                    </button>
                  )}
                  {user?.cart?.find(
                    (item) => item.item === details?._id.toString()
                  ) ? (
                    <button
                      style={{ width: "100%" }}
                      className="custom-btn cart"
                      onClick={() => history("/cart")}
                    >
                      Go To Cart
                    </button>
                  ) : (
                    <button
                      style={{ width: "100%" }}
                      className="custom-btn cart"
                      onClick={() => handleCart(details._id)}
                    >
                      Add To Cart
                    </button>
                  )}
                  <button className="custom-btn filled">Buy Now</button>
                </div>
              ) : (
                <div className="course-action-btn">
                  <Link
                    to={`/bundle/${details.bundleCompletion}/courses`}
                    className="custom-btn filled"
                    style={{ width: "100%" }}
                  >
                    Start Bundle
                  </Link>
                </div>
              )} */}
            </div>
            <div className="course-basic-info">
              <div className="topic-title">
                <h4> Course Description</h4>
                <div
                  className="embed-html"
                  dangerouslySetInnerHTML={{ __html: details?.description }}
                ></div>
              </div>
            </div>
            <div className="course-benefits filled-section mt-5">
              <div className="topic-title">
                <h4>Course Benefits</h4>
              </div>
              <div className="benefits-wrap">
                <ul>
                  {details?.benefits?.map((benefit, i) => (
                    <li key={i}>
                      <MdCheck /> {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="material-includes mt-5">
              <div className="topic-title">
                <h4>Materials Include</h4>
                <ul>
                  {details?.materialsIncludes?.map((material, i) => (
                    <li key={i}>{material}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="topic-title mt-5">
              <h4>Courses Included</h4>
            </div>
            <div className="bundle-courses-list mt-3">
              {details?.courses.map((course) => (
                <div key={course?._id} className="row align-items-center mb-2">
                  <div className="col-lg-3">
                    <img
                      src={`${process.env.REACT_APP_BACKEND_URL}/uploads/courses/thumbnails/${course.thumbnailImage}`}
                      style={{
                        width: "150px",
                        maxHeight: "90px",
                        objectFit: "cover",
                      }}
                      alt=""
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src =
                          "/assets/images/common/image-placeholder.webp";
                      }}
                    />
                  </div>
                  <div className="col-lg-9">
                    <div className="text-wrapper">
                      <Link to={`/course/${course.slug}`}>
                        <span
                          className="h2"
                          style={{
                            fontSize: "18px",
                            fontWeight: 500,
                            color: "#0e3e64",
                            marginBottom: "6px",
                          }}
                        >
                          {course.title}
                        </span>
                      </Link>
                      <p>
                        {course.excerpt.length > 50
                          ? `${course.excerpt.slice(0, 50)}...`
                          : course.excerpt}
                      </p>
                      <p>
                        ({course?.avgRating ? course?.avgRating : 0.0} Ratings)
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="feedback-wrap mt-5" ref={myRef}>
              <div className="topic-title">
                <h4>Student Feedback</h4>
              </div>
              <div className="student-rating-wrap">
                <div className="rating-count">
                  <div className="total-rating">
                    <h2>{details?.avgRating?.toFixed(1) || 0}</h2>
                  </div>
                  <div className="rating-stars">
                    <span>
                      <BsStarFill />
                      <BsStarFill />
                      <BsStarFill />
                      <BsStarFill />
                      <BsStarFill />
                    </span>
                    {/* <StarRating rating={details?.avgRating} /> */}
                    <span className="mt-1 inWords">
                      {details?.reviews?.length || 0} Rating
                    </span>
                  </div>
                </div>
                <div className="review-rating-wrap">
                  <div className="review-rating">
                    <div className="stars">
                      <BsStarFill />
                      <BsStarFill />
                      <BsStarFill />
                      <BsStarFill />
                      <BsStarFill />
                    </div>
                    <div className="progress">
                      <span
                        style={{
                          width: `${
                            (reviewsCount["5"] / details?.reviews?.length) * 100
                          }%`,
                        }}
                      ></span>
                    </div>
                    <div className="percents">
                      <p>
                        {`${
                          reviewsCount["5"]
                            ? (
                                (reviewsCount["5"] / details?.reviews?.length) *
                                100
                              ).toFixed(1)
                            : 0
                        }`}
                        %
                      </p>
                    </div>
                  </div>
                  <div className="review-rating">
                    <div className="stars">
                      <BsStarFill />
                      <BsStarFill />
                      <BsStarFill />
                      <BsStarFill />
                      <BsStar />
                    </div>
                    <div className="progress">
                      <span
                        style={{
                          width: `${
                            (reviewsCount["4"] / details?.reviews?.length) * 100
                          }%`,
                        }}
                      ></span>
                    </div>
                    <div className="percents">
                      <p>
                        {`${
                          reviewsCount["4"]
                            ? (
                                (reviewsCount["4"] / details?.reviews?.length) *
                                100
                              ).toFixed(1)
                            : 0
                        }`}
                        %
                      </p>
                    </div>
                  </div>
                  <div className="review-rating">
                    <div className="stars">
                      <BsStarFill />
                      <BsStarFill />
                      <BsStarFill />
                      <BsStar />
                      <BsStar />
                    </div>
                    <div className="progress">
                      <span
                        style={{
                          width: `${
                            (reviewsCount["3"] / details?.reviews?.length) * 100
                          }%`,
                        }}
                      ></span>
                    </div>
                    <div className="percents">
                      <p>
                        {`${
                          reviewsCount["3"]
                            ? (
                                (reviewsCount["3"] / details?.reviews?.length) *
                                100
                              ).toFixed(1)
                            : 0
                        }`}
                        %
                      </p>
                    </div>
                  </div>
                  <div className="review-rating">
                    <div className="stars">
                      <BsStarFill />
                      <BsStarFill />
                      <BsStar />
                      <BsStar />
                      <BsStar />
                    </div>
                    <div className="progress">
                      <span
                        style={{
                          width: `${
                            (reviewsCount["2"] / details?.reviews?.length) * 100
                          }%`,
                        }}
                      ></span>
                    </div>
                    <div className="percents">
                      <p>
                        {`${
                          reviewsCount["2"]
                            ? (
                                (reviewsCount["2"] / details?.reviews?.length) *
                                100
                              ).toFixed(1)
                            : 0
                        }`}
                        %
                      </p>
                    </div>
                  </div>
                  <div className="review-rating">
                    <div className="stars">
                      <BsStarFill />
                      <BsStar />
                      <BsStar />
                      <BsStar />
                      <BsStar />
                    </div>
                    <div className="progress">
                      <span
                        style={{
                          width: `${
                            (reviewsCount["1"] / details?.reviews?.length) * 100
                          }%`,
                        }}
                      ></span>
                    </div>
                    <div className="percents">
                      <p>
                        {`${
                          reviewsCount["1"]
                            ? (
                                (reviewsCount["1"] / details?.reviews?.length) *
                                100
                              ).toFixed(1)
                            : 0
                        }`}
                        %
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="reviews mt-5">
              <div className="topic-title">
                <h4>Reviews</h4>
              </div>
              <ul>
                {details?.reviews?.length > 0 ? (
                  <>
                    {details?.reviews?.map((review, i) => (
                      <li className="review-wrap" key={i}>
                        <div className="reviewer-profile-img">
                          <figure>
                            <img
                              src={
                                !review?.user?.profileImg
                                  ? "/assets/images/homepage/profile-placeholder.jpg"
                                  : `${process.env.REACT_APP_BACKEND_URL}/uploads/user/profile/${review?.user?.profileImg}`
                              }
                              alt=""
                            />
                          </figure>
                        </div>
                        <div className="reviewer-profile-info">
                          <p className="review-name">{`${review?.user?.firstName} ${review?.user?.lastName}`}</p>
                          <div className="reviewr-rating mt-1">
                            <StarRating rating={review?.rating} />

                            <span className="ml-3"> {review?.createdAt}</span>
                          </div>
                          <p className="review-desc mt-2">{review.review}</p>
                        </div>
                      </li>
                    ))}
                    {/* {props?.reviews?.length > 5 && (
                      <ReactPaginate
                        breakLabel="..."
                        nextLabel={<AiOutlineRight />}
                        onPageChange={props.handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={props.pageCount}
                        previousLabel={<AiOutlineLeft />}
                        renderOnZeroPageCount={null}
                        className="pagination"
                        forcePage={props.pageNo}
                      />
                    )} */}
                  </>
                ) : (
                  <p className="mt-4">No Reviews</p>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BundleDescription;
