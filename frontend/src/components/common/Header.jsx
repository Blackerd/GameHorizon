import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, LogOutIcon } from 'lucide-react';
import Navigation from './Navigation.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { useCustomer } from '../../context/CustomerContext.jsx';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();
  const { customer, logoutCustomer } = useCustomer();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-[#121212] text-white sticky top-0 z-50 border-b border-[#303030]">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-[#0078F2]">
          Game Horizon
        </Link>

        <div className="hidden md:block">
          <Navigation />
        </div>

        <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingCart size={24} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#0078F2] text-white text-xs rounded-full px-2 py-1">
                  {cart.length}
                </span>
              )}
            </Link>
          {customer ? (
            <div className="flex items-center space-x-2">
            <Link to="/profile" className="flex items-center">
            <User size={24} className="hover:text-[#0078F2] transition" />
          </Link>
              <span>{customer.fullname}</span>
           <button
            onClick={logoutCustomer}
            className="text-[#0078F2] hover:bg-[#232323] rounded-full p-1 transition"
            aria-label="Đăng xuất"
            title="Đăng xuất"
          >
            <LogOutIcon size={20} />
          </button>
            </div>
          ) : (
             <>
              <Link to="/login" className="text-[#0078F2]">
                Đăng nhập
              </Link>
              <Link to="/register" className="text-[#0078F2]">
                Đăng ký
              </Link>
            </>
                      
          )}
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <Navigation isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </div>
      )}
    </header>
  );
};

export default Header;