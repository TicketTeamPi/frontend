import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* api.interceptors.response.use(
  (response) => {
    // Se for o endpoint de sessão, retorna isAuthenticated true
    if (response.config.url?.includes('/check-session')) {
      return { ...response, isAuthenticated: true };
    }
    return response;
  },
  (error) => {
    // Se for o endpoint de sessão e der 401, retorna isAuthenticated false
    if (
      error.config &&
      error.config.url?.includes('/check-session') &&
      error.response &&
      error.response.status === 401
    ) {
      return Promise.resolve({ isAuthenticated: false });
    }
    return Promise.reject(error);
  }
); */
