import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdCheck } from "react-icons/md";
import { BsStarFill, BsStar } from "react-icons/bs";
import { FiMonitor } from "react-icons/fi";
import {
  MdOutlineFilterList,
  MdOutlineWatchLater,
  MdOutlineGridView,
  MdOutlineLanguage,
} from "react-icons/md";
import { RiBookmarkLine } from "react-icons/ri";
import StarRating from "../helpComponents/StarRating";
import CourseContentList from "../courseComponents/CourseContentList.jsx";

const CourseDescription = ({
  details,
  handlePageClick,
  pageCount,
  itemsPerPage,
  pageNo,
  myRef,
  instructorCourses,
  topics,
}) => {
  const [selected, setSelected] = useState(0);

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
              {/* <div className="left-offer-timing">
                           <p><MdOutlineAlarm/><span>11 hours </span> left at this price</p>
                       </div> */}
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
                      <p>{details?.totalLessons}</p>
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
                      <p>
                        {details?.duration?.inWords
                          ? details?.duration?.inWords
                          : `${details?.duration} mins`}
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="detail-type">
                      <p>
                        <MdOutlineGridView />
                        Category
                      </p>
                    </div>
                    <div className="detail-value">
                      <p>{details?.category?.title}</p>
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
                </ul>
              </div>
              {/* {!user?.purchasedCourses?.includes(details?._id) ? (
                <div className="course-action-btn">
                  { !cart?.find(c => c.productId  == details?._id)?<button className="custom-btn cart" onClick={()=>handleCart(details?._id)}>Add to cart</button>:<button className="custom-btn cart" onClick={()=>history('/cart')}>Go to cart</button>} 
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
                  <button
                    onClick={() => startCourse(details?._id)}
                    className="custom-btn filled"
                    style={{ width: "100%" }}
                  >
                    Start Course
                  </button>
                </div>
              )
              } */}
              {/* <div className="coupons-wrap">
                           <button className="apply-coupon-btn" onClick={() => {setShowCoupon(!showCoupon)}}>Apply Coupon</button>
                           <form action="">
                               <div className={`coupon-form-wrap ${showCoupon ? 'show-coupon-form' : ''}`}>
                                   <input type="text" name="" id="" placeholder='Enter Coupon' />
                                   <button type='button'>Apply</button>
                               </div>
                           </form>
                       </div> */}
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
            {details?.benefits ? (
              <div className="course-benefits filled-section mt-5">
                <div className="topic-title">
                  <h4>Course Benefits</h4>
                </div>
                <div className="benefits-wrap">
                  <ul>
                    {details?.benefits?.map((benefit, i) => (
                      <li key={i}>
                        <MdCheck /> {benefit}{" "}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              "add placeholder TODO:"
            )}
            {details?.materialsIncludes ? (
              <div className="material-includes mt-5">
                <div className="topic-title">
                  <h4>Materials Included</h4>
                  <ul>
                    {details?.materialsIncludes?.map((material, i) => (
                      <li key={i}>{material}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              "Add Placeholder here"
            )}
            <div className="course-content mt-5">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="topic-title">
                    <h4>Course Content</h4>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="course-stats">
                    <span>{details?.totalLessons} Lessons</span>
                    <span className="ml-3">
                      {details?.duration?.inWords
                        ? details?.duration?.inWords
                        : `${details?.duration} mins`}
                    </span>
                  </div>
                </div>
              </div>
              <div className="course-content-list">
                <ul className="collapse-list">
                  {topics?.map((content, i) => (
                    <CourseContentList
                      key={content._id}
                      id={i}
                      content={content}
                      setSelected={setSelected}
                      selected={selected}
                    />
                  ))}
                </ul>
              </div>
            </div>
            <div className="course-instructor mt-5">
              <div className="topic-title">
                <h4>Instructor</h4>
              </div>
              {details?.instructor?.map((inst, i) => (
                <div
                  className={`instructor_wrap ${
                    i === details?.instructor?.length - 1 ? "_last" : ""
                  }`}
                  key={inst?._id}
                >
                  <div className="instructor-profile">
                    <Link
                      to={`/instructor/${inst?.slug}`}
                      className="instructor-img d-block"
                    >
                      <figure>
                        <img
                          src={`${process.env.REACT_APP_BACKEND_URL}/uploads/instructors/profile/${inst?.profileImg}`}
                          alt=""
                        />
                      </figure>
                    </Link>
                    <div className="instructor-info">
                      <Link
                        to={`/instructor/${inst.slug}`}
                        className="inst-name d-block"
                      >
                        {inst?.name}
                      </Link>
                      <Link
                        to={`/instructor/${inst?.slug}`}
                        className="inst-designation d-block"
                      >
                        {inst?.designation}
                      </Link>
                      {/* <Link to="FIXME:" className="inst-rating">
                                            <span>
                                                <BsStarFill /> 4.7
                                            </span>
                                            <span className='ml-2'>
                                                (54 reviews)
                                            </span>
                                        </Link> */}
                      <div className="inst-about">
                        <Link
                          to={`/instructor/${inst?.slug}`}
                          className="inst-about-wrap"
                        >
                          <FiMonitor />
                          <span>
                            {instructorCourses.map((el) => {
                              if (el.instructor === inst._id.toString()) {
                                return el.count;
                              }
                            })}{" "}
                            Courses
                          </span>
                        </Link>
                        {/* <Link to="FIXME:" className="inst-about-wrap ml-sm-4 mt-2 mt-sm-0">
                                                <BsPeople />
                                                <span>78,742 Students</span>
                                            </Link> */}
                      </div>
                    </div>
                  </div>
                  <div className="instructor-bio">
                    <div
                      className="embed-html"
                      dangerouslySetInnerHTML={{
                        __html: inst?.description,
                      }}
                    ></div>
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
                    {/* <span>
                                        <BsStarFill />
                                        <BsStarFill />
                                        <BsStarFill />
                                        <BsStarFill />
                                        <BsStarFill />
                                    </span> */}
                    <StarRating rating={details?.avgRating} />
                    <span className="mt-1 inWords">
                      {details?.ratings?.length || 0} Rating
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
                      // style={{
                      //   width: `${
                      //     (reviewsCount["5"] / details?.ratings?.length) * 100
                      //   }%`,
                      // }}
                      ></span>
                    </div>
                    <div className="percents">
                      <p>
                        {/* {`${
                          reviewsCount["5"]
                            ? (
                                (reviewsCount["5"] / details?.ratings?.length) *
                                100
                              ).toFixed(1)
                            : 0
                        }`} */}
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
                      // style={{
                      //   width: `${
                      //     (reviewsCount["4"] / details?.ratings?.length) * 100
                      //   }%`,
                      // }}
                      ></span>
                    </div>
                    <div className="percents">
                      <p>
                        {/* {`${
                          reviewsCount["4"]
                            ? (
                                (reviewsCount["4"] / details?.ratings?.length) *
                                100
                              ).toFixed(1)
                            : 0
                        }`} */}
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
                      // style={{
                      //   width: `${
                      //     (reviewsCount["3"] / details?.ratings?.length) * 100
                      //   }%`,
                      // }}
                      ></span>
                    </div>
                    <div className="percents">
                      <p>
                        {/* {`${
                          reviewsCount["3"]
                            ? (
                                (reviewsCount["3"] / details?.ratings?.length) *
                                100
                              ).toFixed(1)
                            : 0
                        }`} */}
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
                      // style={{
                      //   width: `${
                      //     (reviewsCount["2"] / details?.ratings?.length) * 100
                      //   }%`,
                      // }}
                      ></span>
                    </div>
                    <div className="percents">
                      <p>
                        {/* {`${
                          reviewsCount["2"]
                            ? (
                                (reviewsCount["2"] / details?.ratings?.length) *
                                100
                              ).toFixed(1)
                            : 0
                        }`} */}
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
                      // style={{
                      //   width: `${
                      //     (reviewsCount["1"] / details?.ratings?.length) * 100
                      //   }%`,
                      // }}
                      ></span>
                    </div>
                    <div className="percents">
                      <p>
                        {/* {`${
                          reviewsCount["1"]
                            ? (
                                (reviewsCount["1"] / details?.ratings?.length) *
                                100
                              ).toFixed(1)
                            : 0
                        }`} */}
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
                {/* {props?.ratings?.length > 0 ? (
                  <>
                    {props?.reviews?.map((review, i) => (
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

                            <span className="ml-3">
                              {" "}
                              {format(review?.createdAt)}
                            </span>
                          </div>
                          <p className="review-desc mt-2">{review.review}</p>
                        </div>
                      </li>
                    ))}
                    {props?.reviews?.length > 5 && (
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
                    )}
                  </>
                ) : (
                  <p className="mt-4">No Reviews</p>
                )} */}
              </ul>

              {/* <ul>
                           
                            <li className="review-wrap">
                                <div className="reviewer-profile-img">
                                    <figure>
                                        <img src="assets/images/details/crp.png" alt="" />
                                    </figure>
                                </div>
                                <div className="reviewer-profile-info">
                                    <p className='review-name'>Shailabh Srivastava</p>
                                    <div className="reviewr-rating mt-1">
                                        <span> <BsStarFill/> <BsStarFill/> <BsStarFill/> <BsStarFill/> <BsStar/> </span>
                                        <span className='ml-3'>55 min ago</span>
                                    </div>
                                    <p className='review-desc mt-2'>
                                        Sir have explained every topic v well. Best thing is after the course completion validity is there for lifetime. We can watch the videos anytime if we forget any topic. Thank you sir.
                                    </p>
                                </div>
                            </li>
                            <li className="review-wrap">
                                <div className="reviewer-profile-img">
                                    <figure>
                                        <img src="assets/images/details/crp.png" alt="" />
                                    </figure>
                                </div>
                                <div className="reviewer-profile-info">
                                    <p className='review-name'>Shailabh Srivastava</p>
                                    <div className="reviewr-rating mt-1">
                                        <span> <BsStarFill/> <BsStarFill/> <BsStarFill/> <BsStarFill/> <BsStar/> </span>
                                        <span className='ml-3'>55 min ago</span>
                                    </div>
                                    <p className='review-desc mt-2'>
                                        Sir have explained every topic v well. Best thing is after the course completion validity is there for lifetime. We can watch the videos anytime if we forget any topic. Thank you sir.
                                    </p>
                                </div>
                            </li>
                            <li className="review-wrap">
                                <div className="reviewer-profile-img">
                                    <figure>
                                        <img src="assets/images/details/crp.png" alt="" />
                                    </figure>
                                </div>
                                <div className="reviewer-profile-info">
                                    <p className='review-name'>Shailabh Srivastava</p>
                                    <div className="reviewr-rating mt-1">
                                        <span> <BsStarFill/> <BsStarFill/> <BsStarFill/> <BsStarFill/> <BsStar/> </span>
                                        <span className='ml-3'>55 min ago</span>
                                    </div>
                                    <p className='review-desc mt-2'>
                                        Sir have explained every topic v well. Best thing is after the course completion validity is there for lifetime. We can watch the videos anytime if we forget any topic. Thank you sir.
                                    </p>
                                </div>
                            </li>
                        </ul> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDescription;
