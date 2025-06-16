import React, { useState } from 'react';
import GameCard from './GameCard';

const GameGrid = ({ products, title }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h2 className="text-white text-2xl font-bold mb-4 sm:mb-0">{title}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <GameCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GameGrid;