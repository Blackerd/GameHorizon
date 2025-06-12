import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useCategories } from '../hooks/useCategories';
import { createCategory, updateCategory, deleteCategory } from '../api/categoryApi';

const CategoryManagement = () => {
  const queryClient = useQueryClient();
  const { data: categories = [], isLoading, isError } = useCategories();
  const [form, setForm] = useState({ name: '', img: '' });
  const [editing, setEditing] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateCategory(editing.id, form);
        setEditing(null);
      } else {
        await createCategory(form);
      }
      setForm({ name: '', img: '' });
      queryClient.invalidateQueries(['categories']);
    } catch {
      alert('Lỗi khi lưu danh mục');
    }
  };

  const handleEdit = (cat) => {
    setEditing(cat);
    setForm({ name: cat.name, img: cat.img });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn chắc chắn muốn xóa?')) return;
    try {
      await deleteCategory(id);
      queryClient.invalidateQueries(['categories']);
    } catch {
      alert('Không thể xóa danh mục (có thể còn sản phẩm thuộc danh mục này)');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Quản lý danh mục</h2>
      <form onSubmit={handleSubmit} className="mb-6 flex gap-4 items-end">
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
            className="p-2 rounded bg-[#303030] text-white"
          />
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
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="text-red-500 hover:underline"
                      >
                        Xóa
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