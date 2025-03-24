// src/api/index.js
import request from '@/utils/http/request';

export default {
  get(url, params) {
    return request({
      url,
      method: 'get',
      params,
    });
  },

  post(url, data) {
    return request({
      url,
      method: 'post',
      data,
    });
  },

  upload(url, file) {
    const formData = new FormData();
    formData.append('file', file);
    return request({
      url,
      method: 'post',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  uploadToMinio(url, file, progress) {
    return request({
      url,
      method: 'put',
      data: file,
      headers: { 'Content-Type': 'application/octet-stream' },
      onUploadProgress: progress,
    });
  },

  // 其他方法类似封装...
};
