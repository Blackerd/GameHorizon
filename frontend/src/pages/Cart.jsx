import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { Trash2 } from 'lucide-react';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  // Đảm bảo cart là mảng, mỗi item có product (object) hoặc các trường name, price, img, quantity
  const total = cart.reduce(
    (sum, item) => sum + ((item.product?.price || item.price || 0) * (item.quantity || 1)),
    0
  );

  // Xử lý xóa từng sản phẩm
  const handleRemove = (cartItemId) => {
    if (window.confirm('Bạn chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?')) {
      removeFromCart(cartItemId);
    }
  };

  // Xử lý xóa toàn bộ giỏ hàng
  const handleClear = () => {
    if (window.confirm('Bạn chắc chắn muốn xóa toàn bộ giỏ hàng?')) {
      clearCart();
    }
  };

  // Xử lý chuyển sang trang thanh toán
  const handleCheckout = () => {
    navigate('/checkout');
  };

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
                <div
                  key={item.id || item.cartItemId}
                  className="flex items-center justify-between border-b border-[#303030] py-4"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={
                        item.product?.img ||
                        item.img ||
                        item.image ||
                        'https://via.placeholder.com/150'
                      }
                      alt={item.product?.name || item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">
                        {item.product?.name || item.name}
                      </h3>
                      <p>
                        {(item.product?.price || item.price || 0).toLocaleString('vi-VN')}₫ (x{item.quantity || 1})
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemove(item.id || item.cartItemId)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={handleClear}
                className="text-red-500 hover:underline"
              >
                Xóa toàn bộ giỏ hàng
              </button>
              <div className="text-xl font-bold">
                Tổng cộng: {total.toLocaleString('vi-VN')}₫
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="block w-full text-center bg-[#0078F2] text-white py-2 rounded hover:bg-[#0060c7]"
            >
              Thanh toán
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;