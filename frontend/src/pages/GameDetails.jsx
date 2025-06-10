import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useProduct } from '../hooks/useProducts';
import Loading from '../components/common/Loading';

const GameDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();
  const { data: product, isLoading, isError, error } = useProduct(id);

  if (isLoading) {
    return (
      <div className="bg-[#121212] min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="container mx-auto px-4 py-12 text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Không tìm thấy sản phẩm</h2>
          <p>{error?.message || 'Sản phẩm không tồn tại.'}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-[#0078F2] text-white px-4 py-2 rounded hover:bg-[#0060c7] mt-4"
          >
            Quay lại trang chủ
          </button>
        </div>
      </div>
    );
  }

  const inCart = isInCart(product.id);

  return (
    <div className="bg-[#121212] text-white">
      <div className="container mx-auto px-4 py-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-300 hover:text-white mb-6"
        >
          <ArrowLeft size={20} className="mr-2" />
          Quay lại
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-300 mb-6">{product.detail}</p>
            <p className="text-gray-400 mb-4">Danh mục: {product.categoryName}</p>
          </div>

          <div className="md:w-1/3">
            <div className="bg-[#202020] rounded-lg overflow-hidden sticky top-24">
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <p className="text-white font-bold text-2xl mb-6">
                  {product.price.toLocaleString('vi-VN')}₫
                </p>
                <button
                  onClick={() => addToCart(product)}
                  disabled={inCart}
                  className={`w-full py-3 px-4 rounded font-semibold flex items-center justify-center gap-2 ${
                    inCart
                      ? 'bg-green-600 text-white'
                      : 'bg-[#0078F2] text-white hover:bg-[#0060c7]'
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
  );
};

export default GameDetails;