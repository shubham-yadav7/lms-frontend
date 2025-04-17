import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import notification from "../../helpers/notification";
import PrimaryService from "../../auth/services/PrimaryServices";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  const getAllTestimonials = async () => {
    try {
      const { testimonials } = await PrimaryService.getAllTestimonials();
      setTestimonials(testimonials);
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

  useEffect(() => {
    getAllTestimonials();
  }, []);

  return (
    <section className="testimonials">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="heading center">
              <span className="tag">Testimonials</span>
              <h2>
                Learn The Secrets To Life Success, These People Have Got The Key
              </h2>
            </div>
          </div>
        </div>
        <div className="testimonial-wrap mt-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <figure className="mb-0 testimonial-img">
                <img
                  src="assets/images/homepage/testimonials/left_bg.jpg"
                  alt=""
                />
              </figure>
              <div className="moving-elem test-left-img">
                <img
                  className="up-down"
                  src="assets/images/homepage/testimonials/test_dots2.png"
                  alt=""
                />
              </div>
              <div className="moving-elem test-right-img">
                <img
                  className="up-down delay"
                  src="assets/images/homepage/testimonials/test_dots.png"
                  alt=""
                />
              </div>
            </div>
            <div className="col-lg-6 mt-5 mt-lg-0">
              <div className="testimonial-slider-wrap">
                <div className="quote">
                  <img
                    src="assets/images/homepage/testimonials/quotes_icon.png"
                    alt=""
                  />
                </div>
                <Splide
                  className="testimonial-slider"
                  options={{
                    type: "loop",
                    arrows: false,
                    gap: 30,
                    snap: true,
                    interval: 5000,
                    autoplay: true,
                    pauseOnHover: true,
                    autoplaySpeed: 100,
                    speed: 3000,
                  }}
                >
                  {testimonials?.map((test, i) => (
                    <SplideSlide key={i}>
                      <div className="item">
                        <p
                          dangerouslySetInnerHTML={{
                            __html: test?.description,
                          }}
                        ></p>
                        <div className="author">
                          <div className="author-img">
                            <img
                              src={`${process.env.REACT_APP_BACKEND_URL}/uploads/testimonials/${test.profile}`}
                              alt=""
                            />
                          </div>
                          <div className="author-details">
                            <h5>{test?.name}</h5>
                            <p>{test?.designation}</p>
                          </div>
                        </div>
                      </div>
                    </SplideSlide>
                  ))}
                </Splide>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="test-bg-circle-right moving-elem">
        <img
          className="circleLeftRight"
          src="assets/images/homepage/testimonials/ellipse_right.png"
          alt=""
        />
      </div>
      <div className="test-bg-circle-bottom moving-elem">
        <img
          className="circleLeftRight"
          src="assets/images/homepage/testimonials/ellipse_right.png"
          alt=""
        />
      </div>
    </section>
  );
};

export default Testimonials;
