import React, { useState } from 'react';
import GameCard from '../GameCard/GameCard';
import { Game } from '../../types/Game';

interface GameGridProps {
  games: Game[];
  title: string;
}

const GameGrid: React.FC<GameGridProps> = ({ games, title }) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const filterOptions = [
    { value: 'all', label: 'Tất cả' },
    { value: 'action', label: 'Hành động' },
    { value: 'adventure', label: 'Phiêu lưu' },
    { value: 'rpg', label: 'Nhập vai' },
    { value: 'strategy', label: 'Chiến thuật' },
  ];

  const sortOptions = [
    { value: 'featured', label: 'Nổi bật' },
    { value: 'new', label: 'Mới nhất' },
    { value: 'priceAsc', label: 'Giá: Thấp đến cao' },
    { value: 'priceDesc', label: 'Giá: Cao đến thấp' },
  ];

  const filteredGames = games.filter(game => {
    if (filter === 'all') return true;
    return game.genres.includes(filter);
  });

  const sortedGames = [...filteredGames].sort((a, b) => {
    switch (sortBy) {
      case 'new':
        return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
      case 'priceAsc':
        return a.price - b.price;
      case 'priceDesc':
        return b.price - a.price;
      default:
        return 0; // 'featured' uses default order
    }
  });

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h2 className="text-white text-2xl font-bold mb-4 sm:mb-0">{title}</h2>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-[#303030] text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0078F2]"
            >
              {filterOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#303030] text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0078F2]"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedGames.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GameGrid;