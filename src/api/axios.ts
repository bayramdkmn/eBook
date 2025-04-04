import axios from "axios";
import { API_URL } from "../constants";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    const exp = localStorage.getItem("authTokenExp");

    const now = Math.floor(Date.now() / 1000);
    if (exp && now >= parseInt(exp)) {
      console.warn("Token süresi dolmuş. Oturum sonlandırılıyor...");
      localStorage.clear();
      window.location.href = "/signIn"; 

      return Promise.reject("Token expired");
    }

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.warn("Backend token'ı reddetti. Oturumdan çıkılıyor...");
      localStorage.clear();
      window.location.href = "/signIn";
    }
    return Promise.reject(error);
  }
);

export default api;
