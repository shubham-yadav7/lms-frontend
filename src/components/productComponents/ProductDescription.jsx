import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaStarHalfAlt, FaStar } from "react-icons/fa";
import { BsStarFill, BsPeople, BsStar, BsTrophy } from "react-icons/bs";
import { FiMonitor } from "react-icons/fi";
import { MdCheck } from "react-icons/md";
import {
  MdLanguage,
  MdUpdate,
  MdOutlineAlarm,
  MdOutlineFilterList,
  MdOutlineWatchLater,
  MdOutlineGridView,
  MdOutlineLanguage,
} from "react-icons/md";
import { RiBookmarkLine } from "react-icons/ri";
import { IoDocumentTextOutline, IoPeople } from "react-icons/io5";
import StarRating from "../helpComponents/StarRating";
import RatingStar from "../helpComponents/RatingStar";
import ReactPaginate from "react-paginate";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import ProductServices from "../../auth/services/ProductServices";
import notification from "../../helpers/notification";
import FancyBox from "../../helpers/FancyBox";

const ProductDescription = ({ details, reviewsCount, myRef }) => {
  let averageRating = 0;
  // Auth reducer for cart and other functionalities

  const navigate = useNavigate();

  // Handle cart function

  return (
    <section className="course-description py-5">
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
                      <p className="text-capitalize">
                        {details?.levels?.join(", ")}
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
                      <p>{details?.languages?.join(", ")}</p>
                    </div>
                  </li>
                </ul>
              </div>
              {/* {
                details?.quantityInStock > 0
                &&
                <div className="course-action-btn">
                  { !cart?.find(c => c.productId  == details?._id)?<button className="custom-btn cart" onClick={()=>handleCart(details?._id)}>Add to cart</button>:<button className="custom-btn cart" onClick={()=>history('/cart')}>Go to cart</button>} 
                  {user?.cart?.find(
                    (item) => item?.item === details?._id.toString()
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
                    <a
                      style={{ width: "100%" }}
                      className="custom-btn cart"
                      href="https://one-lms.in"
                      target='_blank'                      
                    >Buy Now</a>
                  <button className="custom-btn filled">Buy Now</button>
                </div>
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
                <h4> Product Description</h4>
                <div
                  dangerouslySetInnerHTML={{ __html: details?.description }}
                ></div>
              </div>
            </div>

            <div className="course-benefits filled-section mt-5">
              <div className="topic-title">
                <h4>Product Benefits</h4>
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

            <div className="product_gallery mt-5">
              <div className="topic-title">
                <h4>Product Gallery</h4>
              </div>
              <div className="product-gallery-wrap mt-4">
                <div className="row">
                  {details?.productGallery?.map((img, i) => (
                    <div className="col-md-4 col-6" key={i}>
                      <FancyBox>
                        <a
                          data-fancybox="gallery"
                          href={`${process.env.REACT_APP_BACKEND_URL}/uploads/products/gallery/${img}`}
                        >
                          <figure className={`mb-0 ${i > 1 ? "d-none" : ""}`}>
                            <img
                              src={`${process.env.REACT_APP_BACKEND_URL}/uploads/products/gallery/${img}`}
                              alt=""
                            />
                          </figure>
                        </a>
                      </FancyBox>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div ref={myRef} className="feedback-wrap mt-5">
              <div className="topic-title">
                <h4>Student Feedback</h4>
              </div>
              <div className="student-rating-wrap">
                <div className="rating-count">
                  <div className="total-rating">
                    <h2>{details?.avgRating?.toFixed(1) || 0}</h2>
                  </div>
                  <div className="rating-stars">
                    <StarRating rating={details?.avgRating} />
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

            {/* <div className="reviews mt-5">
              <div className="topic-title">
                <h4>Reviews</h4>
              </div>
              <ul>
                {props?.reviews?.length > 0 ? (
                  <>
                    {props?.reviews.map((review, i) => (
                      <li key={i} className="review-wrap">
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
                          <p className="review-name">{`${review?.user.firstName} ${review?.user.lastName}`}</p>
                          <div className="reviewr-rating mt-1">
                            <StarRating rating={review?.rating || 0} />
                            <span className="ml-3">
                              {" "}
                              {format(review?.createdAt)}
                            </span>
                          </div>
                          <p className="review-desc mt-2">{review?.review}</p>
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
                )}
              </ul>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDescription;
