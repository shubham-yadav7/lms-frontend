import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaTelegramPlane,
  FaInstagram,
  FaTelegram,
  FaYoutube,
} from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import BackToTop from "../../helpers/BackToTop";
import { Link } from "react-router-dom";
import PrimaryService from "../../auth/services/PrimaryServices";
import notification from "../../helpers/notification";
import { useForm } from "react-hook-form";

const Footer = () => {
  const {
    formState: { errors },
    register,
    reset,
    handleSubmit,
  } = useForm();

  const newsletterSubmit = async (data) => {
    try {
      const { message } = await PrimaryService.submitNewsletter(data);
      notification("success", message);
      reset();
    } catch (error) {
      console.log(error);
      notification(
        "error",
        error.response
          ? error.response.data.message.split(":")[0]
          : "Something went wrong."
      );
    }
  };

  return (
    <>
      <footer className="pb-5">
        <div className="container">
          <div className="top-footer">
            <div className="row">
              <div className="col-lg-3">
                <div className="footer-details">
                  <Link to="/">
                    <figure className="mb-0">
                      <img
                        src="/assets/images/logos/learnr-logo.png"
                        alt=""
                      />
                    </figure>
                  </Link>
                  <p>
                    The beautiful thing about learning is that nobody can take
                    it away from you.
                  </p>
                  <div className="social-links-wrap">
                    <a href="https://twitter.com/Course_Pe" target={`_blank`}>
                      <FaTwitter />
                    </a>
                    <a
                      href="https://www.facebook.com/coursepe"
                      target={`_blank`}
                    >
                      <FaFacebookF />
                    </a>
                    <a
                      href="https://www.instagram.com/course_pe/"
                      target={`_blank`}
                    >
                      <FaInstagram />
                    </a>
                    <a href="https://t.me/learnmoreindia" target={`_blank`}>
                      <FaTelegram />
                    </a>
                    <a
                      href="https://www.youtube.com/learnmoreeasily"
                      target={`_blank`}
                    >
                      <FaYoutube />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 pl-lg-5 mt-5 mt-lg-0">
                <div className="footer-links-wrap">
                  <div className="footer-link-header">
                    <h4>about us</h4>
                  </div>
                  <ul>
                    <li>
                      <Link to="/">home</Link>
                    </li>
                    <li>
                      <Link to="/about">about us</Link>
                    </li>
                    <li>
                      <Link to="/contact">contact us</Link>
                    </li>
                    <li>
                      <Link to="/privacy-policy">privacy policy</Link>
                    </li>
                    <li>
                      <Link to="/terms-and-conditions">terms & conditions</Link>
                    </li>
                    <li>
                      <Link to="/refund-policy">refunds policy</Link>
                    </li>
                    <li>
                      <Link to="/shipping-delivery-policy">
                        Shipping & Delivery Policy
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 mt-sm-5 mt-4 mt-lg-0">
                <div className="footer-links-wrap">
                  <div className="footer-link-header">
                    <h4>Browse Courses</h4>
                  </div>
                  <ul>
                    <li>
                      <Link to="/courses">All courses</Link>
                    </li>
                    <li>
                      <Link to="/bundle-courses">Bundled courses</Link>
                    </li>
                    <li>
                      <Link to="/products">All Products</Link>
                    </li>
                    <li>
                      <Link to="/book-courses">Books </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 mt-4 mt-lg-0">
                <div className="footer-links-wrap">
                  <div className="footer-link-header">
                    <h4>download our app</h4>
                  </div>

                  <div className="os-btn-wrap footer-os">
                    <a className="os-btn mac" href="FIXME:">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        viewBox="0 0 496.255 608.728"
                      >
                        <path d="M273.81 52.973C313.806.257 369.41 0 369.41 0s8.271 49.562-31.463 97.306c-42.426 50.98-90.649 42.638-90.649 42.638s-9.055-40.094 26.512-86.971zM252.385 174.662c20.576 0 58.764-28.284 108.471-28.284 85.562 0 119.222 60.883 119.222 60.883s-65.833 33.659-65.833 115.331c0 92.133 82.01 123.885 82.01 123.885s-57.328 161.357-134.762 161.357c-35.565 0-63.215-23.967-100.688-23.967-38.188 0-76.084 24.861-100.766 24.861C89.33 608.73 0 455.666 0 332.628c0-121.052 75.612-184.554 146.533-184.554 46.105 0 81.883 26.588 105.852 26.588z" />
                      </svg>
                      <div className="os-content">
                        <small>download on the</small>
                        <p>app store</p>
                      </div>
                    </a>
                    <a
                      className="os-btn"
                      href="https://play.google.com/store/apps/details?id=com.ideamagix.coursepe"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src="/assets/images/homepage/cta/play-store.png"
                        alt=""
                      />
                      <div className="os-content">
                        <small>get it on</small>
                        <p>google play</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom-footer mt-5">
            <div className="row align-items-center">
              <div className="col-lg-4 col-md-6 order-3 order-lg-0">
                <div className="copy-rights">
                  <p>Copyright {new Date().getFullYear()} One-LMS.</p>
                  <p>
                    All rights reserved. Designed By{" "}
                    <a
                      href="https://www.ideamagix.com/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {" "}
                      Ideamagix{" "}
                    </a>
                    .
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 order-2">
                <div className="footer-connect">
                  <p>Have a question? Call us</p>
                  <a href="tel:+918591597259">+91 85915 97259</a>
                </div>
              </div>
              <div className="col-lg-5 order-0 order-lg-3">
                <div className="subscribe-wrap">
                  <form onSubmit={handleSubmit(newsletterSubmit)}>
                    <input
                      type="email"
                      {...register("email", { required: true })}
                      placeholder="Enter Email"
                    />
                    {errors?.email && (
                      <span className="errorSpan" style={{ bottom: "-30px" }}>
                        {errors?.email}
                      </span>
                    )}
                    <span className="email-icon">
                      <MdOutlineMailOutline />
                    </span>
                    <button type="submit">
                      <span className="btn-text"> Subscribe </span>
                      <span>
                        <FaTelegramPlane />
                      </span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="moving-elem bg-circle">
          <img
            className="circleLeftRight"
            src="/assets/images/homepage/footer/footer-top-bg.png"
            alt=""
          />
        </div>
        <div className="moving-elem bg-logo">
          <img src="/assets/images/homepage/footer/footer-bg.png" alt="" />
        </div>
        <ToastContainer />
      </footer>
      <BackToTop />
    </>
  );
};

export default Footer;
