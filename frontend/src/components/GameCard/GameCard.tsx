import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Game } from '../../types/Game';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const { addToCart, isInCart } = useCart();
  const inCart = isInCart(game.id);

  return (
    <div className="bg-[#202020] rounded-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/game/${game.id}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={game.coverImage} 
            alt={game.title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          {game.discount > 0 && (
            <div className="absolute top-2 right-2 bg-[#0078F2] text-white px-2 py-1 rounded font-semibold">
              -{game.discount}%
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/game/${game.id}`} className="block">
          <h3 className="text-white font-semibold text-lg mb-1 hover:text-[#0078F2] transition-colors">
            {game.title}
          </h3>
          <p className="text-gray-400 text-sm mb-2">{game.developer}</p>
        </Link>
        
        <div className="flex justify-between items-center">
          <div>
            {game.discount > 0 ? (
              <div className="flex items-center space-x-2">
                <span className="text-gray-400 line-through text-sm">
                  {game.price.toLocaleString('vi-VN')}₫
                </span>
                <span className="text-white font-semibold">
                  {Math.round(game.price * (1 - game.discount / 100)).toLocaleString('vi-VN')}₫
                </span>
              </div>
            ) : (
              <span className="text-white font-semibold">
                {game.price > 0 ? `${game.price.toLocaleString('vi-VN')}₫` : 'Miễn phí'}
              </span>
            )}
          </div>
          
          <button
            onClick={() => addToCart(game)}
            disabled={inCart}
            className={`p-2 rounded-full ${
              inCart 
                ? 'bg-green-600 text-white' 
                : 'bg-[#0078F2] text-white hover:bg-[#0060c7] transition-colors'
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