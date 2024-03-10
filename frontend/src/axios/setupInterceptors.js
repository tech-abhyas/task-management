import { axiosInstanceAuth } from "./axiosInstance";


const setup = async () => {
  axiosInstanceAuth.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('tk');
      if (token) {
        config.headers["Authorization"] = 'Bearer ' + token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );


};

export default setup;
