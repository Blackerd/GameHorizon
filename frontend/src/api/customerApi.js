import axiosInstance from './axiosInstance';

// Lấy danh sách tất cả user
export const getAllCustomers = () =>
    axiosInstance.get('/customer/list');

// Lấy chi tiết user theo id
export const getCustomerById = (id) =>
    axiosInstance.get(`/customer/${id}`);

// Xóa user
export const deleteCustomer = (id) =>
    axiosInstance.delete(`/customer/${id}`);

// Cập nhật user (admin)
export const updateCustomerByAdmin = (id, data) =>
    axiosInstance.put(`/customer/admin/${id}`, data);

// Tạo mới user (nếu cần)
export const createCustomer = (data) =>
    axiosInstance.post('/customer', data);


export const initPasswordReset = (username) =>
  axiosInstance.post(`/customer/initPasswordReset/${username}`);