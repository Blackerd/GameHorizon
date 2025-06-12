import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCustomer } from '../context/CustomerContext.jsx';

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    password: '',
    email: '',
    phone: '',
    address: '',
  });
  const [error, setError] = useState('');
  const { registerCustomer } = useCustomer();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerCustomer(formData);
      navigate('/login');
    } catch (err) {
      setError('Lỗi đăng ký. Vui lòng thử lại.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-[#121212] min-h-screen flex items-center justify-center text-white">
      <div className="bg-[#202020] p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Đăng ký</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Họ và tên</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full p-2 bg-[#303030] rounded text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Tên đăng nhập</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 bg-[#303030] rounded text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 bg-[#303030] rounded text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 bg-[#303030] rounded text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Số điện thoại</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 bg-[#303030] rounded text-white"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2">Địa chỉ</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 bg-[#303030] rounded text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#0078F2] text-white py-2 rounded hover:bg-[#0060c7]"
          >
            Đăng ký
          </button>
        </form>
        <p className="mt-4 text-center">
          Đã có tài khoản? <Link to="/login" className="text-[#0078F2]">Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;