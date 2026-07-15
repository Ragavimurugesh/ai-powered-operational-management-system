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
};

export const resourceAPI = {
  getAll: () => apiClient.get('/api/resources'),
  create: (data) => apiClient.post('/api/resources', data),
};

export const predictionAPI = {
  getAll: () => apiClient.get('/api/predictions'),
  create: (data) => apiClient.post('/api/predictions', data),
};

export const riskAPI = {
  getAll: () => apiClient.get('/api/risks'),
  create: (data) => apiClient.post('/api/risks', data),
};

export const recommendationAPI = {
  getAll: () => apiClient.get('/api/recommendations'),
  create: (data) => apiClient.post('/api/recommendations', data),
};

export const anomalyAPI = {
  getAll: () => apiClient.get('/api/anomaly'),
  create: (data) => apiClient.post('/api/anomaly', data),
};

export const healthAPI = {
  getAll: () => apiClient.get('/api/health'),
  create: (data) => apiClient.post('/api/health', data),
};

export const reportAPI = {
  getAll: () => apiClient.get('/api/reports'),
  create: (data) => apiClient.post('/api/reports', data),
};

export const notificationAPI = {
  getByUser: (userId) => apiClient.get(`/api/notifications/${userId}`),
  create: (data) => apiClient.post('/api/notifications', data),
};

export const assistantAPI = {
  chat: (data) => apiClient.post('/api/assistant/chat', data),
};

export const twinAPI = {
  getAll: () => apiClient.get('/api/twin'),
  create: (data) => apiClient.post('/api/twin', data),
};

export const mlAPI = {
  info: () => apiClient.get('/api/ml/info'),
  predict: (data) => apiClient.post('/api/ml/predict', data),
};