// Interfaces mapped from backend DTOs

// Represents the user/member object
export interface User {
  id: number;
  username: string;
  email: string;
  mobile?: string;
  // TODO: Add roles or other user-specific fields if available from the backend
}

// Payload for POST /api/auth/register
export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  mobile?: string;
}

// Payload for POST /api/auth/login
export interface LoginPayload {
  usernameOrEmail: string;
  password: string;
}

// Response from POST /api/auth/login
export interface LoginResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  user: User;
}

// Payload for POST /api/password/request-reset
export interface PasswordResetPayload {
  email: string;
}

// Payload for POST /api/password/reset
export interface PasswordUpdatePayload {
  token: string;
  newPassword: string;
}