import React from 'react';
import GameGrid from '../components/product/GameGrid.jsx';
import Loading from '../components/common/Loading.jsx';
import { useProducts } from '../hooks/useProducts';

const Home = () => {
  const { data: products, isLoading, isError, error } = useProducts();

  if (isLoading) {
    return (
      <div className="bg-[#121212] min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-[#121212] min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Lỗi khi tải sản phẩm</h2>
          <p>{error?.message || 'Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.'}</p>
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="bg-[#121212] min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Không có sản phẩm</h2>
          <p>Hiện tại không có sản phẩm nào trong cửa hàng.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#121212] min-h-screen py-8">
      <div className="container mx-auto px-4">
        <GameGrid products={products} title="Sản phẩm nổi bật" />
      </div>
    </div>
  );
};

export default Home;