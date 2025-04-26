import React from "react";

const Category = () => {
  const categories = [
    { name: "Clothing", image: "https://via.placeholder.com/200x200.png?text=Clothing" },
    { name: "Electronics", image: "https://via.placeholder.com/200x200.png?text=Electronics" },
    { name: "Furniture", image: "https://via.placeholder.com/200x200.png?text=Furniture" },
    { name: "Books", image: "https://via.placeholder.com/200x200.png?text=Books" },
    { name: "Sports", image: "https://via.placeholder.com/200x200.png?text=Sports" },
    { name: "Toys", image: "https://via.placeholder.com/200x200.png?text=Toys" }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-3 text-center text-gray-800">Shop by Category</h2>
        <p className="text-center text-gray-600 mb-12">Discover our wide range of products</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="aspect-w-1 aspect-h-1">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition duration-300 group-hover:scale-110" 
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent flex flex-col items-center justify-end p-4 transform transition-all duration-300 group-hover:from-black/80">
                <h3 className="text-white text-xl font-bold mb-1">{category.name}</h3>
                <p className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">Explore Collection →</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
