import { api } from './http';
import type { LoginResponse } from '../types';

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5088/api",
});

export default API;

export const authApi = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', { email, password });
    return response.data;
  }
};
