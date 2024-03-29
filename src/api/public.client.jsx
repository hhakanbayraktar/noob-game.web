import axios from "axios";
import queryString from "query-string";

const baseURL = "http://localhost:5107/";
//const baseURL = "http://noobgame.fisoft.co.uk/";

const publicClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
});

publicClient.interceptors.request.use(async (config) => {
    return {
      ...config,
      headers: {
        "Content-Type": "application/json"
      },
    };
  });
  
  publicClient.interceptors.response.use(
    (response) => {
      //if (response && response.data) return response;

      return response;
    },
    (err) => {
      throw err.response;
    }
  );
  
  export default publicClient;
