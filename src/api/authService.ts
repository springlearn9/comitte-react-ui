import axiosInstance from './axiosInstance';
import {
  LoginPayload,
  RegisterPayload,
  PasswordResetPayload,
  PasswordUpdatePayload,
  LoginResponse,
  User,
} from '../utils/types';

export const registerUser = (data: RegisterPayload): Promise<{ data: User }> => {
  return axiosInstance.post('/api/auth/register', data);
};

export const loginUser = (data: LoginPayload): Promise<{ data: LoginResponse }> => {
  return axiosInstance.post('/api/auth/login', data);
};

export const requestPasswordReset = (data: PasswordResetPayload): Promise<{ data: string }> => {
  return axiosInstance.post('/api/password/request-reset', data);
};

export const resetPassword = (data: PasswordUpdatePayload): Promise<{ data: string }> => {
  return axiosInstance.post('/api/password/reset', data);
};