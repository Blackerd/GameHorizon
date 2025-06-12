import React from 'react';
import { useCustomer } from '../context/CustomerContext';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const { customer } = useCustomer();

  if (!customer) return <div className="p-8 text-center">Bạn chưa đăng nhập.</div>;

  return (
    <div className="max-w-xl mx-auto bg-[#202020] rounded-lg p-8 mt-8 text-white shadow">
      <h2 className="text-2xl font-bold mb-4">Thông tin tài khoản</h2>
      <div className="mb-4">
        <div><b>Họ tên:</b> {customer.fullname}</div>
        <div><b>Email:</b> {customer.email}</div>
        <div><b>Tên đăng nhập:</b> {customer.username}</div>
        <div><b>Số điện thoại:</b> {customer.phone}</div>
      </div>
      <div className="flex gap-4 mt-6">
        <Link
          to="/address"
          className="bg-[#0078F2] text-white px-4 py-2 rounded hover:bg-[#0060c7]"
        >
          Quản lý địa chỉ
        </Link>
        <Link
          to="/change-password"
          className="bg-[#303030] text-white px-4 py-2 rounded hover:bg-[#444]"
        >
          Đổi mật khẩu
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;