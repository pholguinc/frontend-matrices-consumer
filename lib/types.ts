export interface User {
  id: string;
  email: string;
  username?: string;
  created_at?: string;
}

export interface GoAuthData {
  token: string;
  user: User;
}

export interface MatrixData {
  q: number[][];
  r: number[][];
}

export interface MatrixStats {
  max: number;
  min: number;
  avg: number;
  sum: number;
  isDiagonal: boolean;
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
  token?: string;
}
