import React from "react";

const Banner = ({ banners, currentSlide }) => {
  const currentBanner = banners?.[currentSlide]; // Optional chaining để tránh lỗi khi banners hoặc currentSlide là undefined

  if (!currentBanner) {
    return <div>Loading...</div>; // Hoặc render fallback content
  }

  return (
    <div className="relative">
      <div className="aspect-w-16 aspect-h-9 max-h-[600px] overflow-hidden">
        <img
          src={currentBanner.image}
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{currentBanner.title}</h1>
            <p className="text-xl md:text-2xl mb-8">{currentBanner.description}</p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition duration-300">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
