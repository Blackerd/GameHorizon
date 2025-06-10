import React, { useState } from 'react';
import { User } from 'lucide-react';

const ProfilePage = () => {
    const [user, setUser] = useState({
        name: 'Nguyễn Văn A',
        email: 'example@gmail.com',
        joinDate: '01/01/2024'
    });

    return (
        <div className="bg-[#202020] rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Thông tin tài khoản</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-gray-400 text-sm mb-2">Họ và tên</label>
                    <input
                        type="text"
                        value={user.name}
                        className="w-full bg-[#303030] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0078F2]"
                    />
                </div>
                <div>
                    <label className="block text-gray-400 text-sm mb-2">Email</label>
                    <input
                        type="email"
                        value={user.email}
                        className="w-full bg-[#303030] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0078F2]"
                    />
                </div>
                <div>
                    <label className="block text-gray-400 text-sm mb-2">Mật khẩu mới</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full bg-[#303030] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0078F2]"
                    />
                </div>
                <div>
                    <label className="block text-gray-400 text-sm mb-2">Xác nhận mật khẩu</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full bg-[#303030] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0078F2]"
                    />
                </div>
            </div>

            <button className="mt-6 bg-[#0078F2] text-white px-6 py-2 rounded-lg hover:bg-[#0060c7] transition-colors">
                Lưu thay đổi
            </button>
        </div>
    );
};

export default ProfilePage;