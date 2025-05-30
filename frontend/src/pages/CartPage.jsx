import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ArrowLeft, ShoppingCart } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../hooks/useAuth';

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();

  const subtotal = cart.reduce((total, game) => {
    const discountedPrice = game.discount > 0
      ? Math.round(game.price * (1 - game.discount / 100))
      : game.price;
    return total + discountedPrice;
  }, 0);

  return (
    <div className="bg-[#121212] text-white min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Giỏ hàng</h1>
          <Link
            to="/"
            className="flex items-center text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Tiếp tục mua sắm
          </Link>
        </div>

        {cart.length === 0 ? (
          <div className="bg-[#202020] rounded-lg p-8 text-center">
            <ShoppingCart size={48} className="mx-auto mb-4 text-gray-400" />
            <h2 className="text-2xl font-semibold mb-2">Giỏ hàng trống</h2>
            <p className="text-gray-400 mb-6">Hãy thêm một số trò chơi vào giỏ hàng của bạn!</p>
            <Link
              to="/"
              className="bg-[#0078F2] text-white px-6 py-3 rounded font-semibold hover:bg-[#0060c7] inline-block transition-colors"
            >
              Khám phá trò chơi
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="bg-[#202020] rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-[#303030]">
                  <h2 className="font-semibold">Sản phẩm ({cart.length})</h2>
                </div>

                <ul>
                  {cart.map((game) => {
                    const discountedPrice = game.discount > 0
                      ? Math.round(game.price * (1 - game.discount / 100))
                      : game.price;
                    return (
                      <li key={game.id} className="px-6 py-4 border-b border-[#303030] flex items-center">
                        <img
                          src={game.coverImage}
                          alt={game.title}
                          className="w-20 h-20 object-cover rounded"
                        />

                        <div className="ml-4 flex-1">
                          <Link
                            to={`/game/${game.id}`}
                            className="font-medium hover:text-[#0078F2] transition-colors"
                          >
                            {game.title}
                          </Link>
                          <p className="text-gray-400 text-sm">{game.developer}</p>
                        </div>

                        <div className="text-right mr-4">
                          {game.discount > 0 ? (
                            <div>
                              <span className="text-gray-400 line-through text-sm">
                                {game.price.toLocaleString('vi-VN')}₫
                              </span>
                              <p className="font-semibold">
                                {discountedPrice.toLocaleString('vi-VN')}₫
                              </p>
                            </div>
                          ) : (
                            <p className="font-semibold">
                              {game.price > 0 ? `${game.price.toLocaleString('vi-VN')}₫` : 'Miễn phí'}
                            </p>
                          )}
                        </div>

                        <button
                          onClick={() => removeFromCart(game.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-2"
                          aria-label="Remove from cart"
                        >
                          <Trash2 size={20} />
                        </button>
                      </li>
                    );
                  })}
                </ul>

                <div className="px-6 py-4 flex justify-end">
                  <button
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-400 transition-colors"
                  >
                    Xóa tất cả
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:w-1/3">
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;