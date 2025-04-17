import fetch from "../FetchInterceptor";

let BundleServices = {};

BundleServices.getAllBundles = (data) => {
  let searchParams = new URLSearchParams(data);
  return fetch({
    url: `/course-bundle/list?${searchParams}`,
    method: "GET",
    headers: {
      "public-request": "true",
    },
  });
};

BundleServices.fetchBundleBySlug = (slug) => {
  return fetch({
    url: `/course-bundle/${slug}`,
    method: "GET",
    headers: {
      "public-request": "true",
    },
  });
};

export default BundleServices;
