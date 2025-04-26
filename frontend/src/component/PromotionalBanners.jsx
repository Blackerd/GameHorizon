function PromotionalBanners() {
    return (
      <section className="py-12 px-4">
        <div className="container mx-auto grid md:grid-cols-2 gap-8">
          {/* Promotion 1 */}
          <div className="relative rounded-lg overflow-hidden">
            <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e" alt="Promotion 1" className="w-full h-64 object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="text-2xl font-bold mb-2">Summer Collection</h3>
                <p className="mb-4">Up to 30% off</p>
                <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-100 transition duration-300">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
  
          {/* Promotion 2 */}
          <div className="relative rounded-lg overflow-hidden">
            <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f" alt="Promotion 2" className="w-full h-64 object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="text-2xl font-bold mb-2">New Arrivals</h3>
                <p className="mb-4">Latest Fashion Trends</p>
                <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-100 transition duration-300">
                  Explore
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  export default PromotionalBanners;
  