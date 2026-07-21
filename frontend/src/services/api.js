import axios from 'axios';

const API_BASE = "https://ai-powered-operational-management-system-eq8j.onrender.com";

export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authAPI = {
  register: (data) => apiClient.post('/api/auth/register', data),
  login: (data) => apiClient.post('/api/auth/login', data),
  getUsers: () => apiClient.get('/api/auth/users'),
  getUser: (id) => apiClient.get(`/api/auth/users/${id}`),
};

export const operationAPI = {
  getAll: () => apiClient.get('/api/operations'),
  create: (data) => apiClient.post('/api/operations', data),
  update: (id, data) => apiClient.put(`/api/operations/${id}`, data),
  delete: (id) => apiClient.delete(`/api/operations/${id}`),
};

export const resourceAPI = {
  getAll: () => apiClient.get('/api/resources'),
  create: (data) => apiClient.post('/api/resources', data),
  update: (id, data) => apiClient.put(`/api/resources/${id}`, data),
  delete: (id) => apiClient.delete(`/api/resources/${id}`),
};

export const predictionAPI = {
  getAll: () => apiClient.get('/api/predictions'),
  create: (data) => apiClient.post('/api/predictions', data),
  update: (id, data) => apiClient.put(`/api/predictions/${id}`, data),
  delete: (id) => apiClient.delete(`/api/predictions/${id}`),
};

export const riskAPI = {
  getAll: () => apiClient.get('/api/risks'),
  create: (data) => apiClient.post('/api/risks', data),
  update: (id, data) => apiClient.put(`/api/risks/${id}`, data),
  delete: (id) => apiClient.delete(`/api/risks/${id}`),
};

export const recommendationAPI = {
  getAll: () => apiClient.get('/api/recommendations'),
  create: (data) => apiClient.post('/api/recommendations', data),
  update: (id, data) => apiClient.put(`/api/recommendations/${id}`, data),
  delete: (id) => apiClient.delete(`/api/recommendations/${id}`),
};

export const anomalyAPI = {
  getAll: () => apiClient.get('/api/anomaly'),
  create: (data) => apiClient.post('/api/anomaly', data),
  update: (id, data) => apiClient.put(`/api/anomaly/${id}`, data),
  delete: (id) => apiClient.delete(`/api/anomaly/${id}`),
};

export const healthAPI = {
  getAll: () => apiClient.get('/api/health'),
  create: (data) => apiClient.post('/api/health', data),
  update: (id, data) => apiClient.put(`/api/health/${id}`, data),
  delete: (id) => apiClient.delete(`/api/health/${id}`),
};

export const reportAPI = {
  getAll: () => apiClient.get('/api/reports'),
  create: (data) => apiClient.post('/api/reports', data),
  update: (id, data) => apiClient.put(`/api/reports/${id}`, data),
  delete: (id) => apiClient.delete(`/api/reports/${id}`),
};

export const notificationAPI = {
  getByUser: (userId) => apiClient.get(`/api/notifications/${userId}`),
  create: (data) => apiClient.post('/api/notifications', data),
  markRead: (id) => apiClient.put(`/api/notifications/${id}`),
  delete: (id) => apiClient.delete(`/api/notifications/${id}`),
};

export const assistantAPI = {
  chat: (data) => apiClient.post('/api/assistant/chat', data),
};

export const twinAPI = {
  getAll: () => apiClient.get('/api/twin'),
  create: (data) => apiClient.post('/api/twin', data),
  update: (id, data) => apiClient.put(`/api/twin/${id}`, data),
  delete: (id) => apiClient.delete(`/api/twin/${id}`),
};

export const mlAPI = {
  info: () => apiClient.get('/api/ml/info'),
  predict: (data) => apiClient.post('/api/ml/predict', data),
};