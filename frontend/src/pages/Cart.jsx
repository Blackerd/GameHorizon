import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { Trash2 } from 'lucide-react';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="bg-[#121212] min-h-screen text-white py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Giỏ hàng</h1>
        {cart.length === 0 ? (
          <div className="text-center">
            <p className="text-xl mb-4">Giỏ hàng của bạn đang trống</p>
            <Link to="/" className="text-[#0078F2] hover:underline">Tiếp tục mua sắm</Link>
          </div>
        ) : (
          <>
            <div className="bg-[#202020] rounded-lg p-4 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b border-[#303030] py-4">
                  <div className="flex items-center space-x-4">
                    <img src={item.image || 'https://via.placeholder.com/150'} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p>{(item.price * item.quantity).toLocaleString('vi-VN')}₫ (x{item.quantity})</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={clearCart}
                className="text-red-500 hover:underline"
              >
                Xóa toàn bộ giỏ hàng
              </button>
              <div className="text-xl font-bold">
                Tổng cộng: {total.toLocaleString('vi-VN')}₫
              </div>
            </div>
            <Link
              to="/checkout"
              className="block text-center bg-[#0078F2] text-white py-2 rounded hover:bg-[#0060c7]"
            >
              Thanh toán
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;