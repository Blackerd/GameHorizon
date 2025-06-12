import { useQuery } from '@tanstack/react-query';
import { getAllCustomers } from '../api/customerApi';

export const useCustomers = () =>
  useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      const { data } = await getAllCustomers();
      return data;
    }
  });