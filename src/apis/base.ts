import Vue from 'vue';
import axios from 'axios';

export interface APIRequestConfig {
  headers?: any;
  params?: any;
  paramsSerializer?: (params: any) => string;
  responseType?: string;
}

export interface APIResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: APIRequestConfig;
  request?: any;
}

export interface APIError extends Error {
  config: APIRequestConfig;
  code?: string;
  request?: any;
  response?: APIResponse;
}

export interface APIPromise<T = any> extends Promise<APIResponse<T>> {}

interface APIRequestInternalConfig extends APIRequestConfig {
  url: string;
  method: string;
  data?: any;
}

export abstract class BaseAPI extends Vue {
  get<T = any>(path: string, config?: APIRequestConfig): APIPromise<T> {
    return this.request(
      Object.assign(config || {}, {
        url: path,
        method: 'get',
      }),
    );
  }

  delete(path: string, config?: APIRequestConfig): APIPromise {
    return this.request(
      Object.assign(config || {}, {
        url: path,
        method: 'delete',
      }),
    );
  }

  post<T = any>(path: string, data?: any, config?: APIRequestConfig): APIPromise<T> {
    return this.request(
      Object.assign(config || {}, {
        url: path,
        method: 'post',
        data,
      }),
    );
  }

  put<T = any>(path: string, data?: any, config?: APIRequestConfig): APIPromise<T> {
    return this.request(
      Object.assign(config || {}, {
        url: path,
        method: 'put',
        data,
      }),
    );
  }

  request<T = any>(config: APIRequestInternalConfig): APIPromise<T> {
    const apiConfig = this.$config.api;
    let baseURL = '';
    if (!apiConfig.protocol && !apiConfig.host && !apiConfig.port) {
      baseURL = 'api';
    } else {
      baseURL = `${apiConfig.protocol}://${apiConfig.host}:${apiConfig.port}/api/`;
    }
    const axiosConfig = Object.assign(config || {}, {
      baseURL,
    });
    return axios.request(axiosConfig);
  }
}
