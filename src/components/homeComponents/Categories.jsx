import React from "react";
import { useSelector } from "react-redux";

const Categories = () => {
  const { courseCategories } = useSelector((state) => state.course);

  return (
    <section className="categories">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <div className="heading center white">
              <span className="tag">explore</span>
              <h2>top categories</h2>
            </div>
          </div>
        </div>

        <div className="categories-wrap mt-5">
          <div className="row justify-content-center">
            {courseCategories.map((c, i) => (
              <div
                key={i}
                className="col-lg-4 px-4 px-sm-2 col-md-6 mb-sm-5 mb-4"
              >
                <a
                  href={`courses/category/${c.slug}`}
                  className="categories-card"
                >
                  <div className="categories-img">
                    <img
                      src={`${process.env.REACT_APP_BACKEND_URL}/uploads/category/${c?.icon}`}
                      alt=""
                    />
                  </div>
                  <div className="categories-text">
                    <h5>{c?.title}</h5>
                    <p>{c?.excerpt}</p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="left-lg-dots">
        <img
          className="up-down"
          src="assets/images/homepage/categories/bg_dots.png"
          alt=""
        />
      </div>
      <div className="right-lg-dots">
        <img
          className="up-down"
          src="assets/images/homepage/categories/bg_dots.png"
          alt=""
        />
      </div>
      <div className="bg-circle">
        <img
          className="circleLeftRight"
          src="assets/images/homepage/categories/bg_ellipse.png"
          alt=""
        />
      </div>
    </section>
  );
};

export default Categories;
