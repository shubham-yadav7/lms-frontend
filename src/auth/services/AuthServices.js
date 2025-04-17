import fetch from "../FetchInterceptor";

let AuthServices = {};

AuthServices.fetchUser = () => {
  return fetch({
    url: `/auth/user-details`,
    method: "GET",
  });
};

AuthServices.updateProfile = ({ type, ...rest }) => {
  return fetch({
    url: `/auth/update-profile?type=${type}`,
    method: "POST",
    data: rest,
  });
};

AuthServices.changeProfilePicture = (data) => {
  return fetch({
    url: `/auth/update-profile-picture`,
    method: "PUT",
    data,
  });
};

AuthServices.changePassword = (data) => {
  return fetch({
    url: `/auth/change-password`,
    method: "POST",
    data,
  });
};

AuthServices.login = (data) => {
  return fetch({
    url: `/auth/login`,
    method: "POST",
    data,
    headers: {
      "public-request": "true",
    },
  });
};

AuthServices.register = (data) => {
  return fetch({
    url: `/auth/register`,
    method: "POST",
    data,
    headers: {
      "public-request": "true",
    },
  });
};

AuthServices.sendOtp = (data) => {
  return fetch({
    url: `/auth/confirm-verification`,
    method: "POST",
    data,
    headers: {
      "public-request": "true",
    },
  });
};

AuthServices.forgotPassword = (data) => {
  return fetch({
    url: `/auth/forgot-password`,
    method: "POST",
    data,
    headers: {
      "public-request": "true",
    },
  });
};

AuthServices.verifyResetOtp = (data) => {
  return fetch({
    url: `/auth/verify-reset-otp`,
    method: "POST",
    data,
    headers: {
      "public-request": "true",
    },
  });
};

AuthServices.updatePhone = (data) => {
  return fetch({
    url: `/auth/update-phone`,
    method: "POST",
    data,
  });
};

AuthServices.resetPassword = (data) => {
  return fetch({
    url: `/auth/reset-password`,
    method: "POST",
    data,
    headers: {
      "public-request": "true",
    },
  });
};

export default AuthServices;
