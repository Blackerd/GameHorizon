import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = ({ isMenuOpen, toggleMenu }) => {
  const navItems = [
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