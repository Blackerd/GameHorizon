import React from 'react';
import { Facebook, Twitter, Instagram, Youtube as YouTube, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#202020] text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Epic Games</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Về chúng tôi</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Điều khoản dịch vụ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Chính sách bảo mật</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Quyền người dùng</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Cửa hàng</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Danh mục</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Ưu đãi</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Phiếu quà tặng</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tin tức</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Hỗ trợ</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Trung tâm trợ giúp</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Liên hệ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Hỗ trợ nhà phát triển</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cộng đồng</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Kết nối</h3>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <YouTube size={24} />
              </a>
            </div>
            
            <div className="flex items-center space-x-2 text-gray-400">
              <Globe size={20} />
              <select className="bg-transparent border-none focus:outline-none">
                <option value="vi">Tiếng Việt</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="border-t border-[#303030] mt-8 pt-8 text-center text-gray-400">
          <p>© 2025 Game Horizon Việt Nam. Tất cả các nhãn hiệu đều thuộc về chủ sở hữu tương ứng.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;