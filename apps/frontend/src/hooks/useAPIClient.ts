import { apiClient, setupApiClient } from '@/services/api';
import { useAuth } from '@clerk/clerk-react';

export const useApiClient = () => {
  const { getToken } = useAuth();

  setupApiClient(getToken);

  return apiClient;
};
