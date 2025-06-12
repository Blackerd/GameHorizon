import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getOrdersByCustomerId } from '../api/orderApi';
import { useCustomer } from '../context/CustomerContext';

const OrderHistory = () => {
  const { customer } = useCustomer();
  const customerId = customer?.id;

  const { data: ordersRaw, isLoading, isError } = useQuery({
    queryKey: ['orders', customerId],
    queryFn: () => getOrdersByCustomerId(customerId),
    enabled: !!customerId,
  });

  // Đảm bảo orders luôn là mảng
  const orders = Array.isArray(ordersRaw)
    ? ordersRaw
    : (ordersRaw && Array.isArray(ordersRaw.data) ? ordersRaw.data : []);

  if (!customerId) return <p>Bạn cần đăng nhập để xem đơn hàng.</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Lịch sử đơn hàng</h2>
      {isLoading ? (
        <p>Đang tải...</p>
      ) : isError ? (
        <p>Lỗi khi tải đơn hàng</p>
      ) : orders.length === 0 ? (
        <p>Bạn chưa có đơn hàng nào.</p>
      ) : (
        <table className="w-full bg-[#202020] rounded">
          <thead>
            <tr className="bg-[#303030]">
              <th className="p-2">Mã đơn</th>
              <th className="p-2">Ngày đặt</th>
              <th className="p-2">Tổng tiền</th>
              <th className="p-2">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-[#303030]">
                <td className="p-2">{order.id}</td>
                <td className="p-2">{order.orderDate}</td>
                <td className="p-2">{order.totalAmount}₫</td>
                <td className="p-2">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderHistory;