import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useOwnedGames } from '../../context/OwnedGamesContext';
import toast from 'react-hot-toast';
import { useCustomer } from '../../context/CustomerContext';
import { useNavigate } from 'react-router-dom';

const GameCard = ({ product }) => {
const { addToCart, isInCart } = useCart();
  const ownedGameIds = useOwnedGames();
  const isOwned = ownedGameIds.includes(product.id);
  const inCart = isInCart(product.id);
  const { customer } = useCustomer();
  const navigate = useNavigate();

const handleAddToCart = () => {
  if (!customer) {
    toast.error('Vui lòng đăng nhập để thêm vào giỏ hàng!', { duration: 2000, position: 'top-center' });
    setTimeout(() => navigate('/login'), 1200);
    return;
  }
  if (isOwned) {
    toast.error('Bạn đã sở hữu game này!');
    return;
  }
  if (inCart) {
    toast('Game đã có trong giỏ hàng!');
    return;
  }
  if (product.price === 0) {
    toast('Game này miễn phí, hãy chơi ngay!');
    return;
  }
  addToCart(product);
  toast.success(
    <span>
      <b>🎉 Đã thêm vào giỏ hàng!</b><br />
      <span style={{ fontWeight: 400 }}>{product.name}</span>
    </span>
  );
};

  return (
    <div className="bg-[#202020] rounded-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/game/${product.id}`} className="block">
        <div className="relative h-48 overflow-hidden">
        <img
          src={product.img}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105 bg-gray-800"
          onError={e => {
            e.target.onerror = null;
            e.target.src = '/default-game.jpg'; // Đặt ảnh mặc định trong public folder
          }}
        />
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/game/${product.id}`} className="block">
          <h3 className="text-white font-semibold text-lg mb-1 hover:text-[#0078F2]">
            {product.name}
          </h3>
        </Link>

        <div className="flex justify-between items-center">
          <span className="text-white font-semibold">
            {product.price.toLocaleString('vi-VN')}₫
          </span>
          <div className="relative">
        <button
  onClick={handleAddToCart}
  disabled={isOwned || inCart || product.price === 0}
  className={`mt-3 px-4 py-2 rounded font-semibold transition flex items-center gap-2 ${
    isOwned
      ? 'bg-gray-500 text-white cursor-not-allowed'
      : inCart
        ? 'bg-green-600 text-white cursor-not-allowed'
        : product.price === 0
          ? 'bg-[#00b4ff] text-white hover:bg-[#0099cc]'
          : 'bg-[#0078F2] text-white hover:bg-[#0060c7]'
  }`}
  title={
    isOwned
      ? 'Bạn đã sở hữu game này'
      : inCart
        ? 'Đã có trong giỏ hàng'
        : product.price === 0
          ? 'Chơi miễn phí'
          : 'Thêm vào giỏ hàng'
  }
>
  {isOwned ? (
    <>
      <Check size={18} />
      Đã sở hữu
    </>
  ) : inCart ? (
    <>
      <Check size={18} />
      Đã có trong giỏ
    </>
  ) : product.price === 0 ? (
    <>
      <Play size={18} />
      Chơi miễn phí
    </>
  ) : (
    <>
      <ShoppingCart size={18} />
    </>
  )}
</button>

    </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;