import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useProducts } from '../hooks/useProducts';
import { createProduct, updateProduct, deleteProduct } from '../api/productApi';
import { uploadImage } from '../api/imageApi';
import { Trash2, Edit, Plus } from 'lucide-react';
import { useCategories } from '../hooks/useCategories';
import toast from 'react-hot-toast';

const initialForm = {
  name: '',
  price: '',
  categoryId: '',
  detail: '',
  img: '',
  developer: '',
  publisher: '',
  releaseDate: '',
  platform: '',
  ageRating: '',
  discount: '',
  epicRewards: '',
  refundType: '',
  media: [],
  dlcs: [],
  achievements: [],
  systemRequirements: {
    os: '',
    processor: '',
    memory: '',
    graphics: '',
    directx: '',
    storage: ''
  }
};

const ProductManagement = () => {
  const queryClient = useQueryClient();
  const { data: products = [], isLoading, isError, error } = useProducts();
  const { data: categories = [] } = useCategories();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState(initialForm);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  // Media, DLC, Achievement handlers
  const handleAddMedia = () => setFormData({ ...formData, media: [...formData.media, { type: '', url: '' }] });
  const handleMediaChange = (idx, field, value) => {
    const media = [...formData.media];
    media[idx][field] = value;
    setFormData({ ...formData, media });
  };
  const handleAddDlc = () => setFormData({ ...formData, dlcs: [...formData.dlcs, { name: '', img: '', price: '' }] });
  const handleDlcChange = (idx, field, value) => {
    const dlcs = [...formData.dlcs];
    dlcs[idx][field] = value;
    setFormData({ ...formData, dlcs });
  };
  const handleAddAchievement = () => setFormData({ ...formData, achievements: [...formData.achievements, { name: '', icon: '', xp: '' }] });
  const handleAchievementChange = (idx, field, value) => {
    const achievements = [...formData.achievements];
    achievements[idx][field] = value;
    setFormData({ ...formData, achievements });
  };
  const handleSysReqChange = (field, value) => {
    setFormData({
      ...formData,
      systemRequirements: { ...formData.systemRequirements, [field]: value }
    });
  };

  // File/image handlers
  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleUpload = async () => {
    if (!file) return;
    try {
      const { data } = await uploadImage(file);
      setImageUrl(data.url);
      toast.success('Tải ảnh lên thành công');
    } catch
    {
      toast.error('Lỗi khi tải ảnh lên');
    }
  };

  // Input handler
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Submit handler
  const handleSubmit = async (e) => {
  e.preventDefault();
  const selectedCategory = categories.find(cat => String(cat.id) === String(formData.categoryId));
  const productData = {
    ...formData,
    categoryName: selectedCategory ? selectedCategory.name : '',
    img: imageUrl || formData.img,
    price: parseFloat(formData.price),
    discount: parseFloat(formData.discount) || 0,
    dlcs: Array.isArray(formData.dlcs) ? formData.dlcs.map(d => ({
      ...d,
      price: parseFloat(d.price) || 0
    })) : [],
    media: Array.isArray(formData.media) ? formData.media : [],
    achievements: Array.isArray(formData.achievements) ? formData.achievements.map(a => ({
      ...a,
      xp: parseInt(a.xp) || 0
    })) : [],
    systemRequirements: formData.systemRequirements || {
      os: '', processor: '', memory: '', graphics: '', directx: '', storage: ''
    }
  };
  if (!selectedCategory) {
    toast.error('Vui lòng chọn danh mục cho sản phẩm');
    return;
  }
  try {
    if (editingProduct) {
      await updateProduct(editingProduct.id, productData);
      toast.success('Cập nhật sản phẩm thành công');
    } else {
      await createProduct(productData);
      toast.success('Tạo sản phẩm thành công');
    }
    queryClient.invalidateQueries(['products']);
    setFormData(initialForm);
    setImageUrl('');
    setFile(null);
    setIsModalOpen(false);
    setEditingProduct(null);
  } catch (err) {
    toast.error('Lỗi khi lưu sản phẩm');
  }
};

  // Edit handler
  const handleEdit = (product) => {
  const foundCategory = categories.find(cat => cat.name === product.categoryName);
  setEditingProduct(product);
  setFormData({
    name: product.name || '',
    price: product.price || '',
    categoryId: foundCategory ? foundCategory.id : '',
    detail: product.detail || '',
    img: product.img || '',
    developer: product.developer || '',
    publisher: product.publisher || '',
    releaseDate: product.releaseDate || '',
    platform: product.platform || '',
    ageRating: product.ageRating || '',
    discount: product.discount || '',
    epicRewards: product.epicRewards || '',
    refundType: product.refundType || '',
    media: Array.isArray(product.media) ? product.media : [],
    dlcs: Array.isArray(product.dlcs) ? product.dlcs : [],
    achievements: Array.isArray(product.achievements) ? product.achievements : [],
    systemRequirements: {
      os: product.systemRequirements?.os || '',
      processor: product.systemRequirements?.processor || '',
      memory: product.systemRequirements?.memory || '',
      graphics: product.systemRequirements?.graphics || '',
      directx: product.systemRequirements?.directx || '',
      storage: product.systemRequirements?.storage || ''
    }
  });
  setImageUrl(product.img || '');
  setIsModalOpen(true);
};

  // Delete handler
  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) return;
    try {
      await deleteProduct(id);
      queryClient.invalidateQueries(['products']);
      toast.success('Xóa sản phẩm thành công');
    } catch
    {
      toast.error('Lỗi khi xóa sản phẩm');
    }
  };

  // Filtered products
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setEditingProduct(null);
            setFormData(initialForm);
            setImageUrl('');
            setFile(null);
          }}
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
      {/* Modal thêm/sửa sản phẩm */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#202020] p-6 rounded-lg w-full max-w-md overflow-y-auto max-h-[90vh]">
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
              {imageUrl && <p className="mb-4">Ảnh: <img src={imageUrl} alt="preview" className="w-16 h-16 inline-block" /></p>}
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Tên sản phẩm"
                className="w-full p-2 mb-4 bg-[#303030] rounded text-white"
                required
              />
              <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="Giá"
                className="w-full p-2 mb-4 bg-[#303030] rounded text-white"
                required
              />
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="w-full p-2 mb-4 bg-[#303030] rounded text-white"
                required
              >
                <option value="">-- Chọn danh mục --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <textarea
                name="detail"
                value={formData.detail}
                onChange={handleChange}
                placeholder="Mô tả"
                className="w-full p-2 mb-4 bg-[#303030] rounded text-white"
              />
              <input
                name="developer"
                value={formData.developer}
                onChange={handleChange}
                placeholder="Developer"
                className="w-full p-2 mb-4 bg-[#303030] rounded text-white"
              />
              <input
                name="publisher"
                value={formData.publisher}
                onChange={handleChange}
                placeholder="Publisher"
                className="w-full p-2 mb-4 bg-[#303030] rounded text-white"
              />
              <input
                name="releaseDate"
                value={formData.releaseDate}
                onChange={handleChange}
                placeholder="Release Date"
                className="w-full p-2 mb-4 bg-[#303030] rounded text-white"
              />
              <input
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                placeholder="Platform"
                className="w-full p-2 mb-4 bg-[#303030] rounded text-white"
              />
              <input
                name="ageRating"
                value={formData.ageRating}
                onChange={handleChange}
                placeholder="Age Rating"
                className="w-full p-2 mb-4 bg-[#303030] rounded text-white"
              />
              <input
                name="discount"
                type="number"
                value={formData.discount}
                onChange={handleChange}
                placeholder="Discount (%)"
                className="w-full p-2 mb-4 bg-[#303030] rounded text-white"
              />
              <input
                name="epicRewards"
                value={formData.epicRewards}
                onChange={handleChange}
                placeholder="Epic Rewards"
                className="w-full p-2 mb-4 bg-[#303030] rounded text-white"
              />
              <input
                name="refundType"
                value={formData.refundType}
                onChange={handleChange}
                placeholder="Refund Type"
                className="w-full p-2 mb-4 bg-[#303030] rounded text-white"
              />
         {/* Media */}
<div className="mb-4">
  <label className="font-semibold text-white">Media</label>
  {formData.media.map((m, idx) => (
    <div key={idx} className="flex gap-2 mb-2">
      <input
        value={m.type}
        onChange={e => handleMediaChange(idx, 'type', e.target.value)}
        placeholder="Type (image/video)"
        className="p-2 border border-[#303030] rounded bg-[#23283a] text-white"
        style={{ minWidth: 100 }}
      />
      <input
        value={m.url}
        onChange={e => handleMediaChange(idx, 'url', e.target.value)}
        placeholder="URL"
        className="p-2 border border-[#303030] rounded bg-[#23283a] text-white flex-1"
      />
    </div>
  ))}
  <button type="button" onClick={handleAddMedia} className="text-blue-600">+ Thêm media</button>
</div>
           {/* DLCs */}
<div className="mb-4">
  <label className="font-semibold text-white">DLCs</label>
  {formData.dlcs.map((d, idx) => (
    <div key={idx} className="flex gap-2 mb-2">
      <input
        value={d.name}
        onChange={e => handleDlcChange(idx, 'name', e.target.value)}
        placeholder="Tên DLC"
        className="p-2 border border-[#303030] rounded bg-[#23283a] text-white"
        style={{ minWidth: 100 }}
      />
      <input
        value={d.img}
        onChange={e => handleDlcChange(idx, 'img', e.target.value)}
        placeholder="Ảnh DLC"
        className="p-2 border border-[#303030] rounded bg-[#23283a] text-white"
      />
      <input
        value={d.price}
        type="number"
        onChange={e => handleDlcChange(idx, 'price', e.target.value)}
        placeholder="Giá"
        className="p-2 border border-[#303030] rounded bg-[#23283a] text-white"
        style={{ width: 80 }}
      />
    </div>
  ))}
  <button type="button" onClick={handleAddDlc} className="text-blue-600">+ Thêm DLC</button>
</div>
            {/* Achievements */}
<div className="mb-4">
  <label className="font-semibold text-white">Achievements</label>
  {formData.achievements.map((a, idx) => (
    <div key={idx} className="flex gap-2 mb-2">
      <input
        value={a.name}
        onChange={e => handleAchievementChange(idx, 'name', e.target.value)}
        placeholder="Tên"
        className="p-2 border border-[#303030] rounded bg-[#23283a] text-white"
        style={{ minWidth: 100 }}
      />
      <input
        value={a.icon}
        onChange={e => handleAchievementChange(idx, 'icon', e.target.value)}
        placeholder="Icon"
        className="p-2 border border-[#303030] rounded bg-[#23283a] text-white"
      />
      <input
        value={a.xp}
        type="number"
        onChange={e => handleAchievementChange(idx, 'xp', e.target.value)}
        placeholder="XP"
        className="p-2 border border-[#303030] rounded bg-[#23283a] text-white"
        style={{ width: 80 }}
      />
    </div>
  ))}
  <button type="button" onClick={handleAddAchievement} className="text-blue-600">+ Thêm Achievement</button>
</div>

{/* System Requirements */}
<div className="mb-4">
  <label className="font-semibold text-white">System Requirements</label>
  <input
    value={formData.systemRequirements.os}
    onChange={e => handleSysReqChange('os', e.target.value)}
    placeholder="OS"
    className="p-2 border border-[#303030] rounded bg-[#23283a] text-white mb-2 w-full"
  />
  <input
    value={formData.systemRequirements.processor}
    onChange={e => handleSysReqChange('processor', e.target.value)}
    placeholder="Processor"
    className="p-2 border border-[#303030] rounded bg-[#23283a] text-white mb-2 w-full"
  />
  <input
    value={formData.systemRequirements.memory}
    onChange={e => handleSysReqChange('memory', e.target.value)}
    placeholder="Memory"
    className="p-2 border border-[#303030] rounded bg-[#23283a] text-white mb-2 w-full"
  />
  <input
    value={formData.systemRequirements.graphics}
    onChange={e => handleSysReqChange('graphics', e.target.value)}
    placeholder="Graphics"
    className="p-2 border border-[#303030] rounded bg-[#23283a] text-white mb-2 w-full"
  />
  <input
    value={formData.systemRequirements.directx}
    onChange={e => handleSysReqChange('directx', e.target.value)}
    placeholder="DirectX"
    className="p-2 border border-[#303030] rounded bg-[#23283a] text-white mb-2 w-full"
  />
  <input
    value={formData.systemRequirements.storage}
    onChange={e => handleSysReqChange('storage', e.target.value)}
    placeholder="Storage"
    className="p-2 border border-[#303030] rounded bg-[#23283a] text-white mb-2 w-full"
  />
</div>
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
      setFormData(initialForm);
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
      {isLoading && <p className="mt-4">Đang tải sản phẩm...</p>}
      {isError && <p className="mt-4 text-red-500">Lỗi: {error?.message || 'Không thể tải sản phẩm'}</p>}
    </div>
  );
};

export default ProductManagement;