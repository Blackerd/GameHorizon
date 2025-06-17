import React, { useState } from 'react';
import { initPasswordReset } from '../api/customerApi';

const ForgotPassword = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      await initPasswordReset(username);
      setMessage('Mã xác nhận đã được gửi về email của bạn. Vui lòng kiểm tra hộp thư!');
    } catch (err) {
      setError('Không tìm thấy tài khoản hoặc lỗi gửi email.');
    }
  };

  return (
    <div className="bg-[#121212] min-h-screen flex items-center justify-center text-white">
      <div className="bg-[#202020] p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Quên mật khẩu</h2>
        {message && <p className="text-green-500 mb-4">{message}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Tên đăng nhập</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full p-2 bg-[#303030] rounded text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#0078F2] text-white py-2 rounded hover:bg-[#0060c7]"
          >
            Gửi mã xác nhận
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;