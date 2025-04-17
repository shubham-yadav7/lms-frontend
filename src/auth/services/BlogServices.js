import fetch from "../FetchInterceptor";

let BlogServices = {};

BlogServices.getAllBlogs = (query) => {
  return fetch({
    url: `/blog/list?page=${query.page}&tag=${query.tag}&category=${query.category}`,
    method: "GET",
    headers: {
      "public-request": "true",
    },
  });
};

BlogServices.getBlogDetails = (slug) => {
  return fetch({
    url: `/blog/${slug}`,
    method: "GET",
    headers: {
      "public-request": "true",
    },
  });
};

BlogServices.getTag = (slug) => {
  return fetch({
    url: `/blog/tag/${slug}`,
    method: "GET",
    headers: {
      "public-request": "true",
    },
  });
};

BlogServices.getCategory = (slug) => {
  return fetch({
    url: `/blog/category/${slug}`,
    method: "GET",
    headers: {
      "public-request": "true",
    },
  });
};

export default BlogServices;
