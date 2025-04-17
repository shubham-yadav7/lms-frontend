import React from "react";
import { Link } from "react-router-dom";

const AboutCourse = () => {
  return (
    <section className="about-course">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="about-course-img">
              <figure className="mb-0">
                <img src="assets/images/homepage/about/about.png" alt="" />
              </figure>
              <div className="about-left-img">
                <img
                  className="up-down"
                  src="assets/images/homepage/about/about_dots.png"
                  alt=""
                />
              </div>
              <div className="about-right-img">
                <img
                  className="up-down delay"
                  src="assets/images/homepage/about/about_dots2.png"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6 pl-lg-4 mt-5 mt-lg-0">
            <div className="about-course-text">
              <div className="heading">
                <span className="tag">About Course</span>
                <h2>Learn Skill courses and Transform your life</h2>
                <p>
                  Learn new skills, 100% online and in your own time, with
                  experts
                </p>
              </div>
              <div className="about-course-pointers">
                <p>
                  Learn from basic to advance Skill courses and shape your
                  career with Professional Certificates, and Most Demanding
                  Skill.
                </p>
                <ul>
                  <li>
                    <span>
                      <img
                        src="assets/images/homepage/about/about_tick.png"
                        alt=""
                      />
                    </span>
                    <p>Learn any time any where</p>
                  </li>
                  <li>
                    <span>
                      <img
                        src="assets/images/homepage/about/about_tick.png"
                        alt=""
                      />
                    </span>
                    <p>ISO Certified Courses</p>
                  </li>
                  <li>
                    <span>
                      <img
                        src="assets/images/homepage/about/about_tick.png"
                        alt=""
                      />
                    </span>
                    <p>Practice Material Available</p>
                  </li>
                  <li>
                    <span>
                      <img
                        src="assets/images/homepage/about/about_tick.png"
                        alt=""
                      />
                    </span>
                    <p>Learn From Professionals.</p>
                  </li>
                </ul>
                <Link to="/about" className="redirect-link green filled">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCourse;
