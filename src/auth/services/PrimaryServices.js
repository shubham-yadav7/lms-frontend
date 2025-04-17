import fetch from "../FetchInterceptor";

let PrimaryService = {};

// Get Announcement
PrimaryService.fetchAnnouncement = () => {
  return fetch({
    url: "/announcement",
    method: "GET",
    headers: {
      "public-request": "true",
    },
  });
};

PrimaryService.searchItems = (data) => {
  return fetch({
    url: `/search?query=${data}`,
    method: "GET",
    headers: {
      "public-request": "true",
    },
  });
};

PrimaryService.getAllBanners = (type) => {
  return fetch({
    url: `/banner/list?type=${type}`,
    method: "GET",
    headers: {
      "public-request": "true",
    },
  });
};

PrimaryService.getAllTestimonials = () => {
  return fetch({
    url: "/testimonial/list",
    method: "GET",
    headers: {
      "public-request": "true",
    },
  });
};

PrimaryService.feedBackVideos = () => {
  return fetch({
    url: "/feedback/list",
    method: "GET",
    headers: {
      "public-request": "true",
    },
  });
};

PrimaryService.submitNewsletter = (data) => {
  return fetch({
    url: "/newsletter/add",
    method: "POST",
    data,
    headers: {
      "public-request": "true",
    },
  });
};

PrimaryService.contactRequest = (data) => {
  return fetch({
    url: "/contact/add",
    method: "POST",
    data,
    headers: {
      "public-request": "true",
    },
  });
};

PrimaryService.getAllFaqs = (category) => {
  return fetch({
    url: `/faq/list?category=${category}`,
    method: "GET",
    headers: {
      "public-request": "true",
    },
  });
};

export default PrimaryService;
