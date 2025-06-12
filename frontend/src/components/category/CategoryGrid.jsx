import React, { useEffect, useState } from 'react';
import { getCategories } from '../../api/categoryApi';
import CategoryCard from './CategoryCard';

const CategoryGrid = () => {
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
      <h2 className="text-2xl font-bold text-white mb-6">Danh mục nổi bật</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map(cat => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;