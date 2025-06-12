import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../api/categoryApi';

export const useCategories = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await getCategories();
      return data;
    }
  });