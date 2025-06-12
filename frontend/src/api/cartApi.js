import axiosInstance from './axiosInstance';

// Lấy giỏ hàng theo customerId
export const getCart = (customerId) => axiosInstance.get(`/cart/${customerId}`);

// Thêm sản phẩm vào giỏ hàng
export const addCartItem = (data) => axiosInstance.post('/cartItem', data);

// Xóa 1 sản phẩm khỏi giỏ hàng
export const removeCartItem = (cartItemId) => axiosInstance.delete(`/cartItem/${cartItemId}`);

// Xóa toàn bộ sản phẩm trong giỏ hàng
export const clearCart = (cartId) => axiosInstance.delete(`/cartItem/cartId/${cartId}`);