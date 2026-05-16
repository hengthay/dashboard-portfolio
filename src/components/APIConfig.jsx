import axios from "axios";
import { isTokenExpired } from "./Helper/tokenExpiredChecker";
import { forceLogout } from "../feature/auth/authSlice";

// const API = 'http://localhost:8000';
const API = `${import.meta.env.VITE_BASE_URL}`;

const API_BASE_URL = `${API}/api`;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Accept': "application/json",
    'Content-Type': "application/json",
  }
});

// Check every API request
axiosInstance.interceptors.request.use((config) => {

  // Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem("userData"));

  // Get token from user data
  const token = userData?.token;

  // If token exist but it expired
  if(token && isTokenExpired(token)) {

    localStorage.removeItem('userData'); // Remove from localStorage

    // Force logout user
    import('../app/store').then((({ default: store }) => {
      store.dispatch(forceLogout());
    }));

    // Redirect user to login page
    window.location.href = '/login';
    return Promise.reject(new Error('Token expired!'));
  }

  // If token exist and valid
  if(token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export {axiosInstance, API_BASE_URL}