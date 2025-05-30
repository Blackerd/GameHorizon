import axiosInstance from './axiosInstance';

export const createOrder = (data, method, status) => 
  axiosInstance.post('/order', data, { params: { method, status } });
export const getOrders = (customerId) => axiosInstance.get(`/order/customer/${customerId}`);