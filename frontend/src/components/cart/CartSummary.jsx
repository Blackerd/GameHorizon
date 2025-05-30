import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const CartSummary = ({ cart }) => {
  const { user } = useAuth();

  const subtotal = cart.reduce((total, product) => total + product.price, 0);

  return (
    <div className="bg-[#202020] rounded-lg p-6 sticky top-24">
      <h2 className="text-xl font-bold mb-6">Tóm tắt đơn hàng</h2>
      <div className="space-y-4 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-400">Tạm tính</span>
          <span>{subtotal.toLocaleString('vi-VN')}₫</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Thuế</span>
          <span>0₫</span>
        </div>
        <div className="border-t border-[#303030] pt-4 flex justify-between font-bold">
          <span>Tổng cộng</span>
          <span>{subtotal.toLocaleString('vi-VN')}₫</span>
        </div>
      </div>
      <Link
        to={user ? "/checkout" : "/login"}
        className="w-full bg-[#0078F2] text-white py-3 rounded font-semibold hover:bg-[#0060c7] text-center block"
      >
        Tiến hành thanh toán
      </Link>
      <div className="mt-6">
        <h3 className="font-semibold mb-2">Phương thức thanh toán</h3>
        <div className="flex flex-wrap gap-2">
          <div className="bg-[#303030] px-3 py-1 rounded text-sm">Visa</div>
          <div className="bg-[#303030] px-3 py-1 rounded text-sm">MasterCard</div>
          <div className="bg-[#303030] px-3 py-1 rounded text-sm">PayPal</div>
          <div className="bg-[#303030] px-3 py-1 rounded text-sm">Momo</div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;