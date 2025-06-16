import axiosInstance from './axiosInstance';

// Tạo đơn hàng mới
export const createOrder = (data, method, status) =>
  axiosInstance.post('/order', data, { params: { method, status } });

// Lấy tất cả đơn hàng của 1 khách hàng
export const getOrdersByCustomerId = (customerId) =>
  axiosInstance.get(`/order/customer/${customerId}`).then(res => res.data);

// Lấy tất cả đơn hàng (admin)
export const getAllOrders = () =>
  axiosInstance.get('/order/list').then(res => res.data);

// Lấy đơn hàng theo trạng thái (admin)
export const getOrdersByStatus = (status) =>
  axiosInstance.get(`/order/${status}`).then(res => res.data);

// Đổi trạng thái đơn hàng
export const changeOrderStatus = (status, orderId) =>
  axiosInstance.put(`/order/status/${status}&&${orderId}`);

// Xóa đơn hàng
export const deleteOrder = (orderId) =>
  axiosInstance.delete(`/order/${orderId}`);

// Lấy doanh thu theo tháng (admin)
export const getOrderRevenue = () =>
  axiosInstance.get('/order/revenue').then(res => res.data);

// Lấy đơn hàng theo trạng thái và customerId (client)
export const getOrdersByStatusAndCustomerId = (status, customerId) =>
  axiosInstance.get(`/order/client/${status}&&${customerId}`).then(res => res.data);

// Lấy thư viện game của khách hàng
export const getLibrary = (customerId) =>
  axiosInstance.get(`/order/library/${customerId}`).then(res => res.data);