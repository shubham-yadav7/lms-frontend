import React from "react";

const DownloadApp = () => {
  return (
    <section className="download-app pb-0">
      <div className="container">
        <div className="row">
          <div className="col-lg-7">
            <div className="heading">
              <span className="tag">interested?</span>
              <h2>download our free app</h2>
              <p>
                Download the lessons and learn anytime, anywhere from the free
                courses available on our app
              </p>
            </div>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-lg-7 order-1 order-lg-0 mt-4 mt-lg-0 ">
            <figure className="mb-0 phone-img">
              <img src="assets/images/homepage/cta/cts-phone.png" alt="" />
            </figure>
          </div>
          <div className="col-lg-5 mt-5 mt-lg-0 order-0 order-lg-1">
            <div className="qr-code-wrap">
              <div className="qr-code-text">
                <p>
                  Scan this QR code on your camera{" "}
                  <span className="d-block"> app to download the app </span>
                </p>
              </div>
              <div className="qr-code-img">
                <figure className="mb-0">
                  <img src="assets/images/homepage/coursepe_qr.png" alt="" />
                </figure>
              </div>
              <p className="divider">OR</p>
              <div className="os-btn-wrap">
                <a
                  className="os-btn"
                  href="https://play.google.com/store/apps/details?id=com.ideamagix.coursepe"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src="assets/images/homepage/cta/playstore.png" alt="" />
                  <div className="os-content">
                    <small>get it on</small>
                    <p>google play</p>
                  </div>
                </a>
                <a className="os-btn mac ml-2" href="FIXME:">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    viewBox="0 0 496.255 608.728"
                  >
                    <path
                      d="M273.81 52.973C313.806.257 369.41 0 369.41 0s8.271 49.562-31.463 97.306c-42.426 50.98-90.649 42.638-90.649 42.638s-9.055-40.094 26.512-86.971zM252.385 174.662c20.576 0 58.764-28.284 108.471-28.284 85.562 0 119.222 60.883 119.222 60.883s-65.833 33.659-65.833 115.331c0 92.133 82.01 123.885 82.01 123.885s-57.328 161.357-134.762 161.357c-35.565 0-63.215-23.967-100.688-23.967-38.188 0-76.084 24.861-100.766 24.861C89.33 608.73 0 455.666 0 332.628c0-121.052 75.612-184.554 146.533-184.554 46.105 0 81.883 26.588 105.852 26.588z"
                      fill="#fff"
                    />
                  </svg>
                  <div className="os-content">
                    <small>download on the</small>
                    <p>app store</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="moving-elem cta-bg-circle">
        <img
          className="circleLeftRight"
          src="assets/images/homepage/cta/cta_circle.png"
          alt=""
        />
      </div>
      <div className="moving-elem cta-bg-dot-1">
        <img
          className="up-down"
          src="assets/images/homepage/cta/about_dots.png"
          alt=""
        />
      </div>
      <div className="moving-elem cta-bg-dot-2">
        <img
          className="up-down delay"
          src="assets/images/homepage/cta/about_dots2.png"
          alt=""
        />
      </div>
    </section>
  );
};

export default DownloadApp;
