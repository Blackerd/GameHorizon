import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useOwnedGames } from '../../context/OwnedGamesContext';
import toast from 'react-hot-toast';

const GameCard = ({ product }) => {
  const { addToCart, isInCart } = useCart();
  const inCart = isInCart(product.id);
  const [showMsg, setShowMsg] = useState(false);
  const ownedGameIds = useOwnedGames();

const handleAddToCart = () => {
  if (!isOwned && !inCart) {
    addToCart(product);
    toast.success(
      <span>
        <b>🎉 Đã thêm vào giỏ hàng!</b><br />
        <span style={{ fontWeight: 400 }}>{product.name}</span>
      </span>
    );
  }
};
  const isOwned = ownedGameIds.includes(product.id);

  return (
    <div className="bg-[#202020] rounded-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/game/${product.id}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
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
        disabled={isOwned || inCart}
        className={`mt-3 px-4 py-2 rounded font-semibold transition flex items-center gap-2 ${
          isOwned
            ? 'bg-gray-500 text-white cursor-not-allowed'
            : inCart
              ? 'bg-green-600 text-white cursor-not-allowed'
              : 'bg-[#0078F2] text-white hover:bg-[#0060c7]'
        }`}
        title={
          isOwned
            ? 'Bạn đã sở hữu game này'
            : inCart
              ? 'Đã có trong giỏ hàng'
              : 'Thêm vào giỏ hàng'
        }
      >
        {isOwned ? (
          <>
            <Play size={18} />
            Đã sở hữu
          </>
        ) : inCart ? (
          <>
            <Check size={18} />
            Đã có trong giỏ
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