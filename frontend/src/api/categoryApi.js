import axiosInstance from './axiosInstance';

export const createCategory = (data) => axiosInstance.post('/category', data);
export const getCategories = () => axiosInstance.get('/category/list');
export const updateCategory = (id, data) => axiosInstance.put(`/category/${id}`, data);
export const deleteCategory = (id) => axiosInstance.delete(`/category/${id}`);