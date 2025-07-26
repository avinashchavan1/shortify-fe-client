import { AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosClient from './AxiosClient';
import toast from 'react-hot-toast';

export type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data: T;
};

const HttpClient = {
  GET: async <T = any,>(
    url: string,
    params?: Record<string, any>
  ): Promise<AxiosResponse<ApiResponse<T>>> => {
    try {
      return await axiosClient.get(url, { params });
    } catch (error) {
      console.error('GET request failed:', error);
      throw error;
    }
  },

  POST: async <T = any, D = any>({
    url,
    data,
    successMessage,
    errorMessage,
    config,
  }: IPostRequestData<D>): Promise<T> => {
    try {
      const response = (await axiosClient.post(url, data, config)) as T;

      if (successMessage) {
        toast.success(successMessage || 'Request was successful.');
      }
      return response;
    } catch (error) {
      console.log('POST request failed:', error || errorMessage);
      throw error;
    }
  },

  PUT: async <T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<ApiResponse<T>>> => {
    try {
      return await axiosClient.put(url, data, config);
    } catch (error) {
      console.error('PUT request failed:', error);
      throw error;
    }
  },

  DELETE: async <T = any,>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<ApiResponse<T>>> => {
    try {
      return await axiosClient.delete(url, config);
    } catch (error) {
      console.error('DELETE request failed:', error);
      throw error;
    }
  },

  PATCH: async <T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<ApiResponse<T>>> => {
    try {
      return await axiosClient.patch(url, data, config);
    } catch (error) {
      console.error('PATCH request failed:', error);
      throw error;
    }
  },
};

export type IPostRequestData<T> = {
  url: string;
  data: T;
  successMessage?: string;
  errorMessage?: string;
  config?: AxiosRequestConfig;
};

export default HttpClient;
