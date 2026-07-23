import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

export const authAPI = {
  login: (data) => axios.post(`${API_URL}/auth/login`, data),
  register: (data) => axios.post(`${API_URL}/auth/register`, data),
};

export const operationAPI = {
  getAll: () => axios.get(`${API_URL}/operations/`),
  create: (data) => axios.post(`${API_URL}/operations/`, data),
  delete: (id) => axios.delete(`${API_URL}/operations/${id}`),
};

export const resourceAPI = {
  getAll: () => axios.get(`${API_URL}/resources/`),
  create: (data) => axios.post(`${API_URL}/resources/`, data),
  delete: (id) => axios.delete(`${API_URL}/resources/${id}`),
};

export const predictAPI = {
  getAll: () => axios.get(`${API_URL}/predictions/`),
  create: (data) => axios.post(`${API_URL}/predictions/`, data),
};

export const riskAPI = {
  getAll: () => axios.get(`${API_URL}/risks/`),
  create: (data) => axios.post(`${API_URL}/risks/`, data),
};

export const recommendationAPI = {
  getAll: () => axios.get(`${API_URL}/recommendations/`),
  create: (data) => axios.post(`${API_URL}/recommendations/`, data),
};

export const anomalyAPI = {
  getAll: () => axios.get(`${API_URL}/anomaly/`),
  create: (data) => axios.post(`${API_URL}/anomaly/`, data),
};

export const healthAPI = {
  getAll: () => axios.get(`${API_URL}/health/`),
  create: (data) => axios.post(`${API_URL}/health/`, data),
};

export const assistantAPI = {
  getLogs: () => axios.get(`${API_URL}/assistant/`),
  chat: (data) => axios.post(`${API_URL}/assistant/`, data),
};

export const twinAPI = {
  getAll: () => axios.get(`${API_URL}/twin/`),
  create: (data) => axios.post(`${API_URL}/twin/`, data),
};

export const reportAPI = {
  getAll: () => axios.get(`${API_URL}/reports/`),
  create: (data) => axios.post(`${API_URL}/reports/`, data),
};

export const notificationAPI = {
  getAll: () => axios.get(`${API_URL}/notifications/`),
  create: (data) => axios.post(`${API_URL}/notifications/`, data),
};

export const mlAPI = {
  predict: (data) => axios.post(`${API_URL}/ml/predict`, data),
};
