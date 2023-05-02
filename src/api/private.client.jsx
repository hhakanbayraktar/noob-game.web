import axios from "axios";
import queryString from "query-string";

const baseURL = "https://localhost:7263/";

const privateClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
});

privateClient.interceptors.request.use(async (config) => {
  const user = localStorage.getItem("user");
  if (user) {
    const userJson = JSON.parse(user);

    if (new Date(userJson.expireOn) < new Date()) {
      localStorage.removeItem("user");
      window.location.reload();
      console.log("Logout")
    } else {
      console.log("Api Request")
      return {
        ...config,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userJson.token}`,
        },
      };
    }
  }
});

privateClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    throw err.response;
  }
);

export default privateClient;
