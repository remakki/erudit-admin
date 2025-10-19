import { getAuthToken } from './auth';

const API_BASE_URL = process.env.API_BASE_URL || '';

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = await getAuthToken();

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Request failed' }));
    throw new Error(error.detail || 'Request failed');
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export const api = {
  // Events
  events: {
    list: (actual?: boolean) => fetchWithAuth(`/api/v1/events${actual ? '?actual=true' : ''}`),
    get: (id: number) => fetchWithAuth(`/api/v1/events/${id}`),
    create: (data: any) =>
      fetchWithAuth('/api/v1/events', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: any) =>
      fetchWithAuth(`/api/v1/events/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: number) => fetchWithAuth(`/api/v1/events/${id}`, { method: 'DELETE' }),
  },

  // Applications
  applications: {
    list: () => fetchWithAuth('/api/v1/applications'),
    delete: (id: number) => fetchWithAuth(`/api/v1/applications/${id}`, { method: 'DELETE' }),
  },

  // Requests
  requests: {
    list: () => fetchWithAuth('/api/v1/requests'),
    update: (id: number, data: any) =>
      fetchWithAuth(`/api/v1/requests/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    delete: (id: number) => fetchWithAuth(`/api/v1/requests/${id}`, { method: 'DELETE' }),
  },
};
