import React, { useState, useMemo } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../api/categoryApi';
import HotGamesHeader from '../components/hotgame/HotGamesHeader';

const HotGames = () => {
  const { data: products = [] } = useProducts();
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await getCategories();
      return res.data || res;
    }
  });

  // Tab là tên danh mục (category)
  const [activeTab, setActiveTab] = useState('Discover');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(0);

  // Danh sách danh mục: Discover, Browse, News => tên các category
  const tabList = categories.length
    ? categories.map(cat => cat.name)
    : ['Discover', 'Browse', 'News'];

  // Lọc sản phẩm theo tab (category) và search
  const filteredProducts = useMemo(() => {
    let list = products;
    if (activeTab && activeTab !== 'Discover') {
      list = list.filter(p => p.categoryName === activeTab);
    }
    if (search) {
      list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }
    return list;
  }, [products, activeTab, search]);

  const mainProduct = filteredProducts[selected] || filteredProducts[0];

  return (
    <div className="bg-[#121212] min-h-screen p-8">
      <HotGamesHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSearch={setSearch}
        tabList={tabList}
      />
      <div className="flex flex-col md:flex-row gap-8 mt-8">
        {/* Main product card */}
        <div className="flex-1">
          {mainProduct && (
            <div className="flex flex-col md:flex-row bg-[#23283a] rounded-2xl overflow-hidden shadow-lg">
              <div className="flex-1 p-8 flex flex-col justify-center">
                <h1 className="text-4xl font-bold text-white mb-4">{mainProduct.name}</h1>
                <div className="uppercase text-xs text-[#00b4ff] font-bold mb-2">{mainProduct.categoryName}</div>
                <div className="text-white mb-4 line-clamp-4">{mainProduct.detail}</div>
                <div className="text-[#00ffae] mb-4">{mainProduct.price === 0 ? 'Free' : mainProduct.price.toLocaleString('vi-VN') + '₫'}</div>
                <div className="flex gap-4">
                  <button className="bg-white text-black px-6 py-2 rounded-lg font-semibold">Play For Free</button>
                  <button className="bg-[#23283a] text-white px-6 py-2 rounded-lg border border-white font-semibold">Add to Wishlist</button>
                </div>
              </div>
              <img src={mainProduct.img} alt={mainProduct.name} className="w-full md:w-[600px] h-96 object-cover" />
            </div>
          )}
        </div>
        {/* Sidebar product list */}
        <div className="w-full md:w-64 flex flex-col gap-2">
          {filteredProducts.map((product, idx) => (
            <button
              key={product.id}
              onClick={() => setSelected(idx)}
              className={`flex items-center gap-3 px-2 py-2 rounded-lg transition ${
                selected === idx ? 'bg-[#23283a]' : ''
              }`}
            >
              <img src={product.img} alt={product.name} className="w-12 h-12 object-cover rounded" />
              <span className="text-white text-sm">{product.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotGames;