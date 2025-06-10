import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Home, Gift, Download, User, X } from 'lucide-react';

interface NavigationProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ isMenuOpen, toggleMenu }) => {
  const navItems = [
    { title: 'Cửa hàng', icon: <Home size={20} />, path: '/home' },
    { title: 'Thư viện', icon: <Download size={20} />, path: '/library' },
    { title: 'Ưu đãi', icon: <Gift size={20} />, path: '/deals' },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block border-t border-[#303030]">
        <div className="container mx-auto px-4">
          <ul className="flex space-x-8">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link 
                  to={item.path}
                  className="flex items-center py-3 text-gray-300 hover:text-white transition-colors"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-70 z-40 md:hidden transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMenu}
      />
      
      <nav 
        className={`fixed top-0 right-0 h-full w-64 bg-[#202020] z-50 md:hidden transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-5">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xl font-bold text-[#0078F2]">EPIC</span>
            <button onClick={toggleMenu}>
              <X size={24} className="text-gray-300" />
            </button>
          </div>
          
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm trò chơi..."
                className="w-full px-4 py-2 bg-[#303030] text-white rounded-full focus:outline-none"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search size={20} />
              </button>
            </div>
          </div>
          
          <ul className="space-y-4">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link 
                  to={item.path}
                  className="flex items-center space-x-3 py-2 px-3 rounded-lg text-gray-300 hover:bg-[#303030] hover:text-white transition-colors"
                  onClick={toggleMenu}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navigation;