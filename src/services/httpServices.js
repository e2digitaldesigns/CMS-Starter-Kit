import axios from "axios";

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log("Logging the error", error);
  }

  return Promise.reject(error);
});

const token = localStorage.getItem("token");
axios.defaults.baseURL = process.env.REACT_APP_REST_API;
axios.defaults.headers.common["Authorization"] = token ? "bearer " + token : "";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
