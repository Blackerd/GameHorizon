import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Users, Tag, Award, ShoppingCart, ArrowLeft, Check, Star, Clock, Globe, Cpu, MemoryStick as Memory, HardDrive, Monitor } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { games } from '../data/games';
import GameCard from '../components/GameCard/GameCard';

const GameDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // @ts-ignore
  const { toggleCart, isInCart } = useCart();
  const [activeTab, setActiveTab] = useState('overview');

  // @ts-ignore
  const game = games.find(g => g.id === id);

  if (!game) {
    return (
        <div className="container mx-auto px-4 py-12">
          <div className="text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Không tìm thấy trò chơi</h2>
            <button
                onClick={() => navigate('/')}
                className="bg-[#0078F2] text-white px-4 py-2 rounded hover:bg-[#0060c7] transition-colors"
            >
              Quay lại trang chủ
            </button>
          </div>
        </div>
    );
  }

  const inCart = isInCart(game.id);

  // Get similar games (same genre, excluding current game)
  const similarGames = games
      .filter(g => g.id !== game.id && g.genres.some(genre => game.genres.includes(genre)))
      .slice(0, 4);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Giới thiệu</h3>
                <p className="text-gray-300 leading-relaxed">{game.description}</p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Tính năng nổi bật</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {game.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <Tag className="text-[#0078F2] mt-1" size={20} />
                        <p className="text-gray-300">{feature}</p>
                      </div>
                  ))}
                </div>
              </div>
            </div>
        );

      case 'requirements':
        return (
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-6">Yêu cầu hệ thống</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-[#202020] p-6 rounded-lg">
                    <h4 className="text-lg font-semibold mb-4">Tối thiểu</h4>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Cpu className="text-[#0078F2] mt-1" size={20} />
                        <div>
                          <p className="text-gray-400">Bộ xử lý</p>
                          <p className="text-white">Intel Core i5-3570K</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Memory className="text-[#0078F2] mt-1" size={20} />
                        <div>
                          <p className="text-gray-400">Bộ nhớ RAM</p>
                          <p className="text-white">8 GB</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <HardDrive className="text-[#0078F2] mt-1" size={20} />
                        <div>
                          <p className="text-gray-400">Dung lượng</p>
                          <p className="text-white">50 GB</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Monitor className="text-[#0078F2] mt-1" size={20} />
                        <div>
                          <p className="text-gray-400">Card đồ họa</p>
                          <p className="text-white">NVIDIA GTX 970</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#202020] p-6 rounded-lg">
                    <h4 className="text-lg font-semibold mb-4">Đề nghị</h4>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Cpu className="text-[#0078F2] mt-1" size={20} />
                        <div>
                          <p className="text-gray-400">Bộ xử lý</p>
                          <p className="text-white">Intel Core i7-8700K</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Memory className="text-[#0078F2] mt-1" size={20} />
                        <div>
                          <p className="text-gray-400">Bộ nhớ RAM</p>
                          <p className="text-white">16 GB</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <HardDrive className="text-[#0078F2] mt-1" size={20} />
                        <div>
                          <p className="text-gray-400">Dung lượng</p>
                          <p className="text-white">50 GB SSD</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Monitor className="text-[#0078F2] mt-1" size={20} />
                        <div>
                          <p className="text-gray-400">Card đồ họa</p>
                          <p className="text-white">NVIDIA RTX 2060</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        );

      case 'reviews':
        return (
            <div className="space-y-8">
              <div className="bg-[#202020] p-6 rounded-lg">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="text-4xl font-bold text-white">{game.rating}</div>
                  <div>
                    <div className="flex items-center space-x-1 mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                              key={star}
                              size={20}
                              className={star <= game.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-400"}
                          />
                      ))}
                    </div>
                    <p className="text-gray-400">Dựa trên 1,234 đánh giá</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {[
                    { user: "Player123", rating: 5, comment: "Tuyệt vời! Đồ họa đẹp và gameplay hấp dẫn." },
                    { user: "Gamer456", rating: 4, comment: "Game hay, chỉ có vài lỗi nhỏ." }
                  ].map((review, index) => (
                      <div key={index} className="border-t border-[#303030] pt-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-white font-medium">{review.user}</span>
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                      key={star}
                                      size={16}
                                      className={star <= review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-400"}
                                  />
                              ))}
                            </div>
                          </div>
                          <span className="text-gray-400 text-sm">2 ngày trước</span>
                        </div>
                        <p className="text-gray-300">{review.comment}</p>
                      </div>
                  ))}
                </div>
              </div>
            </div>
        );

      default:
        return null;
    }
  };

  return (
      <div className="bg-[#121212] text-white min-h-screen">
        {/* Hero Section */}
        <div className="relative">
          <div className="absolute inset-0 z-0">
            <img
                src={game.bannerImage || game.coverImage}
                alt={game.title}
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent" />
          </div>

          <div className="container mx-auto px-4 pt-28 pb-12 relative z-10">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-300 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Quay lại
            </button>

            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-2/3">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{game.title}</h1>

                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Star className="text-yellow-500 fill-yellow-500" size={20} />
                    <span className="font-medium">{game.rating}/5</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock size={20} className="text-gray-400" />
                    <span>{new Date(game.releaseDate).toLocaleDateString('vi-VN')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Globe size={20} className="text-gray-400" />
                    <span>{game.developer}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {game.genres.map((genre, index) => (
                      <span key={index} className="bg-[#303030] px-3 py-1 rounded-full text-sm">
                    {genre}
                  </span>
                  ))}
                </div>
              </div>

              <div className="lg:w-1/3">
                <div className="bg-[#202020] rounded-lg overflow-hidden sticky top-24">
                  <img
                      src={game.coverImage}
                      alt={game.title}
                      className="w-full h-64 object-cover"
                  />

                  <div className="p-6">
                    <div className="mb-6">
                      {game.discount > 0 ? (
                          <div className="flex items-center gap-3">
                        <span className="bg-[#0078F2] text-white px-2 py-1 rounded font-semibold">
                          -{game.discount}%
                        </span>
                            <div className="flex flex-col">
                          <span className="text-gray-400 line-through text-sm">
                            {game.price.toLocaleString('vi-VN')}₫
                          </span>
                              <span className="text-white font-bold text-2xl">
                            {Math.round(game.price * (1 - game.discount / 100)).toLocaleString('vi-VN')}₫
                          </span>
                            </div>
                          </div>
                      ) : (
                          <span className="text-white font-bold text-2xl">
                        {game.price > 0 ? `${game.price.toLocaleString('vi-VN')}₫` : 'Miễn phí'}
                      </span>
                      )}
                    </div>

                    <button
                        onClick={() => toggleCart(game)}
                        className={`w-full py-3 px-4 rounded font-semibold flex items-center justify-center gap-2 ${
                            inCart
                                ? 'bg-[#303030] text-white hover:bg-[#404040]'
                                : 'bg-[#0078F2] text-white hover:bg-[#0060c7]'
                        } transition-colors`}
                    >
                      {inCart ? (
                          <>
                            <Check size={20} />
                            Hủy thêm vào giỏ
                          </>
                      ) : (
                          <>
                            <ShoppingCart size={20} />
                            Thêm vào giỏ hàng
                          </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex border-b border-[#303030] mb-8">
            <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-3 font-medium ${
                    activeTab === 'overview'
                        ? 'text-white border-b-2 border-[#0078F2]'
                        : 'text-gray-400 hover:text-white'
                }`}
            >
              Tổng quan
            </button>
            <button
                onClick={() => setActiveTab('requirements')}
                className={`px-6 py-3 font-medium ${
                    activeTab === 'requirements'
                        ? 'text-white border-b-2 border-[#0078F2]'
                        : 'text-gray-400 hover:text-white'
                }`}
            >
              Cấu hình
            </button>
            <button
                onClick={() => setActiveTab('reviews')}
                className={`px-6 py-3 font-medium ${
                    activeTab === 'reviews'
                        ? 'text-white border-b-2 border-[#0078F2]'
                        : 'text-gray-400 hover:text-white'
                }`}
            >
              Đánh giá
            </button>
          </div>

          {renderTabContent()}
        </div>

        {/* Similar Games */}
        {similarGames.length > 0 && (
            <div className="container mx-auto px-4 py-12">
              <h2 className="text-2xl font-bold mb-6">Các trò chơi tương tự</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {similarGames.map(similarGame => (
                    <GameCard key={similarGame.id} game={similarGame} />
                ))}
              </div>
            </div>
        )}
      </div>
  );
};

export default GameDetailsPage;