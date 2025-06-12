import React, { useEffect, useState } from 'react';
import { getCategories } from '../api/categoryApi';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories()
      .then(res => setCategories(res.data || res))
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-white py-4">Đang tải danh mục...</div>;
  if (!categories.length) return <div className="text-gray-400 py-4">Không có danh mục nào.</div>;

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold text-white mb-6">Danh mục</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map(cat => (
          <div
            key={cat.id}
            className="bg-[#23283a] rounded-lg overflow-hidden shadow hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="p-6 flex flex-col h-full">
              <h3 className="text-white font-semibold text-lg mb-2">{cat.name}</h3>
              <div className="text-gray-300 text-sm flex-1">{cat.description || 'Không có mô tả.'}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryList;