import React, { lazy, useEffect, useState } from "react";
import notification from "../../helpers/notification.js";
import CourseServices from "../../auth/services/CourseServices.js";

const Banner = lazy(() => import("../../components/homeComponents/Banner"));
const CoursesSlider = lazy(() =>
  import("../../components/homeComponents/CoursesSlider")
);
const Categories = lazy(() =>
  import("../../components/homeComponents/Categories")
);
const AboutCourse = lazy(() =>
  import("../../components/homeComponents/AboutCourse")
);
const Benefits = lazy(() => import("../../components/homeComponents/Benefits"));
const Testimonials = lazy(() =>
  import("../../components/homeComponents/Testimonials")
);
const Feedback = lazy(() => import("../../components/homeComponents/Feedback"));
const DownloadApp = lazy(() =>
  import("../../components/homeComponents/DownloadApp")
);

const Home = () => {
  const [popularCourses, setPopularCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const { courses } = await CourseServices.fetchCourses();
      console.log("COURSES", courses);
      setPopularCourses(courses);
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
    fetchCourses();
  }, []);

  return (
    <>
      <Banner />
      <CoursesSlider
        subHeading="courses"
        heading="popular courses"
        courses={popularCourses}
        link="/courses"
        type={"popular"}
      />
      {/* <Categories /> */}
      <AboutCourse />
      <Benefits />
     
     
      <DownloadApp />
    </>
  );
};

export default Home;
