import axios from 'axios';
import toast from 'react-hot-toast';
import { HttpUrlLinks } from './HttpClient.constants';
import HttpClient, { IPostRequestData } from './HttpClient';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include credentials in requests
  timeout: 10000, // 10 seconds timeout
});

axiosClient.interceptors.request.use(
  config => {
    // You can add authorization token or other headers here if needed
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
axiosClient.interceptors.response.use(
  response => {
    // Handle successful responses
    return response.data;
  },
  async error => {
    // Handle errors globally
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const requestData = {
          url: HttpUrlLinks.refreshToken,
        } as IPostRequestData<any>;
        await HttpClient.POST(requestData);

        return axiosClient(originalRequest);
      } catch (refreshError) {
        toast.error('Session expired. Please log in again.');

        // Optionally redirect to login page
        const prevUrl = window.location.pathname + window.location.search;
        const encodedUrlSafe = btoa(encodeURIComponent(prevUrl));
        const redirectUrl = !!prevUrl.length ? `/login?state=${encodedUrlSafe}` : '/login';
        window.location.href = redirectUrl; // Adjust the path as needed
      }
    }

    return Promise.reject(error);
  }
);
export default axiosClient;
export type HttpClient = typeof axiosClient;
