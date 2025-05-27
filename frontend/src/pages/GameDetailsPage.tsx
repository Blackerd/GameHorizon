  import React from 'react';
  import { useParams, useNavigate } from 'react-router-dom';
  import { Calendar, Users, Tag, Award, ShoppingCart, ArrowLeft, Check, Star, Cpu, MemoryStick as Memory, HardDrive } from 'lucide-react';
  import { useCart } from '../context/CartContext';
  import { games } from '../data/games';
  import GameCard from '../components/GameCard/GameCard';
  
  const GameDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, isInCart } = useCart();
  
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
  
    const similarGames = games
        .filter(g => g.id !== game.id && g.genres.some(genre => game.genres.includes(genre)))
        .slice(0, 4);
  
    const renderRating = (rating) => {
      return [...Array(5)].map((_, index) => (
          <Star
              key={index}
              size={20}
              className={`${
                  index < Math.floor(rating)
                      ? 'text-yellow-500 fill-current'
                      : 'text-gray-400'
              }`}
          />
      ));
    };
  
    return (
        <div className="bg-[#121212] text-white">
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
  
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-2/3">
                  <h1 className="text-3xl md:text-5xl font-bold mb-4">{game.title}</h1>
                  <p className="text-gray-300 mb-6">{game.description}</p>
  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    <div>
                      <p className="text-gray-400 text-sm">Nhà phát triển</p>
                      <p className="font-medium">{game.developer}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Nhà phát hành</p>
                      <p className="font-medium">{game.publisher}</p>
                    </div>
                    <div className="flex items-start gap-1">
                      <Calendar size={18} className="text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-gray-400 text-sm">Ngày phát hành</p>
                        <p className="font-medium">{new Date(game.releaseDate).toLocaleDateString('vi-VN')}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-1">
                      <Users size={18} className="text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-gray-400 text-sm">Chế độ chơi</p>
                        <p className="font-medium">{game.multiplayer ? 'Nhiều người chơi' : 'Một người chơi'}</p>
                      </div>
                    </div>
                  </div>
                </div>
  
                <div className="md:w-1/3">
                  <div className="bg-[#202020] rounded-lg overflow-hidden sticky top-24">
                    <img
                        src={game.coverImage}
                        alt={game.title}
                        className="w-full h-64 object-cover"
                    />
  
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex">
                          {renderRating(game.rating)}
                        </div>
                        <span className="text-yellow-500 font-medium">{game.rating}/5</span>
                      </div>
  
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
                          onClick={() => addToCart(game)}
                          disabled={inCart}
                          className={`w-full py-3 px-4 rounded font-semibold flex items-center justify-center gap-2 ${
                              inCart
                                  ? 'bg-green-600 text-white'
                                  : 'bg-[#0078F2] text-white hover:bg-[#0060c7] transition-colors'
                          }`}
                      >
                        {inCart ? (
                            <>
                              <Check size={20} />
                              Đã thêm vào giỏ
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
  
          {/* Content Sections */}
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="md:col-span-2 space-y-8">
                {/* Features */}
                <section className="bg-[#202020] rounded-lg p-6">
                  <h2 className="text-2xl font-bold mb-4">Tính năng nổi bật</h2>
                  <ul className="space-y-3">
                    {game.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Tag size={20} className="text-[#0078F2] mt-1" />
                          <span>{feature}</span>
                        </li>
                    ))}
                  </ul>
                </section>
  
                {/* System Requirements */}
                <section className="bg-[#202020] rounded-lg p-6">
                  <h2 className="text-2xl font-bold mb-4">Cấu hình yêu cầu</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-2">
                        <Cpu size={20} className="text-[#0078F2] mt-1" />
                        <div>
                          <p className="font-semibold">CPU</p>
                          <p className="text-gray-400">{game.systemRequirements.split(',')[1]?.trim()}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Memory size={20} className="text-[#0078F2] mt-1" />
                        <div>
                          <p className="font-semibold">RAM</p>
                          <p className="text-gray-400">{game.systemRequirements.split(',')[2]?.trim()}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Memory size={20} className="text-[#0078F2] mt-1" />
                        <div>
                          <p className="font-semibold">Storage</p>
                          <p className="text-gray-400">{game.systemRequirements.split(',')[4]?.trim()}</p>
                        </div>
                      </div>
  
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-2">
                        <HardDrive size={20} className="text-[#0078F2] mt-1" />
                        <div>
                          <p className="font-semibold">GPU</p>
                          <p className="text-gray-400">{game.systemRequirements.split(',')[3]?.trim()}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Tag size={20} className="text-[#0078F2] mt-1" />
                        <div>
                          <p className="font-semibold">OS</p>
                          <p className="text-gray-400">{game.systemRequirements.split(',')[0]?.trim()}</p>
                        </div>
  
                      </div>
                      <div className="flex items-start gap-2">
                        <Tag size={20} className="text-[#0078F2] mt-1" />
                        <div>
                          <p className="font-semibold">Direct X</p>
                          <p className="text-gray-400">{game.direct.split(',')[0]?.trim()}</p>
                        </div>
  
                      </div>
  
                    </div>
                  </div>
                </section>
  
                {/* Screenshots */}
                <section className="bg-[#202020] rounded-lg p-6">
                  <h2 className="text-2xl font-bold mb-4">Hình ảnh trong game</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[game.coverImage, game.bannerImage, game.coverImage].map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`${game.title} screenshot ${index + 1}`}
                            className="w-full h-48 object-cover rounded-lg hover:opacity-80 transition-opacity cursor-pointer"
                        />
                    ))}
                  </div>
                </section>
              </div>
  
              {/* Sidebar */}
              <div className="space-y-8">
                {/* Genres */}
                <section className="bg-[#202020] rounded-lg p-6">
                  <h2 className="text-xl font-bold mb-4">Thể loại</h2>
                  <div className="flex flex-wrap gap-2">
                    {game.genres.map((genre, index) => (
                        <span
                            key={index}
                            className="bg-[#303030] px-3 py-1 rounded-full text-sm hover:bg-[#404040] transition-colors cursor-pointer"
                        >
                      {genre}
                    </span>
                    ))}
                  </div>
                </section>
  
                {/* Rating Details */}
                <section className="bg-[#202020] rounded-lg p-6">
                  <h2 className="text-xl font-bold mb-4">Đánh giá</h2>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-4xl font-bold text-yellow-500">{game.rating}</div>
                    <div className="flex flex-col">
                      <div className="flex">
                        {renderRating(game.rating)}
                      </div>
                      <p className="text-sm text-gray-400">Dựa trên đánh giá của người chơi</p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
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