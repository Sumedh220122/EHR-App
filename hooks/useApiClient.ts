'use client';

import { useCredentials } from '../contexts/CredentialsContext';

export function useApiClient() {
  const { credentials } = useCredentials();

  const apiCall = async (url: string, options: RequestInit = {}) => {
    const headers = {
      'Content-Type': 'application/json',
      'x-api-key': credentials.api_key,
      'x-username': credentials.username,
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  };

  return { apiCall };
}