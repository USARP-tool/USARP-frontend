import axios from "axios";
import { config } from "./config";

const api = axios.create({
  baseURL: config.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

api.interceptors.request.use(
  (req) => {
    if (config.isDevelopment) {
      console.log(`[API Request] ${req.method.toUpperCase()} ${req.baseURL}/${req.url}`);
    }
    return req;
  },
  (error) => Promise.reject(error)
);

export { api, setAuthToken };
