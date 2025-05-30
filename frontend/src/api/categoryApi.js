import axiosInstance from './axiosInstance';

export const createCategory = (data) => axiosInstance.post('/category', data);
export const getCategories = () => axiosInstance.get('/category');