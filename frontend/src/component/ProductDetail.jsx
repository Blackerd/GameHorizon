import React from 'react';
import { useParams } from 'react-router-dom';
import { FiX } from "react-icons/fi";

const ProductDetail = () => {
  const { id } = useParams(); // Lấy ID từ URL params
  const products = [
    { id: 1, name: "Product 1", price: "99.99", image: "https://via.placeholder.com/400x400.png?text=Product+1" },
    { id: 2, name: "Product 2", price: "149.99", image: "https://via.placeholder.com/400x400.png?text=Product+2" },
    { id: 3, name: "Product 3", price: "199.99", image: "https://via.placeholder.com/400x400.png?text=Product+3" },
    { id: 4, name: "Product 4", price: "249.99", image: "https://via.placeholder.com/400x400.png?text=Product+4" }
  ];

  const selectedProduct = products.find((product) => product.id === parseInt(id));

  if (!selectedProduct) return <p>Product not found!</p>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-end">
          <button onClick={() => window.history.back()} className="p-2 hover:bg-gray-100 rounded-full">
            <FiX className="text-2xl" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-[400px] object-cover rounded-lg" />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">{selectedProduct.name}</h2>
            <p className="text-2xl text-blue-600 font-semibold mb-6">${selectedProduct.price}</p>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">Description</h3>
                <p className="text-gray-600">
                  Experience the ultimate gaming adventure with {selectedProduct.name}.
                  Immerse yourself in stunning graphics, engaging gameplay, and an unforgettable story.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Features</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>High-quality graphics and immersive gameplay</li>
                  <li>Engaging storylines and character development</li>
                  <li>Regular updates and new features</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
