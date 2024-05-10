import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
type Result<T> = {
  code: number;
  msg: string;
  data: T;
}

export class AxiosRequest {
  axiosInstance: AxiosInstance
  baseConfig: AxiosRequestConfig = { timeout: 5000 }
  // 简单的基础封装
  constructor(config: AxiosRequestConfig) {
    this.axiosInstance = axios.create({ ...this.baseConfig, ...config })
    this.axiosInstance.interceptors.request.use((config) => {
      return config
    }, (error) => {
      return Promise.reject(error)
    })
    this.axiosInstance.interceptors.response.use((res) => {
      return res
    }, (error) => {
      return Promise.reject(error)
    })
  }
  public get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Result<T>>> {
    return this.axiosInstance.get(url, config);
  }
}