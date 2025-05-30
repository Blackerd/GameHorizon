import React, { useEffect, useState } from 'react';
import ProductForm from '../components/product/ProductForm';
import axios from 'axios';

const Admin = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/api/products');
      const data = res.data;
      setProducts(Array.isArray(data) ? data : [data]);
    } catch (err) {
      console.error('Lỗi lấy sản phẩm:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductCreated = (newProduct) => {
    if (newProduct) {
      setProducts((prev) => [...prev, newProduct]);
    }
  };

  return (
    <div className="bg-[#121212] min-h-screen py-10 px-4">
      <h1 className="text-white text-3xl mb-6 text-center">Trang Admin</h1>
      <ProductForm onProductCreated={handleProductCreated} />
      <div className="mt-10">
        <h2 className="text-white text-xl mb-4">Danh sách sản phẩm:</h2>
        <ul className="space-y-4">
          {Array.isArray(products) && products.length > 0 ? (
            products.map((p) => (
              <li key={p.id} className="bg-white p-4 rounded shadow">
                <p><strong>{p.name}</strong> - {p.price}đ</p>
                <img src={p.img} alt={p.name} className="w-32 h-32 object-cover" />
                <p>{p.detail}</p>
              </li>
            ))
          ) : (
            <p className="text-white">Không có sản phẩm</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Admin;
