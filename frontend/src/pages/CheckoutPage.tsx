import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
    const { cart } = useCart();
    const [paymentMethod, setPaymentMethod] = useState('credit-card');

    const subtotal = cart.reduce((total, game) => {
        const discountedPrice = game.discount > 0
            ? Math.round(game.price * (1 - game.discount / 100))
            : game.price;
        return total + discountedPrice;
    }, 0);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle checkout logic here
    };

    return (
        <div className="bg-[#121212] min-h-screen py-12">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-white">Thanh toán</h1>
                    <Link
                        to="/cart"
                        className="flex items-center text-gray-300 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={20} className="mr-2" />
                        Quay lại giỏ hàng
                    </Link>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content */}
                    <div className="lg:w-2/3">
                        <div className="bg-[#202020] rounded-lg p-6 mb-6">
                            <h2 className="text-xl font-semibold text-white mb-4">Thông tin thanh toán</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">
                                            Họ và tên
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full bg-[#303030] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0078F2]"
                                            placeholder="Nguyễn Văn A"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="w-full bg-[#303030] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0078F2]"
                                            placeholder="example@gmail.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-white font-medium mb-3">Phương thức thanh toán</h3>
                                    <div className="space-y-3">
                                        <label className="flex items-center p-4 border border-[#303030] rounded-lg cursor-pointer hover:border-[#0078F2] transition-colors">
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="credit-card"
                                                checked={paymentMethod === 'credit-card'}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                className="h-4 w-4 text-[#0078F2] focus:ring-[#0078F2] border-gray-300"
                                            />
                                            <span className="ml-3 flex items-center text-white">
                        <CreditCard size={20} className="mr-2" />
                        Thẻ tín dụng / Ghi nợ
                      </span>
                                        </label>

                                        {paymentMethod === 'credit-card' && (
                                            <div className="p-4 bg-[#303030] rounded-lg space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                                        Số thẻ
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="w-full bg-[#404040] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0078F2]"
                                                        placeholder="1234 5678 9012 3456"
                                                        required
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-400 mb-2">
                                                            Ngày hết hạn
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="w-full bg-[#404040] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0078F2]"
                                                            placeholder="MM/YY"
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-400 mb-2">
                                                            CVV
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="w-full bg-[#404040] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0078F2]"
                                                            placeholder="123"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <label className="flex items-center p-4 border border-[#303030] rounded-lg cursor-pointer hover:border-[#0078F2] transition-colors">
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="momo"
                                                checked={paymentMethod === 'momo'}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                className="h-4 w-4 text-[#0078F2] focus:ring-[#0078F2] border-gray-300"
                                            />
                                            <span className="ml-3 text-white">Ví MoMo</span>
                                        </label>

                                        <label className="flex items-center p-4 border border-[#303030] rounded-lg cursor-pointer hover:border-[#0078F2] transition-colors">
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="bank-transfer"
                                                checked={paymentMethod === 'bank-transfer'}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                className="h-4 w-4 text-[#0078F2] focus:ring-[#0078F2] border-gray-300"
                                            />
                                            <span className="ml-3 text-white">Chuyển khoản ngân hàng</span>
                                        </label>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-1/3">
                        <div className="bg-[#202020] rounded-lg p-6 sticky top-24">
                            <h2 className="text-xl font-semibold text-white mb-6">Đơn hàng của bạn</h2>

                            <div className="space-y-4 mb-6">
                                {cart.map(game => {
                                    const discountedPrice = game.discount > 0
                                        ? Math.round(game.price * (1 - game.discount / 100))
                                        : game.price;

                                    return (
                                        <div key={game.id} className="flex items-center space-x-4">
                                            <img
                                                src={game.coverImage}
                                                alt={game.title}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                            <div className="flex-1">
                                                <h3 className="text-white font-medium">{game.title}</h3>
                                                <p className="text-gray-400">{game.developer}</p>
                                            </div>
                                            <div className="text-right">
                                                {game.discount > 0 && (
                                                    <p className="text-gray-400 line-through text-sm">
                                                        {game.price.toLocaleString('vi-VN')}₫
                                                    </p>
                                                )}
                                                <p className="text-white font-medium">
                                                    {discountedPrice.toLocaleString('vi-VN')}₫
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="border-t border-[#303030] pt-4 space-y-3">
                                <div className="flex justify-between text-gray-400">
                                    <span>Tạm tính</span>
                                    <span>{subtotal.toLocaleString('vi-VN')}₫</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Thuế</span>
                                    <span>0₫</span>
                                </div>
                                <div className="flex justify-between text-white font-bold text-lg">
                                    <span>Tổng cộng</span>
                                    <span>{subtotal.toLocaleString('vi-VN')}₫</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full mt-6 bg-[#0078F2] text-white py-3 rounded-lg font-semibold hover:bg-[#0060c7] transition-colors"
                            >
                                Xác nhận thanh toán
                            </button>

                            <p className="mt-4 text-sm text-gray-400 text-center">
                                Bằng cách xác nhận thanh toán, bạn đồng ý với{' '}
                                <Link to="/terms" className="text-[#0078F2] hover:text-[#0060c7] transition-colors">
                                    điều khoản dịch vụ
                                </Link>{' '}
                                của chúng tôi
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;