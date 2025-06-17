import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/common/Header.jsx';
import Footer from './components/common/Footer.jsx';
import Home from './pages/Home.jsx';
import GameDetails from './pages/GameDetails.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import OrderHistory from './pages/OrderHistory.jsx';
import Admin from './pages/Admin.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import UserProfile from './pages/UserProfile.jsx';
import CategoryList from './pages/CategoryList.jsx';
import OrderManagement from './pages/OrderManagement.jsx';
import { Toaster } from 'react-hot-toast'; 
import ForgotPassword from './pages/ForgotPassword.jsx';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#121212]">
      <Header />
      {/* Thêm Toaster ở đây */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#23283a',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '1rem',
            border: '2px solid #00b4ff',
            borderRadius: '12px',
            boxShadow: '0 4px 24px #000a',
          },
          iconTheme: {
            primary: '#00b4ff',
            secondary: '#fff',
          },
        }}
      />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:id" element={<GameDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<UserProfile/>} />
          <Route path="/categoryList" element={<CategoryList/>} />
          <Route path="/admin/orders" element={<OrderManagement />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;