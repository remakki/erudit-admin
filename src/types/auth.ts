export interface User {
  id: number;
  username: string;
}

export interface TokenPayload {
  id: number;
  username: string;
  exp: number;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}
