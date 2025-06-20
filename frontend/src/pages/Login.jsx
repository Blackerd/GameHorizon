import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCustomer } from '../context/CustomerContext.jsx';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { loginCustomer } = useCustomer();
  const navigate = useNavigate();

  const validateUsername = (value) => {
    if (!value.trim()) return 'Vui lòng nhập tên đăng nhập';
    return '';
  };

  const validatePassword = (value) => {
    if (!value.trim()) return 'Vui lòng nhập mật khẩu';
    if (value.length < 6) return 'Mật khẩu phải có ít nhất 6 ký tự';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userErr = validateUsername(username);
    const passErr = validatePassword(password);
    setUsernameError(userErr);
    setPasswordError(passErr);
    if (userErr || passErr) {
      setError('');
      return;
    }
    setError('');
    try {
      const user = await loginCustomer(username, password);
      if (user && user.role) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError('Sai tên đăng nhập hoặc mật khẩu');
    }
  };

  return (
    <div className="bg-[#121212] min-h-screen flex items-center justify-center text-white">
      <div className="bg-[#202020] p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Tên đăng nhập</label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setUsernameError(validateUsername(e.target.value));
                setError('');
              }}
              className="w-full p-2 bg-[#303030] rounded text-white"
            />
            <div className="text-red-400 text-sm h-5 mt-1 overflow-hidden">{usernameError || '\u00A0'}</div>
          </div>
          <div className="mb-6">
            <label className="block mb-2">Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(validatePassword(e.target.value));
                setError('');
              }}
              className="w-full p-2 bg-[#303030] rounded text-white"
            />
            <div className="text-red-400 text-sm h-5 mt-1 overflow-hidden">{passwordError || '\u00A0'}</div>
          </div>
          <button
            type="submit"
            className="w-full bg-[#0078F2] text-white py-2 rounded hover:bg-[#0060c7]"
          >
            Đăng nhập
          </button>
        </form>
      <p className="mt-4 text-center">
      Chưa có tài khoản? <Link to="/register" className="text-[#0078F2]">Đăng ký</Link>
    </p>
    <p className="mt-2 text-center">
      <Link to="/forgot-password" className="text-[#0078F2]">Quên mật khẩu?</Link>
    </p>
      </div>
    </div>
  );
};

export default Login;