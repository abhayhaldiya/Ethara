import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Employee API calls
export const employeeAPI = {
  getAll: () => api.get('/api/employees'),
  create: (employee) => api.post('/api/employees', employee),
  delete: (employeeId) => api.delete(`/api/employees/${employeeId}`),
};

// Attendance API calls
export const attendanceAPI = {
  getAll: () => api.get('/api/attendance'),
  getByEmployee: (employeeId) => api.get(`/api/attendance/${employeeId}`),
  mark: (attendance) => api.post('/api/attendance', attendance),
};

export default api;