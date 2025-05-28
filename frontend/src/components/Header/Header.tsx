import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, User } from 'lucide-react';
import Navigation from './Navigation';
import { useCart } from '../../context/CartContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cart } = useCart();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-[#202020] text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-[#0078F2] font-bold text-2xl mr-2">Game Horizon </span>
            <span className="font-semibold hidden md:inline">Game Store</span>
          </Link>
        </div>

        <div className="hidden md:flex flex-1 max-w-xl mx-10">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Tìm kiếm trò chơi..."
              className="w-full px-4 py-2 bg-[#303030] text-white rounded-full focus:outline-none focus:ring-2 focus:ring-[#0078F2]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
              <Search size={20} />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative">
            <ShoppingCart className="text-gray-300 hover:text-white transition-colors" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#0078F2] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>
          <Link to="/account">
            <button className="text-gray-300 hover:text-white transition-colors hidden md:block">
              <User size={24} />
            </button>
          </Link>          <button
            className="md:hidden text-gray-300 hover:text-white transition-colors"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <Navigation isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </header>
  );
};

export default Header;