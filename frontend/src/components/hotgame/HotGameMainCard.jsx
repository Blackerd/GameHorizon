import React from 'react';

const HotGameMainCard = ({ game }) => (
  <div className="flex flex-col md:flex-row bg-[#23283a] rounded-2xl overflow-hidden shadow-lg">
    <div className="flex-1 p-8 flex flex-col justify-center">
      <h1 className="text-4xl font-bold text-white mb-4">{game.title}</h1>
      <div className="uppercase text-xs text-[#00b4ff] font-bold mb-2">{game.season}</div>
      <div className="text-white mb-4">{game.description}</div>
      <div className="text-[#00ffae] mb-4">{game.price}</div>
      <div className="flex gap-4">
        <button className="bg-white text-black px-6 py-2 rounded-lg font-semibold">Play For Free</button>
        <button className="bg-[#23283a] text-white px-6 py-2 rounded-lg border border-white font-semibold">Add to Wishlist</button>
      </div>
    </div>
    <img src={game.image} alt={game.title} className="w-full md:w-[600px] h-96 object-cover" />
  </div>
);

export default HotGameMainCard;