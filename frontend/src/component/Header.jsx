import React from "react";
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX } from "react-icons/fi";

const Header = ({ isMenuOpen, setIsMenuOpen, setIsCartOpen }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <img src="https://images.unsplash.com/photo-1614179924047-e1ab49a0a0cf" alt="Logo" className="h-8 w-auto" />
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-blue-600">Home</a>
              <a href="#" className="text-gray-600 hover:text-blue-600">Categories</a>
              <a href="#" className="text-gray-600 hover:text-blue-600">Deals</a>
            </nav>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2">
              <input type="text" placeholder="Search" className="bg-transparent border-none focus:outline-none" />
              <FiSearch className="text-gray-500 ml-2" />
            </div>
            <FiShoppingCart 
              className="text-gray-600 text-2xl cursor-pointer relative" 
              onClick={() => setIsCartOpen(true)}
            />
            <FiUser className="text-gray-600 text-2xl cursor-pointer" />
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
              {isMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <a href="#" className="text-gray-600 hover:text-blue-600">Home</a>
              <a href="#" className="text-gray-600 hover:text-blue-600">Categories</a>
              <a href="#" className="text-gray-600 hover:text-blue-600">Deals</a>
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                <input type="text" placeholder="Search" className="bg-transparent border-none focus:outline-none" />
                <FiSearch className="text-gray-500 ml-2" />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
