import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useCategories } from '../hooks/useCategories';
import { createCategory, updateCategory, deleteCategory } from '../api/categoryApi';
import { uploadImage } from '../api/imageApi'; // Thêm dòng này
import { Trash2, Edit } from 'lucide-react';

const CategoryManagement = () => {
  const queryClient = useQueryClient();
  const { data: categories = [], isLoading, isError } = useCategories();
  const [form, setForm] = useState({ name: '', img: '' });
  const [editing, setEditing] = useState(null);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return;
    try {
      const { data } = await uploadImage(file);
      setImageUrl(data.url);
      setForm((prev) => ({ ...prev, img: data.url }));
      alert('Tải ảnh thành công!');
    } catch {
      alert('Không thể tải ảnh lên');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const categoryData = {
        name: form.name,
        img: imageUrl || form.img
      };
      if (editing) {
        await updateCategory(editing.id, categoryData);
        setEditing(null);
      } else {
        await createCategory(categoryData);
      }
      setForm({ name: '', img: '' });
      setImageUrl('');
      setFile(null);
      queryClient.invalidateQueries(['categories']);
    } catch {
      alert('Lỗi khi lưu danh mục');
    }
  };

  const handleEdit = (cat) => {
    setEditing(cat);
    setForm({ name: cat.name, img: cat.img });
    setImageUrl(cat.img || '');
  };

  // ... giữ nguyên các hàm khác ...

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Quản lý danh mục</h2>
      <form onSubmit={handleSubmit} className="mb-6 flex gap-4 items-end flex-wrap">
        <div>
          <label className="block mb-1">Tên danh mục</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="p-2 rounded bg-[#303030] text-white"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Ảnh (URL)</label>
          <input
            name="img"
            value={form.img}
            onChange={handleChange}
            className="p-2 rounded bg-[#303030] text-white mb-2"
            placeholder="Hoặc tải ảnh lên"
          />
          <input
            type="file"
            onChange={handleFileChange}
            className="block text-white mb-2"
          />
          <button
            type="button"
            onClick={handleUpload}
            className="bg-[#0078F2] text-white px-3 py-1 rounded hover:bg-[#0060c7] mb-2"
          >
            Tải ảnh lên
          </button>
          {form.img && (
            <div className="mt-1">
              <img src={form.img} alt="preview" className="w-16 h-16 object-cover rounded" />
            </div>
          )}
        </div>
        <button
          type="submit"
          className="bg-[#0078F2] text-white px-4 py-2 rounded hover:bg-[#0060c7]"
        >
          {editing ? 'Cập nhật' : 'Thêm'}
        </button>
        {editing && (
          <button
            type="button"
            onClick={() => {
              setEditing(null);
              setForm({ name: '', img: '' });
              setImageUrl('');
              setFile(null);
            }}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Hủy
          </button>
        )}
      </form>
      {isLoading ? (
        <p>Đang tải...</p>
      ) : isError ? (
        <p>Lỗi khi tải danh mục</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#202020] rounded border border-[#303030]">
            <thead>
              <tr className="bg-[#303030] text-center">
                <th className="p-3 w-16 border-b border-[#303030]">ID</th>
                <th className="p-3 w-1/3 border-b border-[#303030]">Tên</th>
                <th className="p-3 w-1/3 border-b border-[#303030]">Ảnh</th>
                <th className="p-3 w-32 border-b border-[#303030]">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id} className="border-t border-[#303030] text-center hover:bg-[#232323]">
                  <td className="p-3 align-middle">{cat.id}</td>
                  <td className="p-3 align-middle">{cat.name}</td>
                  <td className="p-3 align-middle">
                    {cat.img ? (
                      <img
                        src={cat.img}
                        alt={cat.name}
                        className="w-14 h-14 object-cover rounded mx-auto border border-[#444]"
                      />
                    ) : (
                      <span className="text-gray-400 italic">Không có ảnh</span>
                    )}
                  </td>
                  <td className="p-3 align-middle">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(cat)}
                        className="text-[#0078F2] hover:underline"
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="text-red-500 hover:underline"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;