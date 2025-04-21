import React, { useContext, useEffect, useState } from "react";
// import PageBreadcrumb from "../components/PageBreadcrumb";
import { AiFillLock } from "react-icons/ai";
import Select from "react-select";
import { Link } from "react-router-dom";
// import AppContext from "../Context/AppContext";
// import ApiService from "../services/ApiService";
import { useLocation, useNavigate } from "react-router-dom";
// import notification from "../helpers/notification";
import axios from "axios";
import PageBreadcrumb from "../../components/commonComponents/PageBreadcrumb";
import { useSelector } from "react-redux";
import notification from "../../helpers/notification";
// import BillingStateCity from "../components/BillingStateCity";
// import ShippingStateCity from "../components/ShippingStateCity";
// import Footer from "../components/Footer";

const Checkout = () => {

    const {cartSummary, cart, coupon, coupons} = useSelector(state => state.inventory)
    const { user } = useSelector((state) => state.auth);
    const [selectedCoupon, setSelectedCoupon] = useState(null)
    const [paymentMethod, setPaymentMethod] = useState("razorpay");
    const [shippingAddress, setShippingAddress] = useState(true);
    const [billingState, setBillingState] = useState();
    const [billingCity, setBillingCity] = useState();
    const [shippingState, setShippingState] = useState();
    const [shippingCity, setShippingCity] = useState();
    const [formError, setFormError] = useState({});

    const navigate = useNavigate();

    console.log(cartSummary, "summary")

    const handleCheckout = async (info) => {

          const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/inventory/create-order`, {
            amount: info.grandTotal * 100, // amount in paisa
            cartItems: info.cartItems,
          });

  const options = {
    key: process.env.REACT_APP_RAZORPAY_KEY,
    amount: data.order.amount,
    currency: "INR",
    name: "Learnr",
    description: "Course Purchase",
    order_id: data.order.id,
    handler: async (response) => {
    
       try {
         const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/inventory/verify-payment`, {
           response,
           cartItems: info.cartItems,
           user
         });

         // ✅ Show success message from backend
         notification("success", res.data.message || "Payment successful!");

         // Optionally: Redirect to a success page or course dashboard
         navigate("/my-courses");
       } catch (error) {
         console.error("Payment verification failed:", error);
         notification("error", "Something went wrong while verifying payment.");
       }
    },
    prefill: {
      name: user.name,
      email: user.email,
    },
    theme: {
      color: "#3399cc",
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();

  rzp.on("payment.failed", function (response) {
    alert("Payment Failed: " + response.error.description);
  });
        
    }

    useEffect(() => {
        if(coupon && coupons?.length > 0) {
            setSelectedCoupon(coupons.find(cp => cp._id === coupon))
        }

        return () => setSelectedCoupon(null)
    },[coupon, coupons])

    console.log(cart);

  return (
    <>
      <PageBreadcrumb pageTitle="Checkout" prevPage="Cart" />
      <section className="checkout dark">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="checkout-wrap">
                <div className="card-heading">
                  <h2>Courses</h2>
                </div>
                <div className="row mt-4">
                  {cart?.map(({ item }) => (
                    <div className="col-lg-6">
                      <div className="course-item" key={item._id}>
                        <Link to={`/course/${item?.slug}`}>
                          <figure className="mb-0">
                            <img
                              src={`${process.env.REACT_APP_BACKEND_URL}/uploads/courses/thumbnails/${item.thumbnailImage}`}
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
                              <img
                                src="/assets/images/homepage/courses/clipboard_icon.png"
                                alt=""
                              />
                              <span>{item?.totalLessons} Total Lessons</span>
                            </div>
                            <div className="course-detail">
                              <span>{item?.level} </span>
                            </div>
                          </div>

                          <Link
                            to={`/course/${item?.slug}`}
                            className="course-title d-block"
                          >
                            <h4>{item.title}</h4>
                          </Link>

                          <div className="course-price-wrap">
                            <div className="course-price">
                              <h5>
                                ₹{item.discountedPrice}{" "}
                                <span className="og-price">₹{item.price}</span>
                              </h5>
                            </div>
                          </div>

                          <a
                            className="view-course-btn custom-btn d-block d-sm-none"
                            href={`/course/${item.slug}`}
                          >
                            View Course
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
                  <button
                    onClick={() => handleCheckout(cartSummary)}
                    className="redirect-link"
                  >
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
  );
}

export default Checkout