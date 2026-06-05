import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://e-commerce-development.onrender.com",
  
  // baseURL: import.meta.env.VITE_PUBLIC_API_URL,
  
  withCredentials: true,
});

export default axiosInstance;
