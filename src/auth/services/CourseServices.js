import fetch from "../FetchInterceptor";

let CourseServices = {};

CourseServices.fetchCoursesCategories = () => {
  return fetch({
    url: `course/categories/list`,
    method: "GET",
    headers: {
      "public-request": "true",
    },
  });
};

CourseServices.fetchCourses = (type) => {
  return fetch({
    url: `/course/list`,
    method: "GET",
    headers: {
      "public-request": "true",
    },
  });
};

CourseServices.fetchCoursesWithPagination = (data) => {
  let searchParams = new URLSearchParams(data);
  return fetch({
    url: `localhost:80000/course/paginate-list?${searchParams}`,
    method: "GET",
    headers: {
      "public-request": "true",
    },
  });
};

CourseServices.startCourse = (id) => {
  return fetch({
    url: `localhost:80000/course/start-course/${id}`,
    method: "GET",
  });
};

CourseServices.fetchCourse = (slug) => {
  return fetch({
    url: `localhost:80000/course/${slug}`,
    method: "GET",
    headers: {
      "public-request": "true",
    },
  });
};

export default CourseServices;
