import fetch from "../FetchInterceptor";

let ProductServices = {};

ProductServices.fetchAllProducts = (data) => {
  let searchParams = new URLSearchParams(data);
  return fetch({
    url: `/product/list?${searchParams}`,
    method: "GET",
    headers: {
      "public-request": "true",
    },
  });
};

ProductServices.fetchProductBySlug = (slug) => {
  return fetch({
    url: `/product/${slug}`,
    method: "GET",
    headers: {
      "public-request": "true",
    },
  });
};

export default ProductServices;
