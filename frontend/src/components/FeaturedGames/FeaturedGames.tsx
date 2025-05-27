import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Game } from '../../types/Game';
import { useCart } from '../../context/CartContext';

interface FeaturedGamesProps {
  games: Game[];
}

const FeaturedGames: React.FC<FeaturedGamesProps> = ({ games }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addToCart, isInCart } = useCart();
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % games.length);
  };
  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + games.length) % games.length);
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [games.length]);
  
  if (!games.length) return null;
  
  const currentGame = games[currentIndex];
  const inCart = isInCart(currentGame.id);
  
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={currentGame.bannerImage || currentGame.coverImage}
          alt={currentGame.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90" />
      </div>
      
      <div className="container mx-auto px-4 py-12 sm:py-24 relative z-10 min-h-[500px] flex items-center">
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-70 transition-colors"
          aria-label="Previous game"
        >
          <ChevronLeft size={24} />
        </button>
        
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">{currentGame.title}</h1>
          <p className="text-gray-300 mb-6 text-sm sm:text-base">{currentGame.description}</p>
          
          <div className="flex flex-wrap gap-3 mb-6">
            {currentGame.genres.map((genre, index) => (
              <span key={index} className="bg-[#303030] text-white px-3 py-1 rounded-full text-sm">
                {genre}
              </span>
            ))}
          </div>
          
          <div className="flex items-center space-x-4 mb-6">
            {currentGame.discount > 0 ? (
              <div className="flex items-center space-x-3">
                <span className="bg-[#0078F2] text-white px-2 py-1 rounded font-semibold">
                  -{currentGame.discount}%
                </span>
                <span className="text-gray-400 line-through">
                  {currentGame.price.toLocaleString('vi-VN')}₫
                </span>
                <span className="text-white font-bold text-2xl">
                  {Math.round(currentGame.price * (1 - currentGame.discount / 100)).toLocaleString('vi-VN')}₫
                </span>
              </div>
            ) : (
              <span className="text-white font-bold text-2xl">
                {currentGame.price > 0 ? `${currentGame.price.toLocaleString('vi-VN')}₫` : 'Miễn phí'}
              </span>
            )}
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Link
              to={`/game/${currentGame.id}`}
              className="bg-white text-[#0078F2] px-6 py-3 rounded font-semibold hover:bg-gray-200 transition-colors"
            >
              Xem chi tiết
            </Link>
            <button
              onClick={() => addToCart(currentGame)}
              disabled={inCart}
              className={`px-6 py-3 rounded font-semibold ${
                inCart
                  ? 'bg-green-600 text-white'
                  : 'bg-[#0078F2] text-white hover:bg-[#0060c7] transition-colors'
              }`}
            >
              {inCart ? 'Đã thêm vào giỏ' : 'Mua ngay'}
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {games.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? 'bg-[#0078F2]' : 'bg-white bg-opacity-30'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-70 transition-colors"
          aria-label="Next game"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
};

export default FeaturedGames;