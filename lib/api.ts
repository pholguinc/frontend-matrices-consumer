const GO_API_URL = process.env.NEXT_PUBLIC_GO_API_URL || 'http://localhost:3030';
const NODE_API_URL = process.env.NEXT_PUBLIC_NODE_API_URL || 'http://localhost:3050';

export const apiCall = async <T = unknown>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: unknown,
  token?: string,
  isNode: boolean = false
): Promise<T> => {
  const baseUrl = isNode ? NODE_API_URL : GO_API_URL;
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${baseUrl}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const responseData = await response.json().catch(() => ({})) as any;

  if (!response.ok) {
    throw new Error(responseData.message || responseData.error || `Request failed with status ${response.status}`);
  }

  return responseData as T;
};
