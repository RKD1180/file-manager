
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://file-manager-backend.vercel.app',
  timeout: 5000,
});

instance.interceptors.request.use(
  (config) => {
    const getData = localStorage.getItem("token");
    const token = JSON.parse(getData);
    if (token?.token) {
      config.headers['Authorization'] = `Bearer ${token?.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
