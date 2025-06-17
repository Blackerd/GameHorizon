import React, { createContext, useContext, useState,useEffect } from 'react';
import { login, register } from '../api/authApi';

const CustomerContext = createContext();

export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (!context) throw new Error('useCustomer phải được dùng trong CustomerProvider');
  return context;
};

export const CustomerProvider = ({ children }) => {
  const [customer, setCustomer] = useState(JSON.parse(localStorage.getItem('customer')) || null);

  const loginCustomer = async (username, password) => {
    try {
      const { data } = await login({ username, password });
      // Kiểm tra dữ liệu trả về
    if (!data.user?.id || !data.user?.cartId) {
      alert('Lỗi: Thiếu thông tin user hoặc cartId!');
      throw new Error('Thiếu thông tin user hoặc cartId');
    }
      setCustomer(data.user);
      localStorage.setItem('customer', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      return data.user;
    } catch (error) {
      console.error('Lỗi đăng nhập:', {
        message: error.message,
        code: error.code,
        response: error.response ? {
          status: error.response.status,
          data: error.response.data
        } : null
      });
      throw error;
    }
  };

  const isAdmin = customer?.role === true;

  const registerCustomer = async (customerData) => {
    try {
      const { data } = await register(customerData);
      return data;
    } catch (error) {
      console.error('Lỗi đăng ký:', error);
      throw error;
    }
  };

  const logoutCustomer = () => {
    setCustomer(null);
    localStorage.removeItem('customer');
    localStorage.removeItem('token');
  };

    // Tự động logout khi tắt tab, reload hoặc đóng trình duyệt
  useEffect(() => {
    const handleUnload = () => {
      logoutCustomer();
    };
    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, []);


  return (
    <CustomerContext.Provider value={{
      customer,
      loginCustomer,
      registerCustomer,
      logoutCustomer,
      isAdmin,
    }}>
      {children}
    </CustomerContext.Provider>
  );
};