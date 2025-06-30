import { data } from "react-router";
import type { LoginData, RegisterData } from "src/types/type";
import { api } from "../utils/API";

export const authService = {
    register: (data: RegisterData) => api.post('/register', data),
    login: (data: LoginData) => api.post('/login', data),
    logout: () => api.delete('/logout'),
    me: () => api.get('/me'),
}