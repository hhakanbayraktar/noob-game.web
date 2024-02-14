import axios from "axios";
import queryString from "query-string";

const baseURL = "http://localhost:5107/";
//const baseURL = "http://noobgame.fisoft.co.uk/";

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
      console.log("Api Request: /", config.url)
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
