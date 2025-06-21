import React, { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import GameCard from './GameCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PRODUCTS_PER_PAGE = 5;

const FeaturedProductsSection = () => {
  const { data: products = [] } = useProducts();
  // Lấy 15 sản phẩm nổi bật đầu tiên, bạn có thể thay đổi tiêu chí lọc
  const featured = products.slice(0, 15);
  const [page, setPage] = useState(0);

  const maxPage = Math.max(0, Math.ceil(featured.length / PRODUCTS_PER_PAGE) - 1);
  const showProducts = featured.slice(page * PRODUCTS_PER_PAGE, (page + 1) * PRODUCTS_PER_PAGE);

  return (
    <section className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          Discover Something New <span className="ml-2 text-[#00b4ff]">&rarr;</span>
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
            className={`p-2 rounded-full bg-[#23283a] text-white hover:bg-[#303040] transition ${page === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => setPage(p => Math.min(maxPage, p + 1))}
            disabled={page === maxPage}
            className={`p-2 rounded-full bg-[#23283a] text-white hover:bg-[#303040] transition ${page === maxPage ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {showProducts.map(product => (
          <div key={product.id}>
            <GameCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProductsSection;