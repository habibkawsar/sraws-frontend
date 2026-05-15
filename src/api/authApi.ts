import { api } from './http';
import type { LoginResponse } from '../types';

import axios from "axios";

const API = axios.create({
  baseURL: "https://sraws-backend.onrender.com/api",
});

export default API;

export const authApi = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', { email, password });
    // console.log(response.data);
    localStorage.setItem("sraws_token", response.data.accessToken);
    return response.data;
  }
};
