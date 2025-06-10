import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

const CartItem = ({ product }) => {
  const { removeFromCart } = useCart();

  return (
    <li className="px-6 py-4 border-b border-[#303030] flex items-center">
      <img
        src={product.img}
        alt={product.name}
        className="w-20 h-20 object-cover rounded"
      />
      <div className="ml-4 flex-1">
        <Link
          to={`/game/${product.id}`}
          className="font-medium hover:text-[#0078F2] transition-colors"
        >
          {product.name}
        </Link>
      </div>
      <div className="text-right mr-4">
        <p className="font-semibold">{product.price.toLocaleString('vi-VN')}₫</p>
      </div>
      <button
        onClick={() => removeFromCart(product.id)}
        className="text-gray-400 hover:text-red-500 transition-colors p-2"
        aria-label="Remove from cart"
      >
        <Trash2 size={20} />
      </button>
    </li>
  );
};

export default CartItem;