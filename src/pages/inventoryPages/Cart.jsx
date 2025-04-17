import React, { useEffect, useState } from "react";
import { BsPatchCheckFill } from "react-icons/bs";
import PaymentSummary from "../../components/inventoryComponents/PaymentSummary.jsx";
import InventoryServices from "../../auth/services/InventoryServices";
import notification from "../../helpers/notification";
import CartItem from "../../components/inventoryComponents/CartItem.jsx";
import moment from "moment";
import PageBreadcrumb from "../../components/commonComponents/PageBreadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, fetchCoupons, setCoupon, setIsFetchCoupon } from "../../store/inventorySlice.js";

const Cart = () => {
  const { cart, coupons, isFetchCoupon, coupon } = useSelector(
    (state) => state.inventory
  );
  const dispatch = useDispatch();

  const [selectedCoupon, setSelectedCoupon] = useState();
  const [couponText, setCouponText] = useState('')

  const handleCoupon = async(couponCode) => {
    setCouponText(couponCode.code);
    await applyCoupon(couponCode.code)
  };

  const removeFromCart = async (id) => {
    try {
      const {message} = await InventoryServices.removeFromCart(id)
      notification('success', message);
      dispatch(fetchCart())

    } catch (error) {
      console.log(error)
      notification('error', error.response ? error.response.data.message : 'something went wrong.')
    }
  }

  const applyCoupon = async (couponCode = '') => {
    try {
      let enteredCode = couponCode;
      if(!enteredCode || enteredCode === '') {
        dispatch(setCoupon(''))
        dispatch(fetchCart())
        return;
        // return notification('warning', 'Please enter coupon code.')
      }
      
      let matchedCoupon = coupons.find(({code}) => code === enteredCode)
      if(!matchedCoupon) {
        dispatch(setCoupon(''))
        return notification('warning', 'Coupon is invalid.')
      }
      dispatch(setCoupon(matchedCoupon._id))
      dispatch(fetchCart(matchedCoupon._id))

    } catch (error) {
      console.log(error)
      notification('error', error.response ? error.response.data.message : 'Something went wrong.')
    }
  }

  useEffect(() => {
    if (!isFetchCoupon) {
      dispatch(fetchCoupons());
      dispatch(setIsFetchCoupon(true));
    }
  }, [dispatch,isFetchCoupon]);

  return (
    <>
      <PageBreadcrumb pageTitle="Cart" currentPage="Cart" />
      <section className="cart pt-5">
        <div className="container">
          {cart && cart.length > 0 ? (
            <div className="row">
              <div className="col-lg-8 order-last order-lg-first mt-5 mt-lg-0">
                <div className="cart-wrap">
                  <div className="card-heading">
                    <h2>shopping cart</h2>
                  </div>
                  <div className="cart-list mt-3 mt-lg-4">
                    <ul>
                      {cart?.map((item) => (
                        <CartItem
                          key={item._id}
                          item={item}
                          handleRemoveCart={removeFromCart}
                        />
                      ))}
                    </ul>
                  </div>
                </div>
                {coupons && coupons.length > 0 && (
                  <div className="cart-wrap mt-5">
                    <div className="card-heading">
                      <h2>Active Coupons</h2>
                    </div>

                    <div className="cart-list mt-3 mt-lg-4 pb-1">
                      <div className="row">
                        {coupons?.map((coup) => (
                          <div
                            className="col-sm-6 col-xl-4 mb-3"
                            key={coup?._id}
                          >
                            <div
                              className={`coupon-card ${
                                selectedCoupon === coup._id ? "active" : ""
                              }`}
                              onClick={() => handleCoupon(coup)}
                            >
                              {selectedCoupon === coup._id && (
                                <span className="select-check">
                                  <BsPatchCheckFill />
                                </span>
                              )}
                              <h3>
                                {coup.type === "fixed" ? "₹" : ""}
                                {coup?.couponValue}
                                {coup.type === "percentage" && "%"} flat off
                              </h3>
                              <div className="coupon-row">
                                <span id="cpnCode">{coup.code}</span>
                              </div>
                              <p>
                                Valid Till:{" "}
                                {moment(coup?.expiredAt).format("MMM Do YYYY")}
                              </p>
                              <div className="circle1"></div>
                              <div className="circle2"></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="col-lg-4 order-first order-lg-last">
                <div className="payment-wrap">
                  <div className="card-heading">
                    <h2>Payment Summary</h2>
                  </div>
                </div>
                <PaymentSummary
                applyCoupon={() => applyCoupon(couponText.toUpperCase())}
                couponText={couponText} 
                setCouponText={setCouponText}
                />
              </div>
            </div>
          ) : (
            <div>
              <h4>You have no items in your cart.</h4>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Cart;
