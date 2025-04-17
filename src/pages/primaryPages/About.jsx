import React from "react";
import PageHeader from "../../components/commonComponents/PageHeader";
import { FiFlag } from "react-icons/fi";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { SiElectron } from "react-icons/si";
import { BsShieldLock } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import {
  MdOutlineOndemandVideo,
  MdFileCopy,
  MdQuiz,
  MdLaptopMac,
  MdOutlineLockClock,
} from "react-icons/md";

const About = () => {
  return (
    <>
      <PageHeader type="About us" />
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
                  <span className="tag">About Us</span>
                  <h2>About One-LMS</h2>
                  <p>
                  One-LMS Provides Online Computer Education to students
                    through their Prerecorded courses.
                  </p>
                </div>
                <div className="about-course-pointers">
                  <p>
                    Welcome to One-LMS – The E-Learning Platform by , our main
                    objective is to make computer education available in Hindi
                    language in the simplest way. This can be a perfect way to
                    improve your computer skills even more. Through this Portal
                    you can do online professional computer courses right from
                    home. Such as Data Entry, Dashboard Making, Data Science,
                    Graphic Designing, Web Designing, MS-Office, Video Editing,
                    Accounting Like Tally Prime, Blogging, YouTube Mastery etc.
                  </p>
                  <p className="mt-3">
                    The founder of One-LMS Portal has over 15 years of
                    experience in the field of computer education, he has been
                    promoting computer education through his blog www.learn more
                    india.in and YouTube channel Learn More with 1.4 M+
                    subscribers for more than 5 years now. 1 Gold Play and 5
                    Silver Play Awards have been awarded by YouTube for his Six
                    YouTube Channels. Learn More YouTube channel provides
                    tutorials related to computer and technology in the Hindi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="our-team dark">
        <div className="container">
          <div className="heading center">
            <span className="tag">Our Team</span>
            <h2>Meet the Team</h2>
            <p>
              One-LMS Provides Online Computer Education to the students
              through Live and Prerecorded Videos.
            </p>
          </div>
          <div className="team-cards-wrapper mt-5">
            <div className="row justify-content-center">
              <div className="col-lg-3">
                <div className="team-card">
                  <figure>
                    <img
                      src="assets/images/common/avatar.png"
                      className="w-100"
                      alt="Name"
                    />
                  </figure>
                  <span className="d-block h4">Satish Dhawale</span>
                  <span className="designation">Founder</span>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="team-card">
                  <figure>
                    <img
                      src="assets/images/common/avatar.png"
                      className="w-100"
                      alt="Name"
                    />
                  </figure>
                  <span className="d-block h4">Priyanka Dhawale</span>
                  <span className="designation">Co-Founder</span>
                </div>
              </div>
            </div>
            <div className="heading center py-4">
              <h2>Our Superhero's</h2>
            </div>
            <div className="row">
              <div className="col-lg-3">
                <div className="team-card">
                  <figure>
                    <img
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = "assets/images/common/avatar.png";
                      }}
                      src="assets/images/common/avatar.png"
                      className="w-100"
                      alt="Name"
                    />
                  </figure>
                  <span className="d-block h4">Bhushan Bhere</span>
                  <span className="designation">CMO</span>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="team-card">
                  <figure>
                    <img
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = "assets/images/common/avatar.png";
                      }}
                      src="assets/images/common/avatar.png"
                      className="w-100"
                      alt="Name"
                    />
                  </figure>
                  <span className="d-block h4">Ramjeevan Sharma</span>
                  <span className="designation">COO</span>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="team-card">
                  <figure>
                    <img
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = "assets/images/common/avatar.png";
                      }}
                      src="assets/images/common/avatar.png"
                      className="w-100"
                      alt="Name"
                    />
                  </figure>
                  <span className="d-block h4">Murari Pawar</span>
                  <span className="designation">Video Editor</span>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="team-card">
                  <figure>
                    <img
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = "assets/images/common/avatar.png";
                      }}
                      src="assets/images/common/avatar.png"
                      className="w-100"
                      alt="Name"
                    />
                  </figure>
                  <span className="d-block h4">Manali Jaygade</span>
                  <span className="designation">Graphic Designer</span>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="team-card">
                  <figure>
                    <img
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = "assets/images/common/avatar.png";
                      }}
                      src="assets/images/common/avatar.png"
                      className="w-100"
                      alt="Name"
                    />
                  </figure>
                  <span className="d-block h4">Akash Zine</span>
                  <span className="designation">CSE</span>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="team-card">
                  <figure>
                    <img
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = "assets/images/common/avatar.png";
                      }}
                      src="assets/images/common/avatar.png"
                      className="w-100"
                      alt="Name"
                    />
                  </figure>
                  <span className="d-block h4">Jignesh Mhatre</span>
                  <span className="designation">CSE</span>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="team-card">
                  <figure>
                    <img
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = "assets/images/common/avatar.png";
                      }}
                      src="assets/images/common/avatar.png"
                      className="w-100"
                      alt="Name"
                    />
                  </figure>
                  <span className="d-block h4">Vijay Zine</span>
                  <span className="designation">Accountant</span>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="team-card">
                  <figure>
                    <img
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = "assets/images/common/avatar.png";
                      }}
                      src="assets/images/common/avatar.png"
                      className="w-100"
                      alt="Name"
                    />
                  </figure>
                  <span className="d-block h4">Smita Patil</span>
                  <span className="designation">Content Writer</span>
                </div>
              </div>
            </div>
          </div>
          <div className="what-we-offer-cards mt-5 d-none">
            <div className="row">
              <div className="col-lg-3 col-sm-6 mb-4 mb-lg-0">
                <div className="what-we-offer-card purple">
                  <div className="offer-icon">
                    <FiFlag />
                  </div>
                  <div className="offer-title">
                    <h4>Expert Instruction</h4>
                  </div>
                  <div className="offer-desc">
                    <p>
                      Fusce tempor, tortor vehicula posuere, mi est iaculis
                      quam, nec luctus enim.
                    </p>
                  </div>
                  <div className="offer-link">
                    <Link to="FIXME:">
                      Learn More <BsArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 mb-4 mb-lg-0">
                <div className="what-we-offer-card orange">
                  <div className="offer-icon">
                    <SiElectron />
                  </div>
                  <div className="offer-title">
                    <h4>Expert Instruction</h4>
                  </div>
                  <div className="offer-desc">
                    <p>
                      Fusce tempor, tortor vehicula posuere, mi est iaculis
                      quam, nec luctus enim.
                    </p>
                  </div>
                  <div className="offer-link">
                    <Link to="FIXME:">
                      Learn More <BsArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 mb-4 mb-md-0">
                <div className="what-we-offer-card blue">
                  <div className="offer-icon">
                    <BsShieldLock />
                  </div>
                  <div className="offer-title">
                    <h4>Expert Instruction</h4>
                  </div>
                  <div className="offer-desc">
                    <p>
                      Fusce tempor, tortor vehicula posuere, mi est iaculis
                      quam, nec luctus enim.
                    </p>
                  </div>
                  <div className="offer-link">
                    <Link to="FIXME:">
                      Learn More <BsArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="what-we-offer-card red">
                  <div className="offer-icon">
                    <IoSettingsOutline />
                  </div>
                  <div className="offer-title">
                    <h4>Expert Instruction</h4>
                  </div>
                  <div className="offer-desc">
                    <p>
                      Fusce tempor, tortor vehicula posuere, mi est iaculis
                      quam, nec luctus enim.
                    </p>
                  </div>
                  <div className="offer-link">
                    <Link to="FIXME:">
                      Learn More <BsArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="app-benefits">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="heading center">
                <span className="tag">benefits</span>
                <h2>Benefits Of Our App</h2>
                <p>
                  The online learning method is the best solution for everyone.
                </p>
              </div>
            </div>
          </div>
          <div className="benefits-wrap mt-5">
            <div className="row">
              <div className="col-lg-6 mb-5">
                <div className="benefits-card purple">
                  <div className="ben-icon">
                    <MdOutlineOndemandVideo />
                  </div>
                  <div className="ben-content">
                    <h4>Powerful Video tutorial</h4>
                    <p>
                      All video lectures are taught from Basic to Advanced
                      level.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-5">
                <div className="benefits-card orange">
                  <div className="ben-icon">
                    <MdFileCopy />
                  </div>
                  <div className="ben-content">
                    <h4>Practice Notes /Files</h4>
                    <p>
                      Practice files and notes will be provided in all courses.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-5">
                <div className="benefits-card red">
                  <div className="ben-icon">
                    <MdQuiz />
                  </div>
                  <div className="ben-content">
                    <h4>Computer Quiz/Mock test</h4>
                    <p>
                      You can take Quiz/Mock test before the Final test to check
                      knowledge
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-5">
                <div className="benefits-card blue">
                  <div className="ben-icon">
                    <MdLaptopMac />
                  </div>
                  <div className="ben-content">
                    <h4>Computer E-books</h4>
                    <p>
                      You can Access Different Types of E-Books for Study
                      Purpose
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-5 mb-lg-0">
                <div className="benefits-card skyblue">
                  <div className="ben-icon">
                    <AiFillSafetyCertificate />
                  </div>
                  <div className="ben-content">
                    <h4>Course Completion Certificate</h4>
                    <p>
                      Upon completion of the course, you will be Awarded an ISO
                      Certificate.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="benefits-card random">
                  <div className="ben-icon">
                    <MdOutlineLockClock />
                  </div>
                  <div className="ben-content">
                    <h4>Course Validity</h4>
                    <p>Our courses will be accessible for up to 2 years</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
