import axios from "axios";
import Cookie from "cookie-universal";
import { baseUrl } from "./Api";

const cookie = Cookie();

export const Axios = axios.create({
  baseURL: baseUrl,
});

// 🔥 الحل هنا
// Axios.interceptors.request.use(
//   (config) => {
//     const token = cookie.get("vehicle");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

Axios.interceptors.request.use((config) => {
  const token = Cookie().get("vehicle");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Axios.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response?.status === 401) {
//       Cookie().remove("vehicle");
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );
