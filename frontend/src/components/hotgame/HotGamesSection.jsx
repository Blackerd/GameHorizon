import React, { useState, useMemo, useEffect } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../../api/categoryApi';
import { useCustomer } from '../../context/CustomerContext';
import { FaSearch } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';


const getWishlist = (userId = 'guest') => {
  const key = `wishlist_${userId}`;
  return JSON.parse(localStorage.getItem(key) || '[]');
};

const setWishlist = (wishlist, userId = 'guest') => {
  const key = `wishlist_${userId}`;
  localStorage.setItem(key, JSON.stringify(wishlist));
};

const HotGamesSection = () => {
  const { customer } = useCustomer();
  const userId = customer?.id || 'guest';
  const { data: products = [] } = useProducts();
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await getCategories();
      return res.data || res;
    }
  });
  const [activeTab, setActiveTab] = useState('Action');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(0);
  const [wishlist, setWishlistState] = useState(getWishlist(userId));

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

  const navigate = useNavigate();

  useEffect(() => {
    setWishlistState(getWishlist(userId));
  }, [userId]);

  useEffect(() => {
    if (filteredProducts.length <= 1) return;
    const interval = setInterval(() => {
      setSelected(prev => (prev + 1) % filteredProducts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [filteredProducts.length]);

  const tabList = categories.length
    ? categories.map(cat => cat.name)
    : ['Discover', 'Browse', 'News'];


  const mainProduct = filteredProducts[selected] || filteredProducts[0];

  const handleAddWishlist = (productId) => {
    if (!customer) {
      toast.error('Vui lòng đăng nhập để thêm vào wishlist!', { duration: 2000, position: 'top-center' });
      setTimeout(() => navigate('/login'), 1200);
      return;
    }
    if (!wishlist.includes(productId)) {
      const newWishlist = [...wishlist, productId];
      setWishlist(newWishlist, userId);
      setWishlistState(newWishlist);
    }
  };

  const handleRemoveWishlist = (productId) => {
    const newWishlist = wishlist.filter(id => id !== productId);
    setWishlist(newWishlist, userId);
    setWishlistState(newWishlist);
  };

  const isWishlisted = mainProduct && wishlist.includes(mainProduct.id);

  return (
    <div className="bg-[#121212] min-h-screen">
      {/* Header with Search and Navigation */}
      <div className="flex items-center justify-between p-4 mb-2">
        <div className="relative w-60">
          <input
            type="text"
            placeholder="Search store"
            className="bg-[#2a2a2a] text-white w-full py-2 pl-10 pr-4 rounded-full focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
        
        <div className="flex space-x-6">
            {tabList.map((tab) => (
        <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-lg ${activeTab === tab ? 'text-white font-medium' : 'text-gray-400'}`}
        >
            {tab}
        </button>
        ))}
        </div>
        
        <div className="w-60">
          {/* Placeholder to balance the layout */}
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex px-2 mt-4">
        {/* Featured Game Banner */}
        <div className="flex-1 relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1a1c2e] to-[#23283a]">
          {mainProduct && (
            <div className="relative">
              <div className="absolute top-0 left-0 z-10 p-8 text-white h-full flex flex-col justify-between w-full lg:w-1/2">
                {mainProduct.categoryName && (
                  <div className="uppercase text-xs font-bold mb-2 tracking-wider">
                    NEW SEASON
                  </div>
                )}
                
                <div className="flex-1 flex flex-col justify-center">
                  <h1 className="text-5xl font-bold text-white mb-6">
                    {mainProduct.name}
                  </h1>
                  
                  <p className="mb-6 text-white/80">
                    Playful Season has arrived! Participate in Playful
                    Hearts Day's themed events to obtain generous
                    rewards.
                  </p>
                  
                  <div className="text-white mb-6">
                    {mainProduct.price === 0 ? 'Free' : mainProduct.price.toLocaleString('vi-VN') + '₫'}
                  </div>
                  
                  <div className="flex gap-4">
                    <button className="bg-white hover:bg-gray-200 text-black px-8 py-3 rounded-lg font-semibold transition">
                      Play For Free
                    </button>
                    
                    <button
                      className="flex items-center gap-2 border-white border px-4 py-3 rounded-lg text-white hover:bg-white/10 transition"
                      onClick={() => isWishlisted ? handleRemoveWishlist(mainProduct.id) : handleAddWishlist(mainProduct.id)}
                    >
                      {isWishlisted ? (
                        <span className="text-yellow-400">★ Remove from Wishlist</span>
                      ) : (
                        <span>+ Add to Wishlist</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Large feature image that covers the right side */}
          <img 
            src={mainProduct.img} 
            alt={mainProduct.name} 
            loading="lazy"
            className="w-full object-cover object-center h-[450px] bg-gray-800"
            onError={e => {
              e.target.onerror = null;
              e.target.src = '/default-game.jpg'; // Ảnh mặc định nếu lỗi
            }}
          />
            </div>
          )}
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-70 text-white rounded-full p-2 z-20"
            onClick={() => setSelected(selected === 0 ? filteredProducts.length - 1 : selected - 1)}
            aria-label="Trước"
            style={{display: filteredProducts.length > 1 ? 'block' : 'none'}}
          >
            <ChevronLeft size={28} />
          </button>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-70 text-white rounded-full p-2 z-20"
            onClick={() => setSelected((selected + 1) % filteredProducts.length)}
            aria-label="Sau"
            style={{display: filteredProducts.length > 1 ? 'block' : 'none'}}
          >
            <ChevronRight size={28} />
          </button>
        </div>
        
{/* Game List Sidebar */}
<div className="w-72 ml-4 space-y-2">
  {filteredProducts.map((product, idx) => (
    <button
      key={product.id}
      onClick={() => setSelected(idx)}
      className={`flex items-center gap-3 p-2 rounded-lg transition w-full text-left ${
        selected === idx ? 'bg-[#23283a]' : 'hover:bg-[#1a1c2e]'
      }`}
    >
      <img 
        src={product.img} 
        alt={product.name} 
        loading="lazy"
        className="w-16 h-16 object-cover object-center rounded bg-gray-800"
        onError={e => {
          e.target.onerror = null;
          e.target.src = '/default-game.jpg';
        }}
      />
      <div className="flex-1">
        <div className="text-white text-sm font-medium line-clamp-2">
          {product.name}
        </div>
      </div>
      {wishlist.includes(product.id) && (
        <span className="text-yellow-400">★</span>
      )}
    </button>
  ))}
</div>

      </div>
    </div>
  );
};

export default HotGamesSection;