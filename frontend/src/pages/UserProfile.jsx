import React, { useState } from 'react';
import { useCustomer } from '../context/CustomerContext';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import OrderHistory from './OrderHistory';
import WishlistGames from '../components/wishlist/WishlistGames';
import Library from './Library';
import axiosInstance from '../api/axiosInstance';
import toast from 'react-hot-toast';



const UserProfile = () => {
  const { customer } = useCustomer();
  const [tab, setTab] = useState('profile');
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changePwMsg, setChangePwMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  if (!customer) {
    return <Navigate to="/login" replace />;
  }
// Hàm xử lý đổi mật khẩu
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setChangePwMsg('');
    if (!oldPassword || !newPassword || !confirmPassword)
    {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }
    if (newPassword !== confirmPassword)
    {
      toast.error('Mật khẩu mới không khớp');
      return;
    }
    setLoading(true);
    try {
      await axiosInstance.patch(`/customer/changePassword/${customer.id}`, {
        oldPassword,
        newPassword,
      });
      toast.success('Đổi mật khẩu thành công');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setShowChangePassword(false);
    } catch (err) {
      setChangePwMsg(
        err?.response?.data?.message ||
          err?.response?.data ||
          'Đổi mật khẩu thất bại'
      );
    } finally {
      setLoading(false);
    }
  };

  if (!customer) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="max-w-4xl mx-auto flex bg-gradient-to-br from-[#23283a] to-[#181c24] rounded-2xl mt-12 shadow-2xl overflow-hidden min-h-[520px] border border-[#232323]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#181818] flex flex-col py-12 px-6 border-r border-[#232323]">
        <div className="mb-10 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-[#23283a] flex items-center justify-center text-4xl font-bold text-[#00b4ff] mb-3 shadow-lg border-4 border-[#232323]">
            {customer.fullname?.charAt(0) || 'U'}
          </div>
          <div className="text-white font-semibold text-lg">{customer.fullname}</div>
          <div className="text-xs text-gray-400">{customer.email}</div>
        </div>
        <nav className="flex flex-col gap-2">
          <button
            className={`text-left px-4 py-2 rounded font-semibold transition ${
              tab === 'profile'
                ? 'bg-[#0078F2] text-white shadow'
                : 'hover:bg-[#232323] text-gray-200'
            }`}
            onClick={() => setTab('profile')}
          >
            <span role="img" aria-label="user" className="mr-2">👤</span>
            Thông tin tài khoản
          </button>
          {/* Đã xóa tab quản lý địa chỉ */}
          <button
            className={`text-left px-4 py-2 rounded font-semibold transition ${
              tab === 'orders'
                ? 'bg-[#0078F2] text-white shadow'
                : 'hover:bg-[#232323] text-gray-200'
            }`}
            onClick={() => setTab('orders')}
          >
            <span role="img" aria-label="orders" className="mr-2">🧾</span>
            Lịch sử đơn hàng
          </button>
          <button
            className={`text-left px-4 py-2 rounded font-semibold transition ${
              tab === 'wishlist'
                ? 'bg-[#0078F2] text-white shadow'
                : 'hover:bg-[#232323] text-gray-200'
            }`}
            onClick={() => setTab('wishlist')}
          >
            <span role="img" aria-label="wishlist" className="mr-2">⭐</span>
            Wishlist
          </button>
          <button
            className={`text-left px-4 py-2 rounded font-semibold transition ${
              tab === 'library'
                ? 'bg-[#0078F2] text-white shadow'
                : 'hover:bg-[#232323] text-gray-200'
            }`}
            onClick={() => setTab('library')}
          >
            <span role="img" aria-label="library" className="mr-2">🎮</span>
            Thư viện game
          </button>
          {customer.role === true && (
            <button
              className="text-left px-4 py-2 rounded font-semibold transition bg-[#ffb300] text-black hover:bg-[#ffe082] mt-2"
              onClick={() => navigate('/admin')}
            >
              <span role="img" aria-label="admin" className="mr-2">🛠️</span>
              Quản trị
            </button>
          )}
        </nav>
      </aside>
      {/* Main content */}
      <main className="flex-1 p-12 text-white bg-opacity-90 flex flex-col justify-center">
        {tab === 'profile' && (
          <>
            <h2 className="text-2xl font-bold mb-8 text-[#00b4ff]">Thông tin tài khoản</h2>
            <div className="mb-8 space-y-4 text-lg">
              <div>
                <span className="font-semibold text-[#00b4ff]">Họ tên:</span> {customer.fullname}
              </div>
              <div>
                <span className="font-semibold text-[#00b4ff]">Email:</span> {customer.email}
              </div>
              <div>
                <span className="font-semibold text-[#00b4ff]">Tên đăng nhập:</span> {customer.username}
              </div>
              <div>
                <span className="font-semibold text-[#00b4ff]">Số điện thoại:</span> {customer.phone}
              </div>
            </div>
            <button
              className="inline-block bg-[#0078F2] text-white px-6 py-2 rounded-lg hover:bg-[#0060c7] transition font-semibold shadow"
              onClick={() => setShowChangePassword((v) => !v)}
            >
              Đổi mật khẩu
            </button>
             {showChangePassword && (
              <form
                className="mt-6 bg-[#23283a] p-6 rounded-lg shadow space-y-4 max-w-md"
                onSubmit={handleChangePassword}
              >
                <div>
                  <label className="block mb-1 text-[#00b4ff] font-semibold">Mật khẩu cũ</label>
                  <input
                    type="password"
                    className="w-full p-2 rounded bg-[#181c24] border border-[#232323] text-white"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block mb-1 text-[#00b4ff] font-semibold">Mật khẩu mới</label>
                  <input
                    type="password"
                    className="w-full p-2 rounded bg-[#181c24] border border-[#232323] text-white"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block mb-1 text-[#00b4ff] font-semibold">Nhập lại mật khẩu mới</label>
                  <input
                    type="password"
                    className="w-full p-2 rounded bg-[#181c24] border border-[#232323] text-white"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                {changePwMsg && (
                  <div className="text-red-400 font-semibold">{changePwMsg}</div>
                )}
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-[#00b4ff] px-4 py-2 rounded text-white font-semibold hover:bg-[#0078F2] transition"
                    disabled={loading}
                  >
                    {loading ? 'Đang đổi...' : 'Xác nhận đổi mật khẩu'}
                  </button>
                  <button
                    type="button"
                    className="bg-gray-500 px-4 py-2 rounded text-white font-semibold hover:bg-gray-600 transition"
                    onClick={() => setShowChangePassword(false)}
                  >
                    Hủy
                  </button>
                </div>
              </form>
            )}
          </>
        )}
        {/* Đã xóa phần quản lý địa chỉ */}
        {tab === 'orders' && (
          <div className="mt-2">
            <OrderHistory />
          </div>
        )}
        {tab === 'wishlist' && (
          <WishlistGames userId={customer?.id} />
        )}
        {tab === 'library' && (
          <Library customerId={customer?.id} />
        )}
      </main>
    </div>
  );
};

export default UserProfile;