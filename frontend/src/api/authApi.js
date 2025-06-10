import axiosInstance from './axiosInstance';

export const login = (credentials) => axiosInstance.post('/customer/login', credentials);
export const register = (customer) => axiosInstance.post('/customer', customer);