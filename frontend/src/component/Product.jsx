import React from "react";
import { Link } from "react-router-dom";

const Product = () => {
  const products = [
    { id: 1, name: "Product 1", price: "99.99", image: "https://via.placeholder.com/400x400.png?text=Product+1" },
    { id: 2, name: "Product 2", price: "149.99", image: "https://via.placeholder.com/400x400.png?text=Product+2" },
    { id: 3, name: "Product 3", price: "199.99", image: "https://via.placeholder.com/400x400.png?text=Product+3" },
    { id: 4, name: "Product 4", price: "249.99", image: "https://via.placeholder.com/400x400.png?text=Product+4" }
  ];

  return (
    <section className="py-12 bg-white px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
              </Link>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">${product.price}</p>
                <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Product;
