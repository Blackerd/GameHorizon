import React, { useState } from 'react';
import { useCustomer } from '../context/CustomerContext';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import OrderHistory from './OrderHistory';
import WishlistGames from '../components/wishlist/WishlistGames';
import Library from './Library';
import axiosInstance from '../api/axiosInstance';
import toast from 'react-hot-toast';
import ProfileTabContainer from '../components/common/ProfileTabContainer';



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
  const [editingPhone, setEditingPhone] = useState(false);
  const [newPhone, setNewPhone] = useState(customer.phone || '');
  const [phoneLoading, setPhoneLoading] = useState(false);
  // Tab bảo mật - SMS
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const [smsPhone, setSmsPhone] = useState(customer.phone || '');
  const [smsLoading, setSmsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');


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
    <div className="max-w-4xl mx-auto flex bg-gradient-to-br from-[#23283a] to-[#181c24] rounded-2xl mt-12 shadow-2xl overflow-hidden min-h-[520px] border border-[#232323] mb-16">
      {/* Sidebar giữ bên trái */}
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
              tab === 'changePassword'
                ? 'bg-[#0078F2] text-white shadow'
                : 'hover:bg-[#232323] text-gray-200'
            }`}
            onClick={() => setTab('changePassword')}
          >
            <span role="img" aria-label="password" className="mr-2">🔒</span>
            Đổi mật khẩu
          </button>
          <button
            className={`text-left px-4 py-2 rounded font-semibold transition ${
              tab === 'f2p'
                ? 'bg-[#0078F2] text-white shadow'
                : 'hover:bg-[#232323] text-gray-200'
            }`}
            onClick={() => setTab('f2p')}
          >
            <span role="img" aria-label="f2p" className="mr-2">🛡️</span>
            Bảo mật F2P
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
          <button
            className={`text-left px-4 py-2 rounded font-semibold transition ${
              tab === 'payment'
                ? 'bg-[#0078F2] text-white shadow'
                : 'hover:bg-[#232323] text-gray-200'
            }`}
            onClick={() => setTab('payment')}
          >
            <span role="img" aria-label="payment" className="mr-2">💳</span>
            Thanh toán
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
      {/* Main content căn lên trên cùng */}
      <main className="flex-1 p-12 text-white bg-opacity-90 flex flex-col items-start justify-start">
        {tab === 'profile' && (
          <ProfileTabContainer title="Thông tin tài khoản">
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
              <div className="flex items-center">
                <span className="font-semibold text-[#00b4ff]">Số điện thoại:</span>
                {editingPhone ? (
                  <>
                    <input
                      className="ml-2 p-1 rounded bg-[#181c24] border border-[#232323] text-white"
                      value={newPhone}
                      onChange={e => setNewPhone(e.target.value)}
                    />
                    <button
                      className="ml-2 bg-[#00b4ff] text-white px-2 py-1 rounded"
                      disabled={phoneLoading}
                      onClick={async () => {
                        setPhoneLoading(true);
                        try {
                          await axiosInstance.put(`/customer/updateByUser/${customer.id}`, { number_phone: newPhone });
                          toast.success('Cập nhật số điện thoại thành công!');
                          setEditingPhone(false);
                          // Có thể cần reload lại user context ở đây
                        } catch (e) {
                          toast.error('Cập nhật thất bại!');
                        }
                        setPhoneLoading(false);
                      }}
                    >Lưu</button>
                    <button className="ml-2 text-gray-400" onClick={() => setEditingPhone(false)}>Hủy</button>
                  </>
                ) : (
                  <>
                    <span className="ml-2">{customer.phone || 'Chưa có'}</span>
                    <button className="ml-2 text-blue-400 underline" onClick={() => setEditingPhone(true)}>Thay đổi</button>
                  </>
                )}
              </div>
            </div>
          </ProfileTabContainer>
        )}
        {tab === 'changePassword' && (
          <ProfileTabContainer title="Đổi mật khẩu">
            <form
              className="mt-6 space-y-4 max-w-md"
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
                  onClick={() => {
                    setShowChangePassword(false);
                    setTab('profile');
                  }}
                >
                  Hủy
                </button>
              </div>
            </form>
          </ProfileTabContainer>
        )}
        {tab === 'f2p' && (
          <ProfileTabContainer title="Bảo mật F2P (Xác thực 2 lớp)">
            <div className="space-y-8 w-full max-w-2xl">
              {/* Bật phương thức */}
              <div>
                <div className="font-bold text-lg mb-4">Bật Phương thức</div>
                <div className="flex items-start gap-4 bg-[#23283a] rounded-xl p-5 mb-2">
                  <div className="text-3xl mt-1 text-pink-400">
                    <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7Z" stroke="#e879f9" strokeWidth="1.5"/><path d="M2 7l10 6 10-6" stroke="#e879f9" strokeWidth="1.5"/></svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 font-semibold text-white">Email <span className="bg-blue-600 text-xs px-2 py-0.5 rounded text-white">Chính</span> <span className="text-green-400 text-lg">✔</span></div>
                    <div className="text-gray-300 text-sm mt-1">Sử dụng địa chỉ email làm phương thức xác thực hai yếu tố. Bạn sẽ phải nhập mã bảo mật được gửi đến địa chỉ liên kết với tài khoản.</div>
                  </div>
                  <div className="flex items-center">
                    <button className="text-gray-400 hover:text-white text-2xl px-2">...</button>
                  </div>
                </div>
              </div>
              {/* Phương thức khả dụng */}
              <div>
                <div className="font-bold text-lg mb-4">Phương thức khả dụng</div>
                {/* Ứng dụng xác thực */}
                <div className="flex items-start gap-4 bg-[#23283a] rounded-xl p-5 mb-4">
                  <div className="text-3xl mt-1 text-pink-400">
                    <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="3" stroke="#e879f9" strokeWidth="1.5"/><circle cx="12" cy="18" r="1" fill="#e879f9"/></svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 font-semibold text-white">Ứng dụng xác thực</div>
                    <div className="text-gray-300 text-sm mt-1">Sử dụng một <a href="#" className="text-blue-400 underline">Ứng dụng xác thực</a> làm phương thức xác thực hai yếu tố. Bạn sẽ phải nhập mã bảo mật do Ứng dụng xác thực cung cấp.</div>
                  </div>
                  <div className="flex items-center">
                    <button className="bg-[#23283a] border border-[#444] text-white px-4 py-2 rounded-lg hover:bg-[#181c24] transition">Thiết lập</button>
                  </div>
                </div>
                {/* SMS */}
                <div className="flex items-start gap-4 bg-[#23283a] rounded-xl p-5">
                  <div className="text-3xl mt-1 text-pink-400">
                    <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="3" stroke="#e879f9" strokeWidth="1.5"/><path d="M3 7l9 6 9-6" stroke="#e879f9" strokeWidth="1.5"/></svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 font-semibold text-white">
                      SMS
                      {customer.phone && <span className="text-green-400 text-lg">✔</span>}
                    </div>
                    <div className="text-gray-300 text-sm mt-1">
                      {customer.phone
                        ? `Số điện thoại đã xác thực: ${customer.phone}`
                        : 'Hãy sử dụng số điện thoại làm phương thức xác thực hai yếu tố.'}
                    </div>
                    {showPhoneInput && !otpSent && (
                      <div className="mt-2 flex gap-2">
                        <input
                          className="p-1 rounded bg-[#181c24] border border-[#232323] text-white"
                          value={smsPhone}
                          onChange={e => setSmsPhone(e.target.value)}
                          placeholder="Nhập số điện thoại"
                        />
                        <button
                          className="bg-[#00b4ff] text-white px-2 py-1 rounded"
                          disabled={smsLoading}
                          onClick={async () => {
                            setSmsLoading(true);
                            try {
                              await axiosInstance.put(`/customer/updateByUser/${customer.id}`, { number_phone: smsPhone });
                              toast.success('Cập nhật số điện thoại thành công!');
                              setOtpSent(true); // Giả lập đã gửi OTP
                              // Có thể gọi API gửi OTP ở đây nếu backend hỗ trợ
                            } catch (e) {
                              toast.error('Cập nhật thất bại!');
                            }
                            setSmsLoading(false);
                          }}
                        >Nhận mã OTP</button>
                        <button className="text-gray-400" onClick={() => setShowPhoneInput(false)}>Hủy</button>
                      </div>
                    )}
                    {showPhoneInput && otpSent && (
                      <div className="mt-2 flex gap-2">
                        <input
                          className="p-1 rounded bg-[#181c24] border border-[#232323] text-white"
                          value={otp}
                          onChange={e => setOtp(e.target.value)}
                          placeholder="Nhập mã OTP"
                        />
                        <button
                          className="bg-[#00b4ff] text-white px-2 py-1 rounded"
                          onClick={async () => {
                            // TODO: Gửi API xác thực OTP nếu backend hỗ trợ
                            setShowPhoneInput(false);
                            setOtpSent(false);
                            toast.success('Xác thực thành công!');
                          }}
                        >Xác nhận</button>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center">
                    {!customer.phone && !showPhoneInput && (
                      <button
                        className="bg-[#23283a] border border-[#444] text-white px-4 py-2 rounded-lg hover:bg-[#181c24] transition"
                        onClick={() => setShowPhoneInput(true)}
                      >Thiết lập</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </ProfileTabContainer>
        )}
        {tab === 'orders' && (
          <ProfileTabContainer title="Lịch sử đơn hàng">
            <OrderHistory />
          </ProfileTabContainer>
        )}
        {tab === 'wishlist' && (
          <ProfileTabContainer title="Danh sách Wishlist">
            <WishlistGames userId={customer?.id} />
          </ProfileTabContainer>
        )}
        {tab === 'library' && (
          <ProfileTabContainer title="🎮 Thư viện game của bạn">
            <Library customerId={customer?.id} />
          </ProfileTabContainer>
        )}
        {tab === 'payment' && (
          <ProfileTabContainer title="Phương thức thanh toán">
            <div className="max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Thêm/Sửa thẻ ngân hàng</h2>
              <PaymentCardForm />
            </div>
          </ProfileTabContainer>
        )}
      </main>
    </div>
  );
};

function PaymentCardForm() {
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    cardHolder: '',
    expMonth: '',
    expYear: '',
    cvv: '',
  });
  const [error, setError] = useState({});
  const [success, setSuccess] = useState('');
  const [savedCard, setSavedCard] = useState(null);
  const [showForm, setShowForm] = useState(true);

  // Tạo danh sách tháng và năm
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 12 }, (_, i) => (currentYear + i).toString().slice(-2));

  // Validation từng trường
  const validateField = (name, value) => {
    switch (name) {
      case 'cardNumber':
        if (!/^[0-9]{16}$/.test(value.replace(/\s/g, ''))) return 'Số thẻ phải đủ 16 số';
        break;
      case 'cardHolder':
        if (!value.trim()) return 'Vui lòng nhập tên chủ thẻ';
        break;
      case 'expMonth':
        if (!value) return 'Chọn tháng';
        break;
      case 'expYear':
        if (!value) return 'Chọn năm';
        break;
      case 'cvv':
        if (!/^\d{3,4}$/.test(value)) return 'CVV phải 3-4 số';
        break;
      default:
        break;
    }
    return '';
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardInfo({ ...cardInfo, [name]: value });
    setError({ ...error, [name]: validateField(name, value) });
    setSuccess('');
  };

  const handleSave = (e) => {
    e.preventDefault();
    const newError = {};
    Object.entries(cardInfo).forEach(([k, v]) => {
      const err = validateField(k, v);
      if (err) newError[k] = err;
    });
    setError(newError);
    if (Object.keys(newError).length > 0 && Object.values(newError).some(Boolean)) {
      setSuccess('');
      return;
    }
    setSuccess('Lưu thông tin thẻ thành công!');
    setSavedCard({ ...cardInfo });
    setShowForm(false);
  };

  const handleDelete = () => {
    setSavedCard(null);
    setShowForm(true);
    setSuccess('');
    setCardInfo({ cardNumber: '', cardHolder: '', expMonth: '', expYear: '', cvv: '' });
  };

  if (!showForm && savedCard) {
    return (
      <div className="bg-[#23283a] rounded-xl p-6 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <span className="text-2xl">💳</span>
          <span className="font-semibold text-white">Thẻ ngân hàng đã lưu</span>
        </div>
        <div className="text-gray-300 text-sm mt-2">**** **** **** {savedCard.cardNumber.slice(-4)}</div>
        <div className="text-gray-400 text-xs">Tên chủ thẻ: {savedCard.cardHolder}</div>
        <div className="text-gray-400 text-xs">Hết hạn: {savedCard.expMonth}/{savedCard.expYear}</div>
        <div className="flex gap-3 mt-4">
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700" onClick={handleDelete}>Xóa</button>
          <button className="bg-[#00b4ff] text-white px-4 py-2 rounded hover:bg-[#0078F2]" onClick={() => { setShowForm(true); setSuccess(''); }}>Thêm mới</button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-5">
      <div>
        <label className="block mb-2 font-semibold">Số thẻ</label>
        <input
          type="text"
          name="cardNumber"
          value={cardInfo.cardNumber}
          onChange={handleCardChange}
          maxLength={16}
          inputMode="numeric"
          autoComplete="cc-number"
          className="w-full p-2 bg-[#303030] rounded text-white tracking-widest"
          placeholder="1234 5678 9012 3456"
          required
        />
        {error.cardNumber && <div className="text-red-400 text-sm mt-1">{error.cardNumber}</div>}
      </div>
      <div>
        <label className="block mb-2 font-semibold">Tên chủ thẻ</label>
        <input
          type="text"
          name="cardHolder"
          value={cardInfo.cardHolder}
          onChange={handleCardChange}
          autoComplete="cc-name"
          className="w-full p-2 bg-[#303030] rounded text-white uppercase"
          placeholder="NGUYEN VAN A"
          required
        />
        {error.cardHolder && <div className="text-red-400 text-sm mt-1">{error.cardHolder}</div>}
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block mb-2 font-semibold">Ngày hết hạn</label>
          <div className="flex gap-2">
            <select
              name="expMonth"
              value={cardInfo.expMonth}
              onChange={handleCardChange}
              className="p-2 rounded bg-[#303030] text-white"
              required
            >
              <option value="">Tháng</option>
              {months.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <select
              name="expYear"
              value={cardInfo.expYear}
              onChange={handleCardChange}
              className="p-2 rounded bg-[#303030] text-white"
              required
            >
              <option value="">Năm</option>
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          {(error.expMonth || error.expYear) && <div className="text-red-400 text-sm mt-1">{error.expMonth || error.expYear}</div>}
        </div>
        <div className="flex-1">
          <label className="block mb-2 font-semibold">CVV</label>
          <input
            type="password"
            name="cvv"
            value={cardInfo.cvv}
            onChange={handleCardChange}
            maxLength={4}
            autoComplete="cc-csc"
            className="w-full p-2 bg-[#303030] rounded text-white"
            placeholder="123"
            required
          />
          {error.cvv && <div className="text-red-400 text-sm mt-1">{error.cvv}</div>}
        </div>
      </div>
      {success && <div className="text-green-400 text-center">{success}</div>}
      <button
        type="submit"
        className="w-full py-2 rounded bg-[#0078F2] text-white hover:bg-[#0060c7] font-semibold text-lg shadow"
      >
        Lưu thông tin thẻ
      </button>
    </form>
  );
}

export default UserProfile;