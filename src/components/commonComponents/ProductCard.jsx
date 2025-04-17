import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StarRating from "../helpComponents/StarRating";
import ProductServices from "../../auth/services/ProductServices";
import notification from "../../helpers/notification";
import { BsBox } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import InventoryServices from "../../auth/services/InventoryServices";
import { fetchCart } from "../../store/inventorySlice";
import { fetchUser } from "../../store/authSlice";

const ProductCard = ({ product }) => {
  // Auth Reducer for cart and other functionalities
  const { purchasedProducts } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.inventory);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   Handle cart function
  const handleCart = async (id) => {
    try {
      const {message} = await InventoryServices.addToCart({
        id,
        type: 'product'
      })

      notification('success', message)
      dispatch(fetchCart())
      dispatch(fetchUser())

    } catch (error) {
      console.log(error)
    }
  }

  return (
    // TODO: Add loader condition on all pages and placeholder for all components
    <>
      {
        product &&
        <div className="course-item">
          <Link to={`/product/${product.slug}`}>
            <figure className="mb-0">
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/uploads/products/thumbnails/${product.thumbnailImage}`}
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
                <img src="/assets/images/homepage/courses/user_icon.png" alt="" />
                <span>
                  {product?.studentsEnrolled ? product?.studentsEnrolled : 0}
                </span>
              </div>
              <div className="course-detail">
                <BsBox color="#0e9ee2" size={20} />
                <span>{product?.quantityInStock} in stock</span>
              </div>
            </div>
            <Link to={`/product/${product?.slug}`} className="course-title d-block">
              <h4>
                {product?.title?.length > 45
                  ? `${product?.title?.substring(0, 45)}...`
                  : product?.title}
              </h4>
            </Link>
            <div className="course-price-wrap">
              <div className="course-price">
                <h5>
                  ₹{product?.discountedPrice}{" "}
                  <span className="og-price">₹{product?.price}</span>
                </h5>
              </div>
              <div className="course-rating">
                <span className="no_dash">
                  <StarRating
                    rating={product?.averageRating ? product?.averageRating : 0}
                  />
                  <span className="rating ml-0">({product?.reviews?.length})</span>
                </span>
              </div>
            </div>
            <Link
              to={`/product/${product?.slug}`}
              className="view-course-btn custom-btn d-block d-sm-none"
            >
              View Course
            </Link>
          </div>

          <div className="course-more-details">
            <div className="more-details-header">
              <p className="update-date">
                updated {new Date(product?.updatedAt).toDateString()}
              </p>
            </div>
            <div className="more-details-title">
              <h4>
                {product?.title.length > 55
                  ? `${product?.title.substring(0, 55)}...`
                  : product?.title}
              </h4>
              <div className="more-details-stats">
                <div className="stats-details mr-3">
                  <img
                    src="/assets/images/homepage/courses/clipboard_icon.png"
                    alt=""
                  />
                  <span>{product?.totalLessons} Lessons</span>
                </div>
                <div className="stats-details">
                  <img
                    src="/assets/images/homepage/courses/clock_icon.png"
                    alt=""
                  />
                  <span>{product?.duration?.inWords || "0 hrs"}</span>
                </div>
              </div>
            </div>
            <div className="more-details-pointers">
              {product?.benefits?.length === 0 && product?.description ? (
                <>
                  <h5>Course Details</h5>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: product?.description?.slice(0, 10),
                    }}
                  ></p>
                </>
              ) : (
                <>
                  <h5>List is Given Below</h5>
                  <ul>
                    {product?.benefits?.slice(0, 4).map((benefit, i) => (
                      <li key={i}>
                        <img
                          src="/assets/images/homepage/courses/tick_icon.png"
                          alt=""
                        />
                        <p>{benefit}</p>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            <div className="more_btn_wrap">
              <div className="more-details-action-wrap">
                {/* TODO: */}
                {!purchasedProducts?.includes(product?._id.toString()) ? (
                  <>
                    {cart?.find(
                      (item) => item?.item?._id?.toString() === product?._id?.toString()
                    ) ? (
                      <button
                        className="redirect-link green filled"
                        onClick={() => navigate("/cart")}
                      >
                        Go To Cart
                      </button>
                    ) : (
                      <button
                        className="redirect-link green filled"
                        onClick={() => handleCart(product?._id)}
                      >
                        Add To Cart
                      </button>
                    )}
                  </>
                ) : (
                  <button
                    type={"button"}
                    // onClick={() => startCourse(product?._id)}
                    className="redirect-link green filled"
                  >
                    TODO:
                    Start Course
                  </button>
                )}

                <Link to={`/product/${product?.slug}`} className="redirect-link">
                  View course
                </Link>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default ProductCard;
