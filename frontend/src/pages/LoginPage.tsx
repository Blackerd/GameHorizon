import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import {navigate} from "next/dist/client/components/segment-cache";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const fakeUser = {
        email: 'abc@gmail.com',
        password: '123456',
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === fakeUser.email && password === fakeUser.password) {
            navigate('/'); // Điều hướng đến trang Home
        } else {
            setError('Email hoặc mật khẩu không đúng!');
        }
    };
    return (
        <div className="min-h-screen bg-[#121212] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white">Đăng nhập</h2>
                    <p className="mt-2 text-gray-400">
                        Chưa có tài khoản?{' '}
                        <Link to="/register" className="text-[#0078F2] hover:text-[#0060c7] transition-colors">
                            Đăng ký ngay
                        </Link>
                    </p>
                </div>

                <div className="bg-[#202020] p-8 rounded-lg shadow-xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail size={20} className="text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2 border-0 bg-[#303030] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0078F2]"
                                    placeholder="example@gmail.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-2">
                                Mật khẩu
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock size={20} className="text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2 border-0 bg-[#303030] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0078F2]"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 bg-[#303030] border-0 rounded text-[#0078F2] focus:ring-[#0078F2]"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                                    Ghi nhớ đăng nhập
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link to="/forgot-password" className="text-[#0078F2] hover:text-[#0060c7] transition-colors">
                                    Quên mật khẩu?
                                </Link>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-white bg-[#0078F2] hover:bg-[#0060c7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0078F2] transition-colors"
                        >
                            Đăng nhập
                        </button>

                        <div className="relative mt-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-[#303030]"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-[#202020] text-gray-400">Hoặc đăng nhập với</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            <button
                                type="button"
                                className="w-full inline-flex justify-center py-2 px-4 border border-[#303030] rounded-lg shadow-sm bg-[#303030] text-gray-400 hover:bg-[#404040] transition-colors"
                            >
                                Google
                            </button>
                            <button
                                type="button"
                                className="w-full inline-flex justify-center py-2 px-4 border border-[#303030] rounded-lg shadow-sm bg-[#303030] text-gray-400 hover:bg-[#404040] transition-colors"
                            >
                                Facebook
                            </button>
                            <button
                                type="button"
                                className="w-full inline-flex justify-center py-2 px-4 border border-[#303030] rounded-lg shadow-sm bg-[#303030] text-gray-400 hover:bg-[#404040] transition-colors"
                            >
                                Twitter
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;