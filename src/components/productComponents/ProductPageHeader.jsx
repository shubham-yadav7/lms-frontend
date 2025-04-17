import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";
import { RiBookmarkLine } from "react-icons/ri";
import { BsTrophy, BsFillPlayCircleFill } from "react-icons/bs";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FiMonitor } from "react-icons/fi";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import {
  MdLanguage,
  MdUpdate,
  MdOutlineAlarm,
  MdOutlineFilterList,
  MdOutlineWatchLater,
  MdOutlineGridView,
  MdOutlineLanguage,
} from "react-icons/md";
import FancyBox from "../../helpers/FancyBox";
import notification from "../../helpers/notification";
import StarRating from "../helpComponents/StarRating";
import RatingStar from "../helpComponents/RatingStar";
import ProductServices from "../../auth/services/ProductServices";

const ProductPageHeader = ({ details, reviewsCount, executeScroll }) => {
  const navigate = useNavigate();

  // Auth reducer for cart and other functionalities

  if (document.querySelector(".detail-page-header") !== null) {
    window.addEventListener("scroll", (e) => {
      let sectionHeight =
        document.querySelector(".course-description")?.offsetHeight - 200;
      let diff = sectionHeight - e.target.scrollingElement.scrollTop;

      if (e.target.scrollingElement.scrollTop > 400 && diff > 0) {
        document.querySelector(".sidebar-wrap")?.classList.add("fixed-bar");
        document.querySelector(".top-buy-now-btn")?.classList.remove("visible");
      } else {
        document.querySelector(".sidebar-wrap")?.classList.remove("fixed-bar");
        document.querySelector(".top-buy-now-btn")?.classList.add("visible");
      }
      if (e.target.scrollingElement.scrollTop > 400) {
        document.querySelector(".after-scroll-header")?.classList.add("show");
      } else {
        document
          .querySelector(".after-scroll-header")
          ?.classList.remove("show");
      }
    });
  }

  // Cart handle function

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
                <li className="breadcrumb-item">
                  <Link to="/products">All Products</Link>
                </li>
                <BiChevronRight />
                <li className="breadcrumb-item active">{details?.title}</li>
              </ol>
            </div>
            <div className="course-info">
              <div className="heading white display-toggle mt-4">
                <h2>{details?.title}</h2>
              </div>
              <div className="course-img">
                <FancyBox>
                  <a data-fancybox="video" href="FIXME:">
                    <figure>
                      <img
                        src={`${process.env.REACT_APP_BACKEND_URL}/uploads/products/thumbnails/${details?.thumbnailImage}`}
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
                <p>
                  {details?.excerpt?.length > 150
                    ? `${details?.excerpt?.slice(0, 150)}...`
                    : details?.excerpt}
                </p>
              </div>
              <div className="course-rating">
                <div className="d-flex" onClick={executeScroll}>
                  <span className="total-rating mt-1">
                    {details?.avgRating || 0}
                  </span>
                  <StarRating rating={details?.avgRating || 0} />
                </div>
                <span
                  className="rating-count mt-1 mt-sm-0"
                  onClick={executeScroll}
                >
                  ({details?.reviews?.length} rating)
                  <span className="total-students d-inline-block ml-2">
                    {details?.studentsEnrolled} Students enrolled
                  </span>
                </span>
              </div>
              <div className="about-course-info">
                <p>
                  Created by <Link to="/">{details?.creator}</Link>
                </p>
                <div className="d-flex align-items-center mt-2 mt-md-0 flex-wrap">
                  <p>
                    <MdLanguage />
                    {details?.language?.map((lang) => lang.name)?.join(",")}
                  </p>
                </div>
              </div>
              <p className="mt-2" style={{ color: "#fff" }}>
                <MdUpdate color="#fff" />{" "}
                <span className="mr-1">Latest update </span>{" "}
                {new Date(details?.updatedAt)?.toDateString()}
              </p>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="sidebar-wrap">
              <div className="course-intro-video">
                <FancyBox>
                  <a data-fancybox="video" href={details?.thumbnailVideo}>
                    <figure>
                      <img
                        src={`${process.env.REACT_APP_BACKEND_URL}/uploads/products/thumbnails/${details?.thumbnailImage}`}
                        alt=""
                      />
                    </figure>
                  </a>
                </FancyBox>
                <span className="overlay">
                  <BsFillPlayCircleFill className="wave" />
                </span>
              </div>
              <div className="course-pricing ">
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
                      <p className="text-capitalize">
                        {console.log(details?.levels)}
                        {details?.levels?.join(", ")}
                      </p>
                    </div>
                  </li>

                  {/* <li>
                    <div className="detail-type">
                      <p>
                        <MdOutlineWatchLater />
                        Duration
                      </p>
                    </div>
                    <div className="detail-value">
                      <p>{details?.duration}hr</p>
                    </div>
                  </li> */}
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
                        {details?.language.map((lang) => lang.name)?.join(",")}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              {
                // details?.quantityInStock > 0
                // &&
                // <div className="course-action-btn">
                //   {/* { !cart?.find(c => c.productId  == details?._id)?<button className="custom-btn cart" onClick={()=>handleCart(details?._id)}>Add to cart</button>:<button className="custom-btn cart" onClick={()=>history('/cart')}>Go to cart</button>}  */}
                //   {user?.cart?.find(
                //     (item) => item?.item === details?._id.toString()
                //   ) ? (
                //     <button
                //       style={{ width: "100%" }}
                //       className="custom-btn cart"
                //       onClick={() => history("/cart")}
                //     >
                //       Go To Cart
                //     </button>
                //   ) : (
                //     <button
                //       style={{ width: "100%" }}
                //       className="custom-btn cart"
                //       onClick={() => handleCart(details._id)}
                //     >
                //       Add To Cart
                //     </button>
                //   )}
                //   {/* <button className="custom-btn filled">Buy Now</button> */}
                // </div>
              }
              <a
                style={{ width: "100%" }}
                className="custom-btn cart"
                href="https://one-lms.in"
                target="_blank"
              >
                Buy Now
              </a>
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
    </section>
  );
};

export default ProductPageHeader;
