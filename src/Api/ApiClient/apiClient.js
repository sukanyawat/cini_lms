import axios from "axios";
import { config } from "../../Config";

const axiosInstance = axios.create({
  baseURL: config.API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // You can modify the request config here, e.g., add authentication headers
    // config.headers.Authorization = `Bearer ${getToken()}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
 );

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("admin-token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userType");
      localStorage.clear();
      return (window.location.href = "/");
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
