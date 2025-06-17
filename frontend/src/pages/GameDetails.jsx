import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Play, Share2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useProduct } from '../hooks/useProducts';
import Loading from '../components/common/Loading';
import GameCard from '../components/product/GameCard';
import { toast } from 'react-toastify';
import { useCustomer } from '../context/CustomerContext';

const getWishlist = (userId = 'guest') => {
  const key = `wishlist_${userId}`;
  return JSON.parse(localStorage.getItem(key) || '[]');
};

const setWishlist = (wishlist, userId = 'guest') => {
  const key = `wishlist_${userId}`;
  localStorage.setItem(key, JSON.stringify(wishlist));
};

const GameDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();
  const { data: product, isLoading, isError } = useProduct(id);
  const { customer } = useCustomer();
  const userId = customer?.id || 'guest';

  const [wishlist, setWishlistState] = useState(getWishlist(userId));

  useEffect(() => {
    setWishlistState(getWishlist(userId));
  }, [userId]);

  if (isLoading) return <Loading />;
  if (isError || !product) return <div>Không tìm thấy sản phẩm</div>;

  const achievements = product.achievements || [];
  const dlcs = product.dlcs || [];
  const sysReq = product.systemRequirements || {};

  // Chỉ dùng ảnh product cho media
  const mediaList = [{ type: 'image', url: product.img }];
  const currentMedia = mediaList[0];

  const handleAddToCart = () => {
    addToCart(product);
    toast.success('Đã thêm vào giỏ hàng!');
  };

  const isWishlisted = wishlist.includes(product.id);

  const handleAddWishlist = (productId) => {
    if (!wishlist.includes(productId)) {
      const newWishlist = [...wishlist, productId];
      setWishlist(newWishlist, userId);
      setWishlistState(newWishlist);
      toast.success('Đã thêm vào Wishlist!');
    }
  };

  const handleRemoveWishlist = (productId) => {
    const newWishlist = wishlist.filter(id => id !== productId);
    setWishlist(newWishlist, userId);
    setWishlistState(newWishlist);
    toast.info('Đã xóa khỏi Wishlist!');
  };

  return (
    <div className="bg-gradient-to-br from-[#181c24] to-[#23283a] min-h-screen text-white pt-24 pb-16">
      <div className="container mx-auto flex flex-col lg:flex-row gap-10">
        {/* Cột trái: Media, mô tả, achievements, DLC */}
        <div className="lg:w-7/12 w-full">
          {/* Media lớn */}
          <div className="mb-6 rounded-2xl overflow-hidden shadow-2xl border border-[#232323] bg-[#181c24]">
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-[420px] object-cover object-center transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
          </div>
          {/* Thumbnails */}
          <div className="flex gap-3 mb-8">
            {mediaList.map((m, idx) => (
              <img
                key={idx}
                src={product.img}
                alt=""
                className="w-24 h-16 object-cover rounded-lg border-2 border-[#0078F2] shadow"
              />
            ))}
          </div>
          {/* Mô tả game */}
          <h2 className="text-4xl font-extrabold mb-3 text-[#00b4ff] drop-shadow"> {product.name} </h2>
          <p className="mb-8 text-lg text-gray-200 leading-relaxed">{product.detail || product.description}</p>

          {/* Achievements */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold mb-3 text-[#00ffae]">Thành tựu</h3>
            <div className="flex gap-6 flex-wrap">
              {achievements.length === 0 && <span className="text-gray-400">Chưa có thành tựu</span>}
              {achievements.map((ach, idx) => (
                <div key={ach.id || idx} className="flex flex-col items-center bg-[#23283a] rounded-xl px-4 py-3 shadow">
                  <img src={product.img} alt={ach.name} className="w-14 h-14 rounded-full mb-2 object-cover border-2 border-[#00b4ff]" />
                  <span className="text-base font-semibold">{ach.name}</span>
                  <span className="text-xs text-[#00ffae]">{ach.xp} XP</span>
                </div>
              ))}
            </div>
          </div>

          {/* DLC/Add-ons */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold mb-3 text-[#00ffae]">DLC & Add-ons</h3>
            <div className="flex gap-6 flex-wrap">
              {dlcs.length === 0 && <span className="text-gray-400">Chưa có DLC</span>}
              {dlcs.map(dlc => (
                <div key={dlc.id} className="flex flex-col items-center bg-[#23283a] rounded-xl px-4 py-3 shadow">
                  <img src={product.img} alt={dlc.name} className="w-20 h-20 object-cover rounded-lg mb-2 border-2 border-[#00b4ff]" />
                  <span className="text-base font-semibold">{dlc.name}</span>
                  <span className="text-xs text-green-400">{dlc.price?.toLocaleString('vi-VN')}₫</span>
                </div>
              ))}
            </div>
          </div>

          {/* System requirements */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold mb-3 text-[#00ffae]">Cấu hình yêu cầu</h3>
            <ul className="text-base bg-[#23283a] rounded-xl p-6 shadow space-y-2">
              <li><span className="font-semibold text-[#00b4ff]">OS:</span> {sysReq.os}</li>
              <li><span className="font-semibold text-[#00b4ff]">CPU:</span> {sysReq.processor}</li>
              <li><span className="font-semibold text-[#00b4ff]">RAM:</span> {sysReq.memory}</li>
              <li><span className="font-semibold text-[#00b4ff]">GPU:</span> {sysReq.graphics}</li>
              <li><span className="font-semibold text-[#00b4ff]">DirectX:</span> {sysReq.directx}</li>
              <li><span className="font-semibold text-[#00b4ff]">Storage:</span> {sysReq.storage}</li>
            </ul>
          </div>
        </div>
        {/* Cột phải: Thông tin, mua, wishlist, chia sẻ */}
        <div className="lg:w-5/12 w-full bg-[#20232e] p-8 rounded-2xl shadow-2xl flex flex-col gap-6 border border-[#232323]">
          <h1 className="text-4xl font-extrabold text-[#00b4ff] mb-2">{product.name}</h1>
          <div className="text-3xl font-bold text-green-400 mb-2 flex items-center gap-2">
            {product.discount > 0 && (
              <span className="line-through text-gray-400 text-2xl">{product.price.toLocaleString('vi-VN')}₫</span>
            )}
            <span>
              {(product.price * (1 - (product.discount || 0))).toLocaleString('vi-VN')}₫
            </span>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-[#00b4ff] to-[#00ffae] py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:from-[#0078F2] hover:to-[#00b4ff] shadow-lg text-lg transition"
          >
            <ShoppingCart size={22} /> Thêm vào giỏ hàng
          </button>
          {isWishlisted ? (
            <button
              onClick={() => handleRemoveWishlist(product.id)}
              className="bg-[#23283a] py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#00b4ff] hover:text-white shadow text-lg transition"
            >
              <Heart size={22} className="text-yellow-400" /> Xóa khỏi Wishlist
            </button>
          ) : (
            <button
              onClick={() => handleAddWishlist(product.id)}
              className="bg-[#23283a] py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#00b4ff] hover:text-white shadow text-lg transition"
            >
              <Heart size={22} /> Thêm vào Wishlist
            </button>
          )}
          {/* <button
            className="bg-[#181c24] py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#00ffae] hover:text-[#23283a] shadow text-lg transition"
          >
            <Play size={22} /> Mua ngay
          </button> */}
          <div className="flex gap-3 mt-2">
            <button className="bg-[#232323] p-3 rounded-full hover:bg-[#00b4ff] transition">
              <Share2 size={22} />
            </button>
            {/* Thêm các icon mạng xã hội khác nếu muốn */}
          </div>
          <div className="mt-6 text-base text-gray-300 space-y-2">
            <div>
              <span className="font-semibold text-[#00b4ff]">Nhà phát triển:</span>{' '}
              <span className="text-white">{product.developer}</span>
            </div>
            <div>
              <span className="font-semibold text-[#00b4ff]">Phát hành:</span>{' '}
              <span className="text-white">{product.publisher}</span>
            </div>
            <div>
              <span className="font-semibold text-[#00b4ff]">Ngày phát hành:</span>{' '}
              <span className="text-white">{new Date(product.releaseDate).toLocaleDateString()}</span>
            </div>
            <div>
              <span className="font-semibold text-[#00b4ff]">Thể loại:</span>{' '}
              <span className="text-white">{product.categoryName}</span>
            </div>
            <div>
              <span className="font-semibold text-[#00b4ff]">Age Rating:</span>{' '}
              <span className="text-white">{product.ageRating}</span>
            </div>
            <div>
              <span className="font-semibold text-[#00b4ff]">Platform:</span>{' '}
              <span className="text-white">{product.platform}</span>
            </div>
            <div>
              <span className="font-semibold text-[#00b4ff]">Epic Rewards:</span>{' '}
              <span className="text-white">{product.epicRewards}</span>
            </div>
            <div>
              <span className="font-semibold text-[#00b4ff]">Refund:</span>{' '}
              <span className="text-white">{product.refundType}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;