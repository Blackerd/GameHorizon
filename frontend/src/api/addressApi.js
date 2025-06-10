import axiosInstance from './axiosInstance';

export const getDefaultAddress = (customerId) => axiosInstance.get(`/address/default/${customerId}`);
export const createAddress = (data) => axiosInstance.post('/address', data);
export const getAddressesByCustomer = (customerId) => axiosInstance.get(`/address/customer/${customerId}`);