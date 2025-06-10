import React, { useState, useRef } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { User, Mail, Lock } from 'lucide-react';

const RegisterPage = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: false,
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: '',
    });

    // Ref để debounce
    const debounceTimeout = useRef({});

    // Hàm validate từng field
    const validateField = (fieldName, value) => {
        switch (fieldName) {
            case 'name':
                if (!value.trim()) return 'Vui lòng nhập họ và tên';
                return '';
            case 'email':
                if (!value.trim()) return 'Vui lòng nhập email';
                // regex kiểm tra email đơn giản
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) return 'Email không đúng định dạng';
                return '';
            case 'password':
                if (!value) return 'Vui lòng nhập mật khẩu';
                if (value.length < 6) return 'Mật khẩu phải ít nhất 6 ký tự';
                return '';
            case 'confirmPassword':
                if (!value) return 'Vui lòng xác nhận mật khẩu';
                if (value !== form.password) return 'Mật khẩu xác nhận không khớp';
                return '';
            case 'terms':
                if (!value) return 'Bạn phải đồng ý điều khoản';
                return '';
            default:
                return '';
        }
    };

    // Xử lý onChange các input
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === 'checkbox' ? checked : value;

        setForm((prev) => ({ ...prev, [name]: val }));

        // Debounce validate trên mỗi field khi user nhập
        if (debounceTimeout.current[name]) clearTimeout(debounceTimeout.current[name]);
        debounceTimeout.current[name] = setTimeout(() => {
            const errorMsg = validateField(name, val);
            setErrors((prev) => {
                if (prev[name] === errorMsg) return prev; // tránh setState vô nghĩa
                return { ...prev, [name]: errorMsg };
            });
        }, 400);
    };

    // Xử lý blur để validate ngay khi rời input
    const handleBlur = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === 'checkbox' ? checked : value;

        // Hủy debounce nếu đang có
        if (debounceTimeout.current[name]) {
            clearTimeout(debounceTimeout.current[name]);
            debounceTimeout.current[name] = null;
        }

        const errorMsg = validateField(name, val);
        setErrors((prev) => {
            if (prev[name] === errorMsg) return prev;
            return { ...prev, [name]: errorMsg };
        });
    };

    // Validate toàn bộ form trước khi submit
    const validateAll = () => {
        const newErrors = {};
        Object.keys(form).forEach((key) => {
            newErrors[key] = validateField(key, form[key]);
        });
        setErrors(newErrors);

        const isValid = Object.keys(errors).every(key => errors[key] === '');
        return isValid;
    };

    // Xử lý submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        // @ts-ignore
        if (validateAll()) {
            // Submit dữ liệu
            alert('Đăng ký thành công!');
            // Xử lý logic đăng ký ở đây
            navigate('/login'); // Điều hướng đến trang Home


        }
    };

    // CSS class border theo lỗi
    const inputBaseClass =
        'block w-full pl-10 pr-3 py-2 rounded-lg text-white placeholder-gray-400 bg-[#303030] border-2 focus:outline-none transition-colors';

    return (
        <div className="min-h-screen bg-[#121212] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white">Đăng ký tài khoản</h2>
                    <p className="mt-2 text-gray-400">
                        Đã có tài khoản?{' '}
                        <Link to="/login" className="text-[#0078F2] hover:text-[#0060c7] transition-colors">
                            Đăng nhập
                        </Link>
                    </p>
                </div>

                <div className="bg-[#202020] p-8 rounded-lg shadow-xl">
                    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                                Họ và tên
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User size={20} className="text-gray-400" />
                                </div>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={form.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Nguyễn Văn A"
                                    className={`${inputBaseClass} ${
                                        errors.name ? 'border-red-500 focus:ring-red-500' : 'border-transparent focus:ring-[#0078F2]'
                                    }`}
                                    aria-describedby="error-name"
                                />
                            </div>
                            <p
                                id="error-name"
                                className="mt-1 text-sm"
                                style={{ color: 'red', minHeight: '1.25rem' }}
                            >
                                {errors.name || ' '}
                            </p>
                        </div>

                        {/* Email */}
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
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="example@gmail.com"
                                    className={`${inputBaseClass} ${
                                        errors.email ? 'border-red-500 focus:ring-red-500' : 'border-transparent focus:ring-[#0078F2]'
                                    }`}
                                    aria-describedby="error-email"
                                />
                            </div>
                            <p
                                id="error-email"
                                className="mt-1 text-sm"
                                style={{ color: 'red', minHeight: '1.25rem' }}
                            >
                                {errors.email || ' '}
                            </p>
                        </div>

                        {/* Password */}
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
                                    name="password"
                                    type="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="••••••••"
                                    className={`${inputBaseClass} ${
                                        errors.password ? 'border-red-500 focus:ring-red-500' : 'border-transparent focus:ring-[#0078F2]'
                                    }`}
                                    aria-describedby="error-password"
                                />
                            </div>
                            <p
                                id="error-password"
                                className="mt-1 text-sm"
                                style={{ color: 'red', minHeight: '1.25rem' }}
                            >
                                {errors.password || ' '}
                            </p>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-400 mb-2">
                                Xác nhận mật khẩu
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock size={20} className="text-gray-400" />
                                </div>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="••••••••"
                                    className={`${inputBaseClass} ${
                                        errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-transparent focus:ring-[#0078F2]'
                                    }`}
                                    aria-describedby="error-confirmPassword"
                                />
                            </div>
                            <p
                                id="error-confirmPassword"
                                className="mt-1 text-sm"
                                style={{ color: 'red', minHeight: '1.25rem' }}
                            >
                                {errors.confirmPassword || ' '}
                            </p>
                        </div>

                        {/* Terms checkbox */}
                        <div className="flex items-center">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                checked={form.terms}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="h-4 w-4 bg-[#303030] border-0 rounded text-[#0078F2] focus:ring-[#0078F2]"
                                aria-describedby="error-terms"
                            />
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-400">
                                Tôi đồng ý với{' '}
                                <Link to="/terms" className="text-[#0078F2] hover:text-[#0060c7] transition-colors">
                                    điều khoản dịch vụ
                                </Link>{' '}
                                và{' '}
                                <Link to="/privacy" className="text-[#0078F2] hover:text-[#0060c7] transition-colors">
                                    chính sách bảo mật
                                </Link>
                            </label>
                        </div>
                        <p
                            id="error-terms"
                            className="mt-1 text-sm"
                            style={{ color: 'red', minHeight: '1.25rem' }}
                        >
                            {errors.terms || ' '}
                        </p>

                        {/* Submit button */}
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-white bg-[#0078F2] hover:bg-[#0060c7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0078F2] transition-colors"
                        >
                            Đăng ký
                        </button>

                        {/* Divider and social buttons */}
                        <div className="relative mt-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-[#303030]" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-[#202020] text-gray-400">Hoặc đăng ký với</span>
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

export default RegisterPage;
