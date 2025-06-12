import React, { useEffect, useState } from 'react';
import {
  getAllOrders,
  getOrdersByStatus,
  changeOrderStatus,
  deleteOrder,
  getOrderRevenue,
} from '../api/orderApi';

const ORDER_STATUS = [
  { value: 'ALL', label: 'Tất cả' },
  { value: 'PENDING', label: 'Chờ xác nhận' },
  { value: 'PENDING_PAYMENT', label: 'Chờ thanh toán' },
  { value: 'DELIVERED', label: 'Đã giao' },
  { value: 'CANCELLED', label: 'Đã hủy' },
];

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState('ALL');
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      let data = [];
      if (status === 'ALL') {
        data = await getAllOrders();
      } else {
        data = await getOrdersByStatus(status);
      }
      setOrders(data || []);
    } catch (e) {
      alert('Lỗi khi lấy danh sách đơn hàng');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line
  }, [status]);

  const handleChangeStatus = async (orderId, newStatus) => {
    try {
      await changeOrderStatus(newStatus, orderId);
      fetchOrders();
    } catch (e) {
      alert('Lỗi khi cập nhật trạng thái đơn hàng');
    }
  };

  const handleDelete = async (orderId) => {
    if (window.confirm('Bạn chắc chắn muốn xóa đơn hàng này?')) {
      try {
        await deleteOrder(orderId);
        fetchOrders();
      } catch (e) {
        alert('Lỗi khi xóa đơn hàng');
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Quản lý đơn hàng</h2>
      <div className="mb-4 flex gap-4 items-center">
        <label>Lọc theo trạng thái:</label>
        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
          className="p-2 rounded bg-[#232323] text-white"
        >
          {ORDER_STATUS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      {loading ? (
        <div>Đang tải...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left bg-[#232323] rounded-lg">
            <thead>
              <tr>
                <th className="p-2">Mã ĐH</th>
                <th className="p-2">Khách hàng</th>
                <th className="p-2">Tổng tiền</th>
                <th className="p-2">Trạng thái</th>
                <th className="p-2">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className="border-b border-[#303030]">
                  <td className="p-2">{order.id}</td>
                  <td className="p-2">{order.customerName}</td>
                  <td className="p-2">{order.totalAmount?.toLocaleString('vi-VN')}₫</td>
                  <td className="p-2">{order.status}</td>
                  <td className="p-2 flex gap-2">
                    <select
                      value={order.status}
                      onChange={e => handleChangeStatus(order.id, e.target.value)}
                      className="bg-[#303030] text-white rounded p-1"
                    >
                      {ORDER_STATUS.filter(s => s.value !== 'ALL').map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="text-red-500 hover:underline"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-gray-400 py-4">Không có đơn hàng nào.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;