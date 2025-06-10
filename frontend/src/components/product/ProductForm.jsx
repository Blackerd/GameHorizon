import React, { useState } from 'react';
import { uploadImage } from '../../api/imageApi';
import { createProduct } from '../../api/productApi';

const ProductForm = () => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    categoryName: '',
    detail: '',
  });
  const [imageUrl, setImageUrl] = useState('');

  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleUpload = async () => {
    try {
      const { data } = await uploadImage(file);
      setImageUrl(data.url);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProduct = await createProduct({ ...formData, img: imageUrl });
      alert('Sản phẩm đã được tạo');
      onProductCreated?.(newProduct?.data); // gọi callback và truyền sản phẩm mới
    } catch (error) {
      console.error('Failed to create product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Thêm sản phẩm</h2>
      <input type="file" onChange={handleFileChange} className="mb-4" />
      <button
        type="button"
        onClick={handleUpload}
        className="bg-[#0078F2] text-white p-2 rounded mb-4"
      >
        Tải ảnh lên
      </button>
      {imageUrl && <p>Image URL: {imageUrl}</p>}
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Tên sản phẩm"
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        placeholder="Giá"
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        name="categoryName"
        value={formData.categoryName}
        onChange={handleChange}
        placeholder="Tên danh mục"
        className="w-full p-2 mb-4 border rounded"
      />
      <textarea
        name="detail"
        value={formData.detail}
        onChange={handleChange}
        placeholder="Mô tả"
        className="w-full p-2 mb-4 border rounded"
      />
      <button type="submit" className="w-full bg-[#0078F2] text-white p-2 hover:bg-[#0060c7]">
        Tạo sản phẩm
      </button>
    </form>
  );
};

export default ProductForm;