import React, { useState } from 'react';
import { Users, List, Package } from 'lucide-react';
import ProductManagement from './ProductManagement.jsx';
import CategoryManagement from './CategoryManagement.jsx';
import UserManagement from './UserManagement.jsx';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('products');

  return (
    <div className="bg-[#121212] min-h-screen text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#202020] min-h-screen p-6 flex flex-col gap-4 shadow-lg">
        <h2 className="text-2xl font-bold text-[#0078F2] mb-8 text-center">Admin Dashboard</h2>
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded transition ${
            activeTab === 'products' ? 'bg-[#0078F2] text-white' : 'hover:bg-[#303030]'
          }`}
          onClick={() => setActiveTab('products')}
        >
          <Package size={20} /> Quản lý sản phẩm
        </button>
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded transition ${
            activeTab === 'categories' ? 'bg-[#0078F2] text-white' : 'hover:bg-[#303030]'
          }`}
          onClick={() => setActiveTab('categories')}
        >
          <List size={20} /> Quản lý danh mục
        </button>
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded transition ${
            activeTab === 'users' ? 'bg-[#0078F2] text-white' : 'hover:bg-[#303030]'
          }`}
          onClick={() => setActiveTab('users')}
        >
          <Users size={20} /> Quản lý người dùng
        </button>
      </aside>
      {/* Main content */}
      <main className="flex-1 p-8 bg-[#181818] min-h-screen overflow-auto">
        {activeTab === 'products' && <ProductManagement />}
        {activeTab === 'categories' && <CategoryManagement />}
        {activeTab === 'users' && <UserManagement />}
      </main>
    </div>
  );
};

export default Admin;