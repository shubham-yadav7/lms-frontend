import React, { lazy } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { Splide, SplideSlide } from "@splidejs/react-splide";

const CourseCard = lazy(() => import("../commonComponents/CourseCard"));

const CoursesSlider = ({
  subHeading,
  heading,
  courses,
  link,
  padding,
  type,
}) => {
  return (
    <section className={`popular-courses ${padding ? "py-5" : ""}`}>
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-sm-6">
            <div className="heading">
              <span className="tag">{subHeading}</span>
              <h2>{heading}</h2>
            </div>
          </div>
          <div className="col-sm-6 d-sm-block d-none">
            <div className="course-link-wrap">
              <Link to={link} className="redirect-link">
                view all courses
              </Link>
            </div>
          </div>
        </div>
        {courses.length === 0 ? (
          <div className="card-skeleton mt-4">
            <div className="row">
              <div className="col-lg-4">
                <div className="skeleton-card">
                  <Skeleton className="avatar-skeleton card-img" />
                  <div className="d-flex justify-content-between mt-3">
                    <Skeleton className="avatar-skeleton small-text" />
                    <Skeleton className="avatar-skeleton small-text" />
                  </div>
                  <div className="mt-3">
                    <Skeleton className="avatar-skeleton main-text mb-1" />
                    <Skeleton className="avatar-skeleton main-text half" />
                  </div>
                  <div className="d-flex justify-content-between mt-3">
                    <Skeleton className="avatar-skeleton small-text" />
                    <Skeleton className="avatar-skeleton small-text" />
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="skeleton-card">
                  <Skeleton className="avatar-skeleton card-img" />
                  <div className="d-flex justify-content-between mt-3">
                    <Skeleton className="avatar-skeleton small-text" />
                    <Skeleton className="avatar-skeleton small-text" />
                  </div>
                  <div className="mt-3">
                    <Skeleton className="avatar-skeleton main-text mb-1" />
                    <Skeleton className="avatar-skeleton main-text half" />
                  </div>
                  <div className="d-flex justify-content-between mt-3">
                    <Skeleton className="avatar-skeleton small-text" />
                    <Skeleton className="avatar-skeleton small-text" />
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="skeleton-card">
                  <Skeleton className="avatar-skeleton card-img" />
                  <div className="d-flex justify-content-between mt-3">
                    <Skeleton className="avatar-skeleton small-text" />
                    <Skeleton className="avatar-skeleton small-text" />
                  </div>
                  <div className="mt-3">
                    <Skeleton className="avatar-skeleton main-text mb-1" />
                    <Skeleton className="avatar-skeleton main-text half" />
                  </div>
                  <div className="d-flex justify-content-between mt-3">
                    <Skeleton className="avatar-skeleton small-text" />
                    <Skeleton className="avatar-skeleton small-text" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Splide
            className="courses-slider"
            options={{
              type: "slide",
              arrows: false,
              perPage: 3,
              gap: 30,
              breakpoints: {
                0: { perPage: 1 },
                760: { perPage: 1 },
                991: { perPage: 2 },
              },
              interval: 5000,
              autoplay: true,
              perMove: 1,
              autoplaySpeed: 100,
              speed: 3000,
            }}
          >
            {type === "popular" ? (
              <>
                {courses?.map((item, i) => (
                  <SplideSlide key={i}>
                    <CourseCard
                      course={item}
                      // TODO: keep in mind - need to add class in learning page || integrate user purchase courses
                    />
                  </SplideSlide>
                ))}
              </>
            ) : (
              <>
                {type === "course" ? (
                  <>{/* My Learning Card for course */}</>
                ) : (
                  <>{/* My Learning Card for rest */}</>
                )}
              </>
            )}
          </Splide>
        )}

        <div className="row mt-4 d-block d-sm-none">
          <div className="col-12">
            <div className="course-link-wrap">
              <Link to={link} className="redirect-link">
                view all courses
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesSlider;
