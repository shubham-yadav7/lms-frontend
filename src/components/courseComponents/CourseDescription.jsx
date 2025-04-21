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
                      {details?.totalDuration || `0 sec`}
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
              <p className="mt-3">
                {details?.creator?.firstName} {details?.creator?.lastName}
              </p>
            </div>
          
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDescription;
