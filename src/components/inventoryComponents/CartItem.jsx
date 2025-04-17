import React from "react";
import { Link } from "react-router-dom";
import { GoPlusSmall } from "react-icons/go";
import { BiMinus } from "react-icons/bi";
import InventoryServices from "../../auth/services/InventoryServices";
import notification from "../../helpers/notification";
import StarRating from "../helpComponents/StarRating";

const CartItem = ({ coupon, item, handleRemoveCart, fetchCart }) => {
  let quantity = item.quantity ? item.quantity : 1;
  const minusQty = () => {};
  const plusQty = () => {};

  return (
    <li>
      <div className="d-flex align-items-sm-center flex-column flex-sm-row">
        <div className="cart-img">
          <Link
            to={`/${item.type === "courseBundle" ? "bundle" : item.type}/${
              item.item.slug
            }`}
          >
            <figure className="mb-sm-0">
              {item.type === "course" ? (
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/uploads/courses/thumbnails/${item.item.thumbnailImage}`}
                  alt=""
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src =
                      "assets/images/common/image-placeholder.webp";
                  }}
                />
              ) : (
                <>
                  {item.type === "product" ? (
                    <img
                      src={`${process.env.REACT_APP_BACKEND_URL}/uploads/products/thumbnails/${item.item.thumbnailImage}`}
                      alt=""
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src =
                          "assets/images/common/image-placeholder.webp";
                      }}
                    />
                  ) : (
                    <img
                      src={`${process.env.REACT_APP_BACKEND_URL}/uploads/bundle/thumbnails/${item.item.thumbnailImage}`}
                      alt=""
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src =
                          "assets/images/common/image-placeholder.webp";
                      }}
                    />
                  )}
                </>
              )}
            </figure>
          </Link>
        </div>
        <div className="cart-description">
          <Link
            to={`/${item.type === "courseBundle" ? "bundle" : item.type}/${
              item.item.slug
            }`}
            className="cart-course-name d-block"
          >
            {item.item.title}
          </Link>
          <div className="cart-price d-flex d-xl-none mt-2">
            <span className="cart-discounted-price">
              ₹{item.item.discountedPrice}
            </span>
            <span className="cart-actual-price">₹{item.item.price}</span>
          </div>
          <div className="cart-course-rating d-sm-flex d-none mt-2">
            <span className="cart-rating-count">
              {item?.item?.avgRating?.toFixed(1) || 0}
            </span>
            <StarRating rating={item?.item?.avgRating || 0} />
            <span>({item?.item?.reviews?.length || 0} ratings)</span>
          </div>
          <div className="cart-course-about d-xl-flex d-none mt-2">
            {item.item.duration?.inWords} • {item.item.totalLessons} lectures •{" "}
            {item.item.level}
          </div>
        </div>
      </div>

      {item.type !== "courseBundle" && (
        <div className="cart-course-rating d-flex d-sm-none mt-2">
          <span className="cart-rating-count">
            {item?.item?.avgRating?.toFixed(1) || 0}
          </span>
          <StarRating rating={item?.item?.avgRating || 0} />
          <span>({item?.item?.reviews?.length || 0} ratings)</span>
        </div>
      )}

      <div className="cart-course-about d-flex d-xl-none mt-2">
        {item.item.duration?.inWords} • {item.item.totalLessons} lectures •{" "}
        {item.item.level}
      </div>
      <div className="cart-actions">
        <button
          type="button"
          onClick={() => handleRemoveCart(item._id)}
          className="btn p-0"
        >
          Remove
        </button>
        {/* <Link to='FIXME:'>Move to Wishlist</Link> */}
        {item.type === "product" && (
          <div className="quantity-toggle">
            <button className="qty-btn" onClick={() => minusQty(item._id)}>
              <BiMinus />
            </button>
            <span> {quantity} </span>
            <button className="qty-btn" onClick={() => plusQty(item._id)}>
              <GoPlusSmall />
            </button>
          </div>
        )}
      </div>
      <div className="cart-price d-xl-flex d-none">
        <span className="cart-discounted-price">
          ₹{item.item.discountedPrice}
        </span>
        <span className="cart-actual-price">₹{item.item.price}</span>
      </div>
    </li>
  );
};

export default CartItem;
