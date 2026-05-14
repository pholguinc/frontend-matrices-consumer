import { apiCall } from './api';
import { ApiResponse, MatrixData, MatrixStats } from './types';

export const factorizeMatrix = async (matrix: number[][], token: string) => {
  return apiCall<ApiResponse<MatrixData>>('/matrix/factorize', 'POST', { matrix }, token);
};

export const getMatrixStats = async (data: ApiResponse<MatrixData>, token: string) => {
  // This calls the Node API
  return apiCall<ApiResponse<MatrixStats>>('/api/matrix/stats', 'POST', data, token, true);
};
