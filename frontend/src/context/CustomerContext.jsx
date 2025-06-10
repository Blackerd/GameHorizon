import React, { createContext, useContext, useState } from 'react';
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
      setCustomer(data);
      localStorage.setItem('customer', JSON.stringify(data));
      return data;
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
  };

  return (
    <CustomerContext.Provider value={{ customer, loginCustomer, registerCustomer, logoutCustomer }}>
      {children}
    </CustomerContext.Provider>
  );
};