import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { config } from './config';

export class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: config.appUrl,
      timeout: parseInt(config.timeout),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.client.interceptors.request.use(
      (config) => {
        console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response) => {
        console.log(`[API] ${response.status} ${response.config.url}`);
        return response;
      },
      (error) => {
        console.error(`[API] Error: ${error.response?.status} ${error.config?.url}`);
        return Promise.reject(error);
      }
    );
  }

  async get(path: string, options?: AxiosRequestConfig) {
    return this.client.get(path, options);
  }

  async post(path: string, data?: any, options?: AxiosRequestConfig) {
    return this.client.post(path, data, options);
  }

  async put(path: string, data?: any, options?: AxiosRequestConfig) {
    return this.client.put(path, data, options);
  }

  async delete(path: string, options?: AxiosRequestConfig) {
    return this.client.delete(path, options);
  }
}
