import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCustomer } from '../context/CustomerContext.jsx';
import toast from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    password: '',
    email: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [fieldError, setFieldError] = useState({});
  const { registerCustomer } = useCustomer();
  const navigate = useNavigate();

  const validateField = (name, value) => {
    switch (name) {
      case 'fullname':
        if (!value.trim()) return 'Vui lòng nhập họ và tên';
        break;
      case 'username':
        if (!value.trim()) return 'Vui lòng nhập tên đăng nhập';
        break;
      case 'password':
        if (!value.trim()) return 'Vui lòng nhập mật khẩu';
        if (value.length < 6) return 'Mật khẩu phải có ít nhất 6 ký tự';
        break;
      case 'email':
        if (!value.trim()) return 'Vui lòng nhập email';
        if (!/^\S+@\S+\.\S+$/.test(value)) return 'Email không hợp lệ';
        break;
      case 'phone':
        if (value && !/^\d{9,11}$/.test(value)) return 'Số điện thoại không hợp lệ';
        break;
      default:
        break;
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate all fields before submit
    const newFieldError = {};
    Object.entries(formData).forEach(([k, v]) => {
      const err = validateField(k, v);
      if (err) newFieldError[k] = err;
    });
    setFieldError(newFieldError);
    if (Object.values(newFieldError).some(Boolean)) {
      setError('');
      return;
    }
    setError('');
    try {
      await registerCustomer(formData);
      navigate('/login');
    } catch (err)
    {
      setError(err?.response?.data?.message || 'Đăng ký thất bại');
      toast.error(err?.response?.data?.message || 'Đăng ký thất bại');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFieldError({ ...fieldError, [name]: validateField(name, value) });
    setError('');
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
            />
            <div className="text-red-400 text-sm h-5 mt-1 overflow-hidden">{fieldError.fullname || '\u00A0'}</div>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Tên đăng nhập</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 bg-[#303030] rounded text-white"
            />
            <div className="text-red-400 text-sm h-5 mt-1 overflow-hidden">{fieldError.username || '\u00A0'}</div>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 bg-[#303030] rounded text-white"
            />
            <div className="text-red-400 text-sm h-5 mt-1 overflow-hidden">{fieldError.password || '\u00A0'}</div>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 bg-[#303030] rounded text-white"
            />
            <div className="text-red-400 text-sm h-5 mt-1 overflow-hidden">{fieldError.email || '\u00A0'}</div>
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
            <div className="text-red-400 text-sm h-5 mt-1 overflow-hidden">{fieldError.phone || '\u00A0'}</div>
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