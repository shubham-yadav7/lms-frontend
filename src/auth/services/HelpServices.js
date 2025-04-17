import fetch from "../FetchInterceptor";

let HelpServices = {};

HelpServices.fetchHelp = (data) => {
  let searchParams = new URLSearchParams(data);
  return fetch({
    url: `/help/list?${searchParams}`,
    method: "GET",
    headers: {
      "public-request": "true",
    },
  });
};

HelpServices.getHelpDetails = (slug) => {
  return fetch({
    url: `/help/${slug}`,
    method: "GET",
    headers: {
      "public-request": "true",
    },
  });
};

export default HelpServices;
