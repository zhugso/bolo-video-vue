// src/utils/request.js
import { useTokenStore } from '@/stores/token';
import axios from 'axios';

const service = axios.create({
  // baseURL: process.env.VUE_APP_API_BASE_URL, // 通过环境变量配置
  // baseURL: import.meta.env.VUE_APP_API_BASE_URL, // 通过环境变量配置
  // baseURL: 'http://127.0.0.1:4523/m1/5892788-5579566-default', // 通过环境变量配置
  baseURL: '/api', // 通过环境变量配置
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    console.log('响应拦截器：', response);

    // if (response.data.code !== '200') {
    //   console.log(response);

    //   // 假设业务状态码200为成功
    //   return Promise.reject(response.data);
    // }
    return response.data;
  },
  (error) => {
    // 统一错误处理（示例）
    if (error.response.status === '601') {
      // 清除token
      const tokenStore = useTokenStore();
      tokenStore.setToken('');

      alert('登录过期，请重新登录');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default service;
