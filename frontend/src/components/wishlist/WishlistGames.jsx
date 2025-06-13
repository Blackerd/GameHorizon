import React, { useEffect, useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { useCustomer } from '../../context/CustomerContext';

const getWishlist = (userId = 'guest') => {
  const key = `wishlist_${userId}`;
  return JSON.parse(localStorage.getItem(key) || '[]');
};

const WishlistGames = () => {
  const { customer } = useCustomer();
  const userId = customer?.id || 'guest';
  const { data: products = [] } = useProducts();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    setWishlist(getWishlist(userId));
  }, [userId]);

  const wishlistGames = products.filter(p => wishlist.includes(p.id));

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-[#00b4ff]">Danh sách Wishlist</h2>
      {wishlistGames.length === 0 ? (
        <div className="text-gray-400">Chưa có game nào trong wishlist.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlistGames.map(game => (
            <div key={game.id} className="bg-[#23283a] rounded-xl p-4 flex flex-col items-center">
              <img src={game.img} alt={game.name} className="w-32 h-32 object-cover rounded mb-3" />
              <div className="text-white font-semibold">{game.name}</div>
              <div className="text-[#00ffae]">{game.price === 0 ? 'Free' : game.price.toLocaleString('vi-VN') + '₫'}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistGames;