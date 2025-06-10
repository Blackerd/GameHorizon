import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import CartItem from './CartItem';
import CartSummary from './CartSummary';

const CartPage = () => {
  const { cart, clearCart } = useCart();

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
                  {cart.map((game) => (
                    <CartItem key={game.id} game={game} />
                  ))}
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
              <CartSummary cart={cart} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;