import { getAccessToken } from "../utils/tokenStorage";

const API_URL = import.meta.env.VITE_API_URL;

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterPayload {
  name: string;
  lastname: string;
  birthdate: string;
  phone_number: string;
  email: string;
  password: string;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Invalid email or password");
  }

  return res.json();
}

export async function logout(): Promise<void> {
  const token = getAccessToken();

  if (!token) return;

  await fetch(`${API_URL}/logout`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "*/*",
    },
  });
}

export async function register(data: RegisterPayload): Promise<void> {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Registration failed");
  }
}