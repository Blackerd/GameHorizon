import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useProducts } from '../hooks/useProducts.js';
import { createProduct, updateProduct, deleteProduct } from '../api/productApi.js';
import { uploadImage } from '../api/imageApi.js';
import Loading from '../components/common/Loading.jsx';
import { Trash2, Edit, Plus } from 'lucide-react';

const Admin = () => {
  const queryClient = useQueryClient();
  const { data: products, isLoading, isError, error } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    categoryName: '',
    detail: '',
  });
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return;
    try {
      const { data } = await uploadImage(file);
      setImageUrl(data.url);
    } catch (error) {
      console.error('Lỗi upload ảnh:', error);
      alert('Không thể tải ảnh lên');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = { 
        name: formData.name,
        price: parseFloat(formData.price),
        categoryName: formData.categoryName,
        detail: formData.detail,
        image: imageUrl 
      };
      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
        alert('Cập nhật sản phẩm thành công');
      } else {
        await createProduct(productData);
        alert('Tạo sản phẩm thành công');
      }
      queryClient.invalidateQueries(['products']);
      setFormData({ name: '', price: '', categoryName: '', detail: '' });
      setImageUrl('');
      setFile(null);
      setIsModalOpen(false);
      setEditingProduct(null);
    } catch (error) {
      console.error('Lỗi:', error);
      alert('Lỗi: Không thể lưu sản phẩm');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      categoryName: product.categoryName,
      detail: product.detail,
    });
    setImageUrl(product.img);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) return;
    try {
      await deleteProduct(id);
      queryClient.invalidateQueries(['products']);
      alert('Xóa sản phẩm thành công');
    } catch (error) {
      console.error('Lỗi xóa:', error);
      alert('Lỗi: Không thể xóa sản phẩm');
    }
  };

  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

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
          <h2 className="text-2xl font-bold mb-4">Lỗi khi tải dữ liệu</h2>
          <p>{error?.message || 'Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#121212] min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Quản lý sản phẩm</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#0078F2] text-white px-4 py-2 rounded hover:bg-[#0060c7] flex items-center gap-2"
          >
            <Plus size={20} />
            Thêm sản phẩm
          </button>
        </div>

        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 mb-6 bg-[#303030] rounded text-white focus:outline-none focus:ring-2 focus:ring-[#0078F2]"
        />

        <div className="bg-[#202020] rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#303030] text-left">
                <th className="p-4">ID</th>
                <th className="p-4">Tên</th>
                <th className="p-4">Giá</th>
                <th className="p-4">Hình ảnh</th>
                <th className="p-4">Danh mục</th>
                <th className="p-4">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-t border-[#303030]">
                  <td className="p-4">{product.id}</td>
                  <td className="p-4">{product.name}</td>
                  <td className="p-4">{product.price.toLocaleString('vi-VN')}₫</td>
                  <td className="p-4">
                    <img src={product.img} alt={product.name} className="w-16 h-16 object-cover rounded" />
                  </td>
                  <td className="p-4">{product.categoryName}</td>
                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-[#0078F2] hover:text-[#0060c7]"
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#202020] p-6 rounded-lg w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">
                {editingProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm'}
              </h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="mb-4 w-full text-white"
                />
                <button
                  type="button"
                  onClick={handleUpload}
                  className="bg-[#0078F2] text-white px-4 py-2 rounded mb-4 hover:bg-[#0060c7]"
                >
                  Tải ảnh lên
                </button>
                {imageUrl && <p className="mb-4">Ảnh: {imageUrl}</p>}
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Tên sản phẩm"
                  className="w-full p-2 mb-4 bg-[#303030] rounded text-white"
                />
                <input
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Giá"
                  className="w-full p-2 mb-4 bg-[#303030] rounded text-white"
                />
                <input
                  name="categoryName"
                  value={formData.categoryName}
                  onChange={handleChange}
                  placeholder="Tên danh mục"
                  className="w-full p-2 mb-4 bg-[#303030] rounded text-white"
                />
                <textarea
                  name="detail"
                  value={formData.detail}
                  onChange={handleChange}
                  placeholder="Mô tả"
                  className="w-full p-2 mb-4 bg-[#303030] rounded text-white"
                />
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-[#0078F2] text-white px-4 py-2 rounded hover:bg-[#0060c7]"
                  >
                    {editingProduct ? 'Cập nhật' : 'Tạo'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setEditingProduct(null);
                      setFormData({ name: '', price: '', categoryName: '', detail: '' });
                      setImageUrl('');
                      setFile(null);
                    }}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;