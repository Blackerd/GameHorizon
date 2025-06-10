import React from 'react';
import { useQuery } from 'react-query';
import { getOrders } from '../../api/orderApi';
import { useAuth } from '../../hooks/useAuth';

const OrderHistory = () => {
  const { user } = useAuth();
  const { data: orders, isLoading } = useQuery(['orders', user?.id], () => getOrders(user?.id), {
    enabled: !!user,
  });

  if (isLoading) return <div>Loading...</div>;

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
              <p>Tổng tiền: {order.totalAmount.toLocaleString('vi-VN')}₫</p>
              <p>Trạng thái: {order.status}</p>
              <p>Ngày đặt: {new Date(order.createdAt).toLocaleDateString('vi-VN')}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;