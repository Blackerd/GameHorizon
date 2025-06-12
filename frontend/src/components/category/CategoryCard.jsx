import React from 'react';

const CategoryCard = ({ category }) => (
  <div className="flex flex-col items-center bg-[#23283a] rounded-2xl overflow-hidden shadow hover:-translate-y-1 transition-transform duration-300 w-full max-w-xs mx-auto">
    {category.img && (
      <img
        src={category.img}
        alt={category.name}
        className="w-full h-48 object-cover bg-[#181c24]"
      />
    )}
    <div className="flex flex-col items-center px-4 py-5 w-full">
      <h3 className="text-white font-semibold text-lg mb-2 text-center truncate w-full">{category.name}</h3>
      {category.description && (
        <div className="text-gray-300 text-sm text-center line-clamp-3 w-full">{category.description}</div>
      )}
    </div>
  </div>
);

export default CategoryCard;