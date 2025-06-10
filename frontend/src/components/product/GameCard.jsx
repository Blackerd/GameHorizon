import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const GameCard = ({ product }) => {
  const { addToCart, isInCart } = useCart();
  const inCart = isInCart(product.id);

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
          <button
            onClick={() => addToCart(product)}
            disabled={inCart}
            className={`p-2 rounded-full ${
              inCart
                ? 'bg-green-600 text-white'
                : 'bg-[#0078F2] text-white hover:bg-[#0060c7]'
            }`}
          >
            {inCart ? <Check size={18} /> : <ShoppingCart size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;