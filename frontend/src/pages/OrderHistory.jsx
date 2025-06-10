import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getOrders } from '../api/orderApi';
import { useCustomer } from '../context/CustomerContext.jsx';
import Loading from '../components/common/Loading.jsx';

const OrderHistory = () => {
  const { customer } = useCustomer();
  const { data: orders, isLoading, isError, error } = useQuery({
    queryKey: ['orders', customer?.id],
    queryFn: () => getOrders(customer?.id),
    enabled: !!customer
  });

  if (!customer) {
    return (
      <div className="bg-[#121212] min-h-screen flex items-center justify-center text-white">
        <p>Vui lòng đăng nhập để xem lịch sử đơn hàng.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-[#121212] min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-[#121212] min-h-screen flex items-center justify-center text-white">
        <p>Lỗi: {error?.message || 'Không thể tải đơn hàng.'}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 bg-[#121212] text-white">
      <h1 className="text-3xl font-bold mb-8">Lịch sử đơn hàng</h1>
      {orders?.length === 0 ? (
        <p>Chưa có đơn hàng nào.</p>
      ) : (
        <div className="bg-[#202020] rounded-lg p-6">
          {orders?.map((order) => (
            <div key={order.id} className="border-b border-[#303030] py-4">
              <p className="font-semibold">Mã đơn hàng: {order.id}</p>
              <p>Tổng tiền: {order.total.toLocaleString('vi-VN')}₫</p>
              <p>Trạng thái: {order.status}</p>
              <p>Ngày đặt: {new Date(order.orderDate).toLocaleDateString('vi-VN')}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;