import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getAllOrders,
  getOrdersByStatus,
  changeOrderStatus,
  deleteOrder
} from '../api/orderApi';
import { Trash2, Edit, Plus } from 'lucide-react';

const statusList = [
  { label: 'Tất cả', value: '' },
  { label: 'Chờ xác nhận', value: 'PENDING' },
  { label: 'Đang giao', value: 'SHIPPING' },
  { label: 'Đã giao', value: 'DELIVERED' },
  { label: 'Đã hủy', value: 'CANCELLED' }
];

const OrderManagement = () => {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState('');
  const { data: orders = [], isLoading, isError } = useQuery({
    queryKey: ['orders', status],
    queryFn: () => status ? getOrdersByStatus(status) : getAllOrders()
  });

  const handleChangeStatus = async (orderId, newStatus) => {
    await changeOrderStatus(newStatus, orderId);
   await queryClient.invalidateQueries(['orders']);
  };

  const handleDelete = async (orderId) => {
    if (window.confirm('Bạn chắc chắn muốn xóa đơn hàng này?')) {
      await deleteOrder(orderId);
      queryClient.invalidateQueries(['orders']);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Quản lý đơn hàng</h2>
      <div className="mb-4 flex gap-4">
        {statusList.map(s => (
          <button
            key={s.value}
            onClick={() => setStatus(s.value)}
            className={`px-4 py-2 rounded ${status === s.value ? 'bg-[#0078F2] text-white' : 'bg-[#23283a] text-gray-200'}`}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto bg-[#202020] rounded-lg shadow">
        <table className="w-full">
          <thead>
          <tr className="bg-[#303030] text-white">
      <th className="p-3 text-left w-24">Mã đơn</th>
      <th className="p-3 text-left w-48">Khách hàng</th>
      <th className="p-3 text-left w-32">Ngày đặt</th>
      <th className="p-3 text-left w-32">Tổng tiền</th>
      <th className="p-3 text-left w-32">Trạng thái</th>
      <th className="p-3 text-left w-32">Hành động</th>
    </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={6} className="text-center text-white py-6">Đang tải...</td></tr>
            ) : isError ? (
              <tr><td colSpan={6} className="text-center text-red-400 py-6">Lỗi tải dữ liệu</td></tr>
            ) : orders.length === 0 ? (
              <tr><td colSpan={6} className="text-center text-gray-400 py-6">Không có đơn hàng</td></tr>
            ) : (
              orders.map(order => (
                <tr key={order.id} className="border-t border-[#303030]">
                  <td className="p-3 text-white">{order.id}</td>
                  <td className="p-3 text-white">
                    {order.customerDTO?.fullname || 'Ẩn'}<br />
                    <span className="text-xs text-gray-400">{order.customerDTO?.email}</span>
                  </td>
                  <td className="p-3 text-white">{order.orderDate?.slice(0, 10)}</td>
                  <td className="p-3 text-[#00ffae] font-bold">{order.totalAmount?.toLocaleString('vi-VN')}₫</td>
                  <td className="p-3 text-white">{order.status}</td>
                  <td className="p-3 flex gap-2">
              <select
                    value={order.status}
                    onChange={async e => {
                      await handleChangeStatus(order.id, e.target.value);
                    }}
                    className="bg-[#23283a] text-white rounded px-2 py-1"
                  >
                      <option value="PENDING">Chờ xác nhận</option>
                      <option value="SHIPPING">Đang giao</option>
                      <option value="DELIVERED">Đã giao</option>
                      <option value="CANCELLED">Đã hủy</option>
                    </select>
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;