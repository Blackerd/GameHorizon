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

  if (!customerId) return <p className="p-8 text-center text-white">Bạn cần đăng nhập để xem đơn hàng.</p>;

  return (
    <>
      {isLoading ? (
        <p className="text-white">Đang tải...</p>
      ) : isError ? (
        <p className="text-red-400">Lỗi khi tải đơn hàng</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-400">Bạn chưa có đơn hàng nào.</p>
      ) : (
        <table className="w-full bg-[#23283a] rounded-lg overflow-hidden shadow">
          <thead>
            <tr className="bg-[#1a2233] text-[#00b4ff]">
              <th className="p-3 font-semibold">Mã đơn</th>
              <th className="p-3 font-semibold">Ngày đặt</th>
              <th className="p-3 font-semibold">Tổng tiền</th>
              <th className="p-3 font-semibold">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-t border-[#2c3550] hover:bg-[#28304a] transition"
              >
                <td className="p-3 text-white">{order.id}</td>
                <td className="p-3 text-white">{order.orderDate}</td>
                <td className="p-3 text-[#00ffae] font-bold">{order.totalAmount}₫</td>
                <td className="p-3 text-white">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default OrderHistory;