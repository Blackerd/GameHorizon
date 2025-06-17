import { useQuery } from '@tanstack/react-query';
import { getAllCustomers } from '../api/customerApi';
import { useCustomer } from '../context/CustomerContext';

export const useCustomers = () => {
  const { customer } = useCustomer();

  // Chỉ fetch khi đã đăng nhập và là admin
  return useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      const { data } = await getAllCustomers();
      return data;
    },
    enabled: !!customer && customer.role === true, // chỉ chạy khi là admin
  });
};