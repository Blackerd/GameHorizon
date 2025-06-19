import React, { useEffect, useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { useCustomer } from '../../context/CustomerContext';

const getWishlist = (userId = 'guest') => {
  const key = `wishlist_${userId}`;
  return JSON.parse(localStorage.getItem(key) || '[]');
};

const WishlistGames = ({ userId }) => {
  const { customer } = useCustomer();
  const userIdFromProps = userId || customer?.id || 'guest';
  const { data: products = [] } = useProducts();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    setWishlist(getWishlist(userIdFromProps));
  }, [userIdFromProps]);

  const handleRemove = (gameId) => {
    const newWishlist = wishlist.filter(id => id !== gameId);
    setWishlist(newWishlist);
    localStorage.setItem(`wishlist_${userIdFromProps}`, JSON.stringify(newWishlist));
  };

  const wishlistGames = products.filter(p => wishlist.includes(p.id));

  return (
    <>
      {wishlistGames.length === 0 ? (
        <div className="text-gray-400">Chưa có game nào trong wishlist.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlistGames.map(game => (
            <div key={game.id} className="bg-[#23283a] rounded-xl p-4 flex flex-col items-center relative group">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-lg font-bold bg-[#181c24] rounded-full w-7 h-7 flex items-center justify-center opacity-80 group-hover:opacity-100 transition"
                title="Xóa khỏi wishlist"
                onClick={() => handleRemove(game.id)}
              >
                ×
              </button>
              <img src={game.img} alt={game.name} className="w-32 h-32 object-cover rounded mb-3" />
              <div className="text-white font-semibold">{game.name}</div>
              <div className="text-[#00ffae]">{game.price === 0 ? 'Free' : game.price.toLocaleString('vi-VN') + '₫'}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default WishlistGames;