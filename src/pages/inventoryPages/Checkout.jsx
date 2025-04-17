import React, { useContext, useEffect, useState } from "react";
// import PageBreadcrumb from "../components/PageBreadcrumb";
import { AiFillLock } from "react-icons/ai";
import Select from "react-select";
// import AppContext from "../Context/AppContext";
// import ApiService from "../services/ApiService";
import { useLocation, useNavigate } from "react-router-dom";
// import notification from "../helpers/notification";
import axios from "axios";
import PageBreadcrumb from "../../components/commonComponents/PageBreadcrumb";
import { useSelector } from "react-redux";
// import BillingStateCity from "../components/BillingStateCity";
// import ShippingStateCity from "../components/ShippingStateCity";
// import Footer from "../components/Footer";

const Checkout = () => {

    const {cartSummary, coupon, coupons} = useSelector(state => state.inventory)

    const [selectedCoupon, setSelectedCoupon] = useState(null)
    const [paymentMethod, setPaymentMethod] = useState("razorpay");
    const [shippingAddress, setShippingAddress] = useState(true);
    const [billingState, setBillingState] = useState();
    const [billingCity, setBillingCity] = useState();
    const [shippingState, setShippingState] = useState();
    const [shippingCity, setShippingCity] = useState();
    const [formError, setFormError] = useState({});

    const history = useNavigate();

    const handleCheckout = () => {

    }

    useEffect(() => {
        if(coupon && coupons?.length > 0) {
            setSelectedCoupon(coupons.find(cp => cp._id === coupon))
        }

        return () => setSelectedCoupon(null)
    },[coupon, coupons])

  return (
    <>
        <PageBreadcrumb pageTitle="Checkout" prevPage="Cart" />
        <section className="checkout dark">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="checkout-wrap">
                            <div className="card-heading">
                                <h2>Billing Address</h2>
                            </div>
                        </div>
                        <div className="checkout-form mt-md-4 mt-2">
                            <form action="">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="input-wrap">
                                        <input
                                        id="firstName"
                                        type="text"
                                        placeholder="First Name"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="input-wrap">
                                        <input
                                        id="lastName"
                                        type="text"
                                        placeholder="Last Name"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="input-wrap">
                                        <input
                                        id="phone"
                                        type="tel"
                                        placeholder="Mobile Number"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="input-wrap">
                                        <input
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="input-wrap">
                                        <input
                                        id="billingAddress"
                                        type="text"
                                        placeholder="Address"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="input-wrap">
                                        <input
                                        id="billingPincode"
                                        type="tel"
                                        placeholder="Pincode"
                                        />
                                    </div>
                                </div>
                                {/* BILLING STATE CITY */}
                                <div className="col-12">
                                    <div className="input-wrap">
                                        <input
                                        id="gst"
                                        type="text"
                                        placeholder="GST (Optional)"
                                        />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="input-wrap check-box">
                                        <input
                                        type="checkbox"
                                        id="shippingAddressCheck"
                                        // defaultChecked={shippingAddress}
                                        value="on"
                                        />
                                        <label htmlFor="shippingAddress">
                                            Billing address same as Shipping address ?
                                        </label>
                                    </div>
                                </div>
                                <div className={`col-12 ${shippingAddress ? "d-none" : "d-block"}`}>
                                    <div className="card-heading small mb-3">
                                        <h2>Shipping Address</h2>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                        <div className="input-wrap">
                                            <input
                                            id="shippingAddress"
                                            type="text"
                                            placeholder="Address"
                                            />
                                        
                                        </div>
                                        </div>
                                        <div className="col-md-6">
                                        <div className="input-wrap">
                                            <input
                                            id="shippingPincode"
                                            type="tel"
                                            placeholder="Pincode"
                                            />
                                        
                                        </div>
                                        </div>
                                        {/* <ShippingStateCity
                                        setShippingCity={setShippingCity}
                                        setShippingState={setShippingState}
                                        formError={formError}
                                        /> */}
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="card-heading small mb-3">
                                        <h2>Payment Method</h2>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="input-wrap mb-3">
                                        <input
                                        type="radio"
                                        defaultChecked
                                        id="paymentMethod"
                                        />
                                        <label htmlFor="paymentMethod">
                                        Credit / Debit Cards / Netbanking / UPI / Wallets
                                        </label>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="input-wrap mb-0">
                                        <figure className="mb-0">
                                        <img
                                            src="assets/images/checkout/razorpay.svg"
                                            alt=""
                                        />
                                        </figure>
                                    </div>
                                </div>
                            </div>
                            </form>
                        </div>
                    </div>

                    <div className="col-lg-4 mt-5 mt-lg-0">
                        <div className="payment-wrap">
                        <div className="card-heading">
                            <h2>Payment Summary</h2>
                        </div>
                        </div>
                        <div className="payment-summary mt-3 mt-lg-4">
                        <div className="summary-card-body">
                            {coupon && (
                            <div className="key-value-block">
                                <span className="property-name">Coupon Applied</span>
                                <span className="property-value text-success">
                                <em>{selectedCoupon?.code}</em>
                                </span>
                            </div>
                            )}
                            <div className="key-value-block">
                            <span className="property-name">Order Total</span>
                            <span className="property-value">
                                ₹{cartSummary.cartTotal}
                            </span>
                            </div>
                            {cartSummary.discountAmount && (
                            <div className="key-value-block">
                                <span className="property-name">Discount Applied</span>
                                <span className="property-value">
                                - ₹{cartSummary.discountAmount}
                                </span>
                            </div>
                            )}
                            <div className="key-value-block total">
                            <span className="property-name">Grand Total</span>
                            <span className="property-value blue">
                                ₹{cartSummary.grandTotal}
                            </span>
                            </div>
                        </div>
                        <div className="summary-card-footer hasBottomText">
                            <button onClick={handleCheckout} className="redirect-link">
                            Complete Payment
                            </button>
                        </div>
                        <div className="summary-card-bottom-footer">
                            <p>
                            <AiFillLock /> <span> Safe and Secure Payments </span>
                            </p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Checkout