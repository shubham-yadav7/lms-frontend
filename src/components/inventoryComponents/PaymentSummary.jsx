import React, { useContext, useState } from "react";
import InventoryServices from "../../auth/services/InventoryServices";
import { FaTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import notification from "../../helpers/notification";
import { useDispatch, useSelector } from "react-redux";

const PaymentSummary = ({ couponText, setCouponText, applyCoupon }) => {
  const { cartSummary } = useSelector((state) => state.inventory);
  const dispatch = useDispatch();

  return (
    <div className="payment-summary mt-3 mt-lg-4">
      <div className="summary-card-header">
        <div className="key-value-form">
          <form>
            <input
              type="text"
              style={{textTransform: 'uppercase'}}
              value={couponText}
              onChange={(e) => setCouponText(e.target.value)}
              name="coupon"
              placeholder="COUPON CODE"
            />
            <button onClick={applyCoupon} type="button">
              Apply
            </button>
          </form>
        </div>
      </div>

      <div className="summary-card-body">
        {cartSummary.coupon && (
          <div className="key-value-block">
            <span className="property-name">Coupon Applied</span>
            <span className="property-value text-success">
              <em>{cartSummary.coupon.couponCode}</em>{" "}
              <button
                title="Remove Coupon"
                // onClick={removeCoupon}
                type="button"
                className="remove-coupon"
              >
                <FaTimesCircle />
              </button>{" "}
            </span>
          </div>
        )}
        <div className="key-value-block">
          <span className="property-name">cart total</span>
          <span className="property-value">₹{cartSummary.cartTotal}</span>
        </div>
        {/* <div className="key-value-block">
                        <span className='property-name'>additional service</span>
                        <span className='property-value'>₹10</span>
                    </div> */}
        {cartSummary.discountAmount && (
          <div className="key-value-block">
            <span className="property-name">Discount Applied</span>
            <span className="property-value">
              - ₹{cartSummary.discountAmount}
            </span>
          </div>
        )}
        {/* <div className="key-value-block">
          <span className="property-name">GST (18%)</span>
          <span className="property-value">+ ₹{cartSummary.gst}</span>
        </div> */}
        <div className="key-value-block total">
          <span className="property-name">Grand Total</span>
          <span className="property-value blue">₹{cartSummary.grandTotal}</span>
        </div>
      </div>

      <div className="summary-card-footer">
        <Link
          to={{ pathname: "/checkout", state: { applyCoupon } }}
          className="redirect-link"
        >
          checkout
        </Link>
      </div>
    </div>
  );
};

export default PaymentSummary;
