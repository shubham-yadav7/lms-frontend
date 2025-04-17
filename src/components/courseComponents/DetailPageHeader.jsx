import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";
import FancyBox from "../../helpers/FancyBox";
import StarRating from "../helpComponents/StarRating";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { FiMonitor } from "react-icons/fi";
import { RiBookmarkLine } from "react-icons/ri";
import {
  MdLanguage,
  MdUpdate,
  MdOutlineFilterList,
  MdOutlineWatchLater,
  MdOutlineGridView,
  MdOutlineLanguage,
} from "react-icons/md";

const DetailPageHeader = ({ details, executeScroll }) => {
  const scrollEve = (e) => {
    let sectionHeight =
      document.querySelector(".course-description").offsetHeight - 200;
    let diff = sectionHeight - e.target.scrollingElement.scrollTop;

    if (e.target.scrollingElement.scrollTop > 400 && diff > 0) {
      document.querySelector(".sidebar-wrap").classList.add("fixed-bar");
      document.querySelector(".top-buy-now-btn").classList.remove("visible");
    } else {
      document.querySelector(".sidebar-wrap").classList.remove("fixed-bar");
      document.querySelector(".top-buy-now-btn").classList.add("visible");
    }
    if (e.target.scrollingElement.scrollTop > 400) {
      document.querySelector(".after-scroll-header").classList.add("show");
    } else {
      document.querySelector(".after-scroll-header").classList.remove("show");
    }
  };

  useEffect(() => {
    if (document.querySelector(".sidebar-wrap")) {
      window.addEventListener("scroll", scrollEve);
    }
    return () => {
      window.removeEventListener("scroll", scrollEve);
    };
  }, [scrollEve]);

  return (
    <section className="detail-page-header details-page">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="detail-page-breadcrumb">
              <ol className="breadcrumb flex-wrap">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <BiChevronRight />
                {
                  <li>
                    <Link to="/courses">All courses</Link>
                  </li>
                }
                <BiChevronRight />
                <li className="breadcrumb-item active text-capitalize">
                  {details?.title}
                </li>
              </ol>
            </div>
            <div className="course-info">
              <div className="heading white display-toggle mt-4">
                <h2>{details?.title}</h2>
              </div>
              <div className="course-img">
                <FancyBox>
                  <a
                    data-fancybox="video"
                    href={`https://www.youtube.com/embed/${details?.thumbnailVideo}`}
                  >
                    <figure>
                      <img
                        src={`${process.env.REACT_APP_BACKEND_URL}/uploads/courses/thumbnails/${details?.thumbnailImage}`}
                        alt=""
                      />
                    </figure>
                  </a>
                </FancyBox>
                <span className="overlay">
                  <BsFillPlayCircleFill className="wave" />
                </span>
              </div>
              <div className="heading white display-toggle-invert">
                <h2>{details?.title}</h2>
                <p>{details?.courseExcerpt}</p>
              </div>
              <div className="course-rating">
                <div className="d-flex" onClick={executeScroll}>
                  <span className="total-rating mt-1">
                    {details?.avgRating?.toFixed(1) || 0.0}
                  </span>
                  <StarRating rating={details?.avgRating || 0} />
                </div>
                <span
                  className="rating-count mt-1 mt-sm-0"
                  onClick={executeScroll}
                >
                  ( {details?.ratings?.length} Ratings )
                  <span className="total-students ml-2">
                    {details?.studentsEnrolled}{" "}
                    {details?.studentsEnrolled > 1 ? "Students" : "Student"}
                  </span>
                </span>
              </div>
              <div className="about-course-info">
                <span>
                  Created by <Link to="/">{details?.creator}</Link>
                </span>
                <div className="d-flex align-items-center mt-2 mt-md-0 flex-wrap">
                  <span>
                    <MdLanguage />
                    {details?.language?.map((lang) => lang.name)?.join(", ")}
                  </span>
                </div>
              </div>
              <div className="mt-2">
                <span style={{ color: "#fff" }}>
                  <MdUpdate color="#fff" />{" "}
                  <span className="mr-1">Latest updated on </span>
                  {new Date(details?.updatedAt).toDateString()}
                </span>
              </div>
              <div className="sample-certificate-preview mt-4">
                <FancyBox>
                  <a
                    data-fancybox="images"
                    href={`/assets/images/common/sample-certificate.jpeg`}
                  >
                    <button className="custom-btn filled">
                      Sample Certificate
                    </button>
                  </a>
                </FancyBox>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="sidebar-wrap">
              <div className="course-intro-video">
                <FancyBox>
                  <a
                    data-fancybox="video"
                    href={`https://www.youtube.com/embed/${details?.thumbnailVideo}`}
                  >
                    <figure>
                      <img
                        src={`${process.env.REACT_APP_BACKEND_URL}/uploads/courses/thumbnails/${details?.thumbnailImage}`}
                        alt=""
                      />
                    </figure>
                  </a>
                </FancyBox>
                <span className="overlay">
                  <BsFillPlayCircleFill className="wave" />
                </span>
              </div>
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
                        {details?.language
                          ?.map((lang) => lang.name)
                          ?.join(", ")}
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
                      {details?.access === 0 && <span>Full Lifetime</span>}
                      {details?.access === 1 && <span>1 Year</span>}
                      {details?.access === 2 && <span>2 Years</span>}
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
              {/* {!user?.purchasedCourses?.includes(details?._id) ? (
                <div className="course-action-btn">
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
              )} */}
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
          </div>
        </div>
      </div>
      <div className="after-scroll-header">
        <div className="container">
          <div className="row px-0 mx-0">
            <div className="col-md-8 col-sm-7 d-none d-sm-block">
              {/* <h4>{details?.title?.length>45?details?.title?.substr(0,45)+"...":details?.title}.</h4> */}
              <h4>{details?.title}</h4>
              <div className="course-rating mt-1">
                <div className="d-flex align-items-center">
                  <span className="total-rating mt-1">
                    {details?.avgRating?.toFixed(1) || 0}
                  </span>
                  <StarRating rating={details?.avgRating} />
                </div>

                <span
                  className="rating-count mt-1 mt-sm-0"
                  onClick={executeScroll}
                >
                  ({details?.ratings?.length} rating)
                </span>
              </div>
            </div>
            <div className="col-4 d-none d-md-block">
              <div className="top-buy-now-btn">
                {/* {
                !user?.purchasedCourses?.includes(details?._id)
                ?
                <>
                {user?.cart?.find(
                    (item) => item.item === details?._id.toString()
                  ) ? (
                    <button
                      style={{ width: '100%' }}
                      className="custom-btn cart"
                      onClick={() => history("/cart")}
                      >
                      Go To Cart
                    </button>
                  ) : (
                    <button
                      style={{ width: '100%' }}
                      className="custom-btn cart"
                      onClick={() => handleCart(details._id)}
                    >
                      Add To Cart
                    </button>
                  )}
                 </>
                :
                <button onClick={() => startCourse(details?._id)} className="custom-btn filled" style={{ width: '100%' }}>Start Course</button>
              } */}
              </div>
            </div>
            <div className="col-sm-5 d-block d-md-none px-0">
              <div className="buy-now-wrap">
                <div className="fixed-nav-price">
                  <span className="disc_price">
                    ₹{details?.discountedPrice}
                  </span>
                  <span className="actual_price">₹{details?.price}</span>
                </div>
                <div className="fixed-nav-btn">
                  {/* {
                !user?.purchasedCourses?.includes(details?._id)
                ?
                <>
                  {user?.cart?.find(
                    (item) => item.item === details?._id.toString()
                  ) ? (
                    <button
                      style={{ width: '100%' }}
                      className="custom-btn cart"
                      onClick={() => history("/cart")}
                      >
                      Go To Cart
                    </button>
                  ) : (
                    <button
                      style={{ width: '100%' }}
                      className="custom-btn cart"
                      onClick={() => handleCart(details._id)}
                    >
                      Add To Cart
                    </button>
                  )}
                 </> 
                :
                <button onClick={() => startCourse(details?._id)} className="custom-btn filled" style={{ width: '100%' }}>Start Course</button>
              
              } */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailPageHeader;
