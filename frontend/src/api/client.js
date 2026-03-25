export const API_BASE = 'http://127.0.0.1:8000';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}

export const api = {
  getDashboard: () => request('/dashboard'),
  getCourses: (year) => request(`/courses?year=${year}`),
  getResources: () => request('/resources'),
  summarize: (text) => request('/ai/summarize', { method: 'POST', body: JSON.stringify({ text }) }),
  generateQuiz: (topic) => request('/ai/quiz', { method: 'POST', body: JSON.stringify({ topic }) }),
  login: (userId, password) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ userId, password }),
    }),
  signup: (userId, password) =>
    request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ userId, password }),
    }),
  me: (token) =>
    request('/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    }),
  logout: (token) =>
    request('/auth/logout', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    }),
};
