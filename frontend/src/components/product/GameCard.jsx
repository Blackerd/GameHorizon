import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const GameCard = ({ product }) => {
  const { addToCart, isInCart } = useCart();
  const inCart = isInCart(product.id);
  const [showMsg, setShowMsg] = useState(false);

  const handleAddToCart = () => {
    if (!inCart) {
      addToCart(product);
      setShowMsg(true);
      setTimeout(() => setShowMsg(false), 1200);
    }
  };

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
              disabled={inCart}
              className={`p-2 rounded-full transition ${
                inCart
                  ? 'bg-green-600 text-white cursor-not-allowed'
                  : 'bg-[#0078F2] text-white hover:bg-[#0060c7]'
              }`}
              title={inCart ? 'Đã có trong giỏ hàng' : 'Thêm vào giỏ hàng'}
            >
              {inCart ? <Check size={18} /> : <ShoppingCart size={18} />}
            </button>
            {showMsg && (
              <span className="absolute top-10 left-1/2 -translate-x-1/2 bg-black text-xs text-white px-2 py-1 rounded shadow">
                Đã thêm vào giỏ hàng!
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;