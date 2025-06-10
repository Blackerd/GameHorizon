import axiosInstance from './axiosInstance';

export const getCart = (customerId) => axiosInstance.get(`/cart/${customerId}`);
export const addCartItem = (data) => axiosInstance.post('/cartItem', data);
export const removeCartItem = (cartItemId) => axiosInstance.delete(`/cartItem/${cartItemId}`);
export const clearCart = (cartId) => axiosInstance.delete(`/cartItem/cartId/${cartId}`);