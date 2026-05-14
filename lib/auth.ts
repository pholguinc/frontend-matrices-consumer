import { apiCall } from "./api";
import { ApiResponse, GoAuthData } from "./types";

interface NodeAuthResponse {
  message: string;
  token: string;
}

// Go Auth (Port 3030)
export const loginGo = async (email: string, password: string) => {
  return apiCall<ApiResponse<GoAuthData>>("/auth/login", "POST", {
    email,
    password,
  });
};

export const registerGo = async (email: string, password: string) => {
  return apiCall<ApiResponse<GoAuthData>>("/auth/register", "POST", {
    email,
    password,
  });
};

// Node Auth (Port 3050)
export const loginNode = async (username: string, password: string) => {
  return apiCall<NodeAuthResponse>(
    "/api/auth/login",
    "POST",
    { username, password },
    undefined,
    true,
  );
};

export const registerNode = async (username: string, password: string) => {
  return apiCall<NodeAuthResponse>(
    "/api/auth/register",
    "POST",
    { username, password },
    undefined,
    true,
  );
};
