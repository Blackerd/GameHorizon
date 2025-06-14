import React, { useState } from 'react';
import { useCustomer } from '../context/CustomerContext';
import { Link, useNavigate } from 'react-router-dom';
import OrderHistory from './OrderHistory';
import WishlistGames from '../components/wishlist/WishlistGames';
import AddressManager from './AddressManager';

const UserProfile = () => {
  const { customer } = useCustomer();
  const [tab, setTab] = useState('profile');
  const navigate = useNavigate();

  if (!customer) return <div className="p-8 text-center text-white">Bạn chưa đăng nhập.</div>;

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
          <button
            className={`text-left px-4 py-2 rounded font-semibold transition ${
              tab === 'address'
                ? 'bg-[#0078F2] text-white shadow'
                : 'hover:bg-[#232323] text-gray-200'
            }`}
            onClick={() => setTab('address')}
          >
            <span role="img" aria-label="address" className="mr-2">🏠</span>
            Quản lý địa chỉ
          </button>
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
            <Link
              to="/change-password"
              className="inline-block bg-[#0078F2] text-white px-6 py-2 rounded-lg hover:bg-[#0060c7] transition font-semibold shadow"
            >
              Đổi mật khẩu
            </Link>
          </>
        )}
        {tab === 'address' && (
          <AddressManager />
        )}
        {tab === 'orders' && (
          <div className="mt-2">
            <OrderHistory />
          </div>
        )}
        {tab === 'wishlist' && (
          <WishlistGames userId={customer?.id} />
        )}
      </main>
    </div>
  );
};

export default UserProfile;