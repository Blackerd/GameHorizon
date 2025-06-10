import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = ({ isMenuOpen, toggleMenu }) => {
  const navItems = [
    { to: '/', label: 'Trang chủ' },
    { to: '/cart', label: 'Giỏ hàng' },
    { to: '/orders', label: 'Đơn hàng' },
    { to: '/admin', label: 'Quản trị' },
    { to: '/login', label: 'Đăng nhập' },
    { to: '/register', label: 'Đăng ký' },
  ];

  return (
    <nav className={isMenuOpen ? 'flex flex-col space-y-2 p-4 bg-[#202020]' : 'flex space-x-6'}>
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            isActive ? 'text-[#0078F2] font-semibold' : 'text-white hover:text-[#0078F2]'
          }
          onClick={toggleMenu}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;