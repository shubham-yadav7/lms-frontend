import axios from "axios";
import history from "../helpers/history";

// Axios Instance
const service = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/`,
  timeout: 60000,
});

// Interceptor
service.interceptors.request.use((config) => {
  const jwtToken = localStorage.getItem("token");
  if (jwtToken) {
    config.headers["Authorization"] = `Bearer ${jwtToken}`;
  }
  if (!jwtToken && !config.headers["public-request"]) {
    history.push("/");
    window.location.reload();
  }
  return config;
});

service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log(error);

    // Remove token and redirect
    if (error.response && error.response.status === 401) {
      // localStorage.removeItem("token");
      // localStorage.removeItem("user"); //TODO: 👈 check this
      // history.push("/");
      // window.location.reload();
    }

    return Promise.reject(error);
  }
);

export default service;
