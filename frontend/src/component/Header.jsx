import React, { useState } from "react";
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX } from "react-icons/fi";

const Header = ({ isMenuOpen, setIsMenuOpen, setIsCartOpen }) => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // true: Login, false: Register

  const toggleAuthForm = () => {
    setIsAuthOpen(!isAuthOpen);
  };

  const switchAuthMode = () => {
    setIsLogin(!isLogin);
  };

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
            <FiUser 
              className="text-gray-600 text-2xl cursor-pointer"
              onClick={toggleAuthForm}
            />
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
              {isMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
            </button>
          </div>
        </div>

        {/* Responsive Mobile Menu */}
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

        {/* Login/Register Form */}
        {isAuthOpen && (
          <div className="absolute top-20 right-4 w-80 bg-white shadow-lg rounded-lg p-6 z-50">
            <h2 className="text-xl font-semibold mb-4">{isLogin ? "Login" : "Register"}</h2>
            <form className="space-y-4">
              {!isLogin && (
                <input 
                  type="text" 
                  placeholder="Username" 
                  className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
                />
              )}
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
              />
              <input 
                type="password" 
                placeholder="Password" 
                className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
              />
              <button 
                type="submit" 
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition"
              >
                {isLogin ? "Login" : "Register"}
              </button>
            </form>
            <p className="mt-4 text-center text-sm">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <span 
                onClick={switchAuthMode} 
                className="text-blue-500 hover:underline cursor-pointer"
              >
                {isLogin ? "Register" : "Login"}
              </span>
            </p>
            <button 
              onClick={toggleAuthForm} 
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <FiX size={20} />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
