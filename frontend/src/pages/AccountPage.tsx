import React, { useState } from 'react';
import { User, Package, CreditCard, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProfilePage from './ProfilePage';
import OrdersPage from './OrdersPage';
import PaymentMethodsPage from './PaymentsMethodPage';

const AccountPage = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const navigate = useNavigate();

    const user = {
        name: 'Nguyễn Văn A',
        email: 'example@gmail.com',
    };

    const handleLogout = () => {
        // Add logout logic here
        navigate('/login');
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return <ProfilePage />;
            case 'orders':
                return <OrdersPage />;
            case 'payment':
                return <PaymentMethodsPage />;
            default:
                return null;
        }
    };

    return (
        <div className="bg-[#121212] min-h-screen py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="md:w-1/4">
                        <div className="bg-[#202020] rounded-lg p-6">
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="bg-[#303030] p-3 rounded-full">
                                    <User size={24} className="text-[#0078F2]" />
                                </div>
                                <div>
                                    <h2 className="text-white font-semibold">{user.name}</h2>
                                    <p className="text-gray-400 text-sm">{user.email}</p>
                                </div>
                            </div>

                            <nav>
                                <ul className="space-y-2">
                                    <li>
                                        <button
                                            onClick={() => setActiveTab('profile')}
                                            className={`w-full flex items-center space-x-3 p-3 rounded-lg ${
                                                activeTab === 'profile'
                                                    ? 'bg-[#303030] text-white'
                                                    : 'text-gray-400 hover:bg-[#303030] hover:text-white'
                                            } transition-colors`}
                                        >
                                            <User size={20} />
                                            <span>Thông tin tài khoản</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => setActiveTab('orders')}
                                            className={`w-full flex items-center space-x-3 p-3 rounded-lg ${
                                                activeTab === 'orders'
                                                    ? 'bg-[#303030] text-white'
                                                    : 'text-gray-400 hover:bg-[#303030] hover:text-white'
                                            } transition-colors`}
                                        >
                                            <Package size={20} />
                                            <span>Đơn hàng của tôi</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => setActiveTab('payment')}
                                            className={`w-full flex items-center space-x-3 p-3 rounded-lg ${
                                                activeTab === 'payment'
                                                    ? 'bg-[#303030] text-white'
                                                    : 'text-gray-400 hover:bg-[#303030] hover:text-white'
                                            } transition-colors`}
                                        >
                                            <CreditCard size={20} />
                                            <span>Phương thức thanh toán</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center space-x-3 p-3 rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                                        >
                                            <LogOut size={20} />
                                            <span>Đăng xuất</span>
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="md:w-3/4">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountPage;