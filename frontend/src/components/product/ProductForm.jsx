import React, { useState } from 'react';
import { uploadImage } from '../../api/imageApi';
import { createProduct } from '../../api/productApi';

const initialForm = {
  name: '',
  price: '',
  categoryId: '',
  categoryName: '',
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
const [formData, setFormData] = useState(initialForm);

const ProductForm = ({ onProductCreated }) => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState(initialForm);
  const [imageUrl, setImageUrl] = useState('');

  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Các hàm xử lý thêm media, dlc, achievement, systemRequirements
  const handleAddMedia = () => {
    setFormData({
      ...formData,
      media: [...formData.media, { type: '', url: '' }]
    });
  };
  const handleMediaChange = (idx, field, value) => {
    const media = [...formData.media];
    media[idx][field] = value;
    setFormData({ ...formData, media });
  };
  const handleAddDlc = () => {
    setFormData({
      ...formData,
      dlcs: [...formData.dlcs, { name: '', img: '', price: '' }]
    });
  };
  const handleDlcChange = (idx, field, value) => {
    const dlcs = [...formData.dlcs];
    dlcs[idx][field] = value;
    setFormData({ ...formData, dlcs });
  };
  const handleAddAchievement = () => {
    setFormData({
      ...formData,
      achievements: [...formData.achievements, { name: '', icon: '', xp: '' }]
    });
  };
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
      const submitData = {
        ...formData,
        img: imageUrl || formData.img,
        price: parseFloat(formData.price),
        discount: parseFloat(formData.discount) || 0,
        dlcs: formData.dlcs.map(d => ({ ...d, price: parseFloat(d.price) || 0 }))
      };
      await createProduct(submitData);
      alert('Sản phẩm đã được tạo');
      onProductCreated?.();
      setFormData(initialForm);
      setImageUrl('');
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
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Tên sản phẩm" className="w-full p-2 mb-4 border rounded" />
      <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Giá" className="w-full p-2 mb-4 border rounded" />
      <input name="categoryName" value={formData.categoryName} onChange={handleChange} placeholder="Tên danh mục" className="w-full p-2 mb-4 border rounded" />
      <textarea name="detail" value={formData.detail} onChange={handleChange} placeholder="Mô tả" className="w-full p-2 mb-4 border rounded" />
      <input name="developer" value={formData.developer} onChange={handleChange} placeholder="Developer" className="w-full p-2 mb-4 border rounded" />
      <input name="publisher" value={formData.publisher} onChange={handleChange} placeholder="Publisher" className="w-full p-2 mb-4 border rounded" />
      <input name="releaseDate" value={formData.releaseDate} onChange={handleChange} placeholder="Release Date" className="w-full p-2 mb-4 border rounded" />
      <input name="platform" value={formData.platform} onChange={handleChange} placeholder="Platform" className="w-full p-2 mb-4 border rounded" />
      <input name="ageRating" value={formData.ageRating} onChange={handleChange} placeholder="Age Rating" className="w-full p-2 mb-4 border rounded" />
      <input name="discount" type="number" value={formData.discount} onChange={handleChange} placeholder="Discount (%)" className="w-full p-2 mb-4 border rounded" />
      <input name="epicRewards" value={formData.epicRewards} onChange={handleChange} placeholder="Epic Rewards" className="w-full p-2 mb-4 border rounded" />
      <input name="refundType" value={formData.refundType} onChange={handleChange} placeholder="Refund Type" className="w-full p-2 mb-4 border rounded" />

      {/* Media */}
      <div className="mb-4">
        <label className="font-semibold">Media</label>
        {formData.media.map((m, idx) => (
          <div key={idx} className="flex gap-2 mb-2">
            <input value={m.type} onChange={e => handleMediaChange(idx, 'type', e.target.value)} placeholder="Type (image/video)" className="p-2 border rounded" />
            <input value={m.url} onChange={e => handleMediaChange(idx, 'url', e.target.value)} placeholder="URL" className="p-2 border rounded" />
          </div>
        ))}
        <button type="button" onClick={handleAddMedia} className="text-blue-600">+ Thêm media</button>
      </div>
      {/* DLCs */}
      <div className="mb-4">
        <label className="font-semibold">DLCs</label>
        {formData.dlcs.map((d, idx) => (
          <div key={idx} className="flex gap-2 mb-2">
            <input value={d.name} onChange={e => handleDlcChange(idx, 'name', e.target.value)} placeholder="Tên DLC" className="p-2 border rounded" />
            <input value={d.img} onChange={e => handleDlcChange(idx, 'img', e.target.value)} placeholder="Ảnh DLC" className="p-2 border rounded" />
            <input value={d.price} type="number" onChange={e => handleDlcChange(idx, 'price', e.target.value)} placeholder="Giá" className="p-2 border rounded" />
          </div>
        ))}
        <button type="button" onClick={handleAddDlc} className="text-blue-600">+ Thêm DLC</button>
      </div>
      {/* Achievements */}
      <div className="mb-4">
        <label className="font-semibold">Achievements</label>
        {formData.achievements.map((a, idx) => (
          <div key={idx} className="flex gap-2 mb-2">
            <input value={a.name} onChange={e => handleAchievementChange(idx, 'name', e.target.value)} placeholder="Tên" className="p-2 border rounded" />
            <input value={a.icon} onChange={e => handleAchievementChange(idx, 'icon', e.target.value)} placeholder="Icon" className="p-2 border rounded" />
            <input value={a.xp} type="number" onChange={e => handleAchievementChange(idx, 'xp', e.target.value)} placeholder="XP" className="p-2 border rounded" />
          </div>
        ))}
        <button type="button" onClick={handleAddAchievement} className="text-blue-600">+ Thêm Achievement</button>
      </div>
      {/* System Requirements */}
      <div className="mb-4">
        <label className="font-semibold">System Requirements</label>
        <input value={formData.systemRequirements.os} onChange={e => handleSysReqChange('os', e.target.value)} placeholder="OS" className="p-2 border rounded mb-2 w-full" />
        <input value={formData.systemRequirements.processor} onChange={e => handleSysReqChange('processor', e.target.value)} placeholder="Processor" className="p-2 border rounded mb-2 w-full" />
        <input value={formData.systemRequirements.memory} onChange={e => handleSysReqChange('memory', e.target.value)} placeholder="Memory" className="p-2 border rounded mb-2 w-full" />
        <input value={formData.systemRequirements.graphics} onChange={e => handleSysReqChange('graphics', e.target.value)} placeholder="Graphics" className="p-2 border rounded mb-2 w-full" />
        <input value={formData.systemRequirements.directx} onChange={e => handleSysReqChange('directx', e.target.value)} placeholder="DirectX" className="p-2 border rounded mb-2 w-full" />
        <input value={formData.systemRequirements.storage} onChange={e => handleSysReqChange('storage', e.target.value)} placeholder="Storage" className="p-2 border rounded mb-2 w-full" />
      </div>
      <button type="submit" className="w-full bg-[#0078F2] text-white p-2 hover:bg-[#0060c7]">
        Tạo sản phẩm
      </button>
    </form>
  );
};

export default ProductForm;