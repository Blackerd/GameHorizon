import axiosInstance from './axiosInstance';

export const createProduct = (data) => axiosInstance.post('/product', data);
export const updateProduct = (id, data) => axiosInstance.put(`/product/${id}`, data);
export const deleteProduct = (id) => axiosInstance.delete(`/product/${id}`);
export const getProducts = () => axiosInstance.get('/product/list');
export const getProductById = (id) => axiosInstance.get(`/product/${id}`);
export const getProductsByCategory = (categoryId) => axiosInstance.get(`/product/list/${categoryId}`);
export const searchProductsByName = (name) => axiosInstance.get(`/product/search?name=${name}`);