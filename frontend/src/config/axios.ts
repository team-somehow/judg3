import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('token');
    // if (token) {
    config.headers[
      'Authorization'
    ] = `Token 1b4e2b2766177a14c95d5a7fbf85257d5729310c`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
