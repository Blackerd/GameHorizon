import React from 'react';
import FeaturedGames from '../components/FeaturedGames/FeaturedGames';
import GameGrid from '../components/GameGrid/GameGrid';
import { games } from '../data/games';

const HomePage: React.FC = () => {
  // Get featured games (those marked as featured or with high discount)
  const featuredGames = games.filter(game => game.featured || game.discount >= 25);
  
  // Get free games
  const freeGames = games.filter(game => game.price === 0);
  
  // Get games on sale
  const gamesOnSale = games.filter(game => game.discount > 0);
  
  // Get new releases (using the most recent release dates)
  const newReleases = [...games]
    .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
    .slice(0, 8);

  return (
    <>
      <FeaturedGames games={featuredGames} />

        <div className="bg-[#121212]">
        {freeGames.length > 0 && (
          <GameGrid games={freeGames} title="Trò chơi miễn phí" />
        )}
        
        <GameGrid games={gamesOnSale} title="Đang giảm giá" />
        
        <GameGrid games={newReleases} title="Phát hành mới" />
        
        <GameGrid games={games} title="Tất cả trò chơi" />
      </div>
    </>
  );
};

export default HomePage;