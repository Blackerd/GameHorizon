import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCustomer } from '../context/CustomerContext';
import {
  getAllCustomers,
  getCustomerById,
  deleteCustomer,
  updateCustomerByAdmin,
  createCustomer,
} from '../api/customerApi';
import { Trash2, Edit, Plus, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';



const UserManagement = () => {
  const queryClient = useQueryClient();
  const { data: usersRaw, isLoading, isError } = useQuery({
    queryKey: ['customers'],
    queryFn: getAllCustomers,
  });

  // Đảm bảo users luôn là mảng
  const users = Array.isArray(usersRaw)
    ? usersRaw
    : (usersRaw && Array.isArray(usersRaw.data) ? usersRaw.data : []);

  const [selectedUser, setSelectedUser] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [addForm, setAddForm] = useState(null);

  // Xem chi tiết user
  const handleView = async (id) => {
    const { data } = await getCustomerById(id);
    setSelectedUser(data);
    setEditForm(null);
    setAddForm(null);
  };

  // Xóa user
  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa khách hàng này?')) return;
    try {
      await deleteCustomer(id);
      queryClient.invalidateQueries(['customers']);
      toast.success('Xóa khách hàng thành công');
    } catch
    {
      toast.error('Không thể xóa khách hàng (có thể khách hàng này có đơn hàng)');
    }
  };

  // Sửa user
  const handleEdit = (user) => {
    setEditForm({
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      phone: user.phone,
    });
    setSelectedUser(null);
    setAddForm(null);
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCustomerByAdmin(editForm.id, {
        fullname: editForm.fullname,
        email: editForm.email,
        phone: editForm.phone,
      });
      queryClient.invalidateQueries(['customers']);
      setEditForm(null);
      toast.success('Cập nhật thông tin khách hàng thành công');
    } catch
    {
      toast.error('Không thể cập nhật thông tin khách hàng');
    }
  };

  // Thêm user
  const handleAdd = () => {
    setAddForm({
      fullname: '',
      username: '',
      email: '',
      phone: '',
      password: '',
    });
    setEditForm(null);
    setSelectedUser(null);
  };

  const handleAddChange = (e) => {
    setAddForm({ ...addForm, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCustomer(addForm);
      queryClient.invalidateQueries(['customers']);
      setAddForm(null);
      toast.success('Thêm khách hàng thành công');
    } catch
    {
      toast.error('Không thể thêm khách hàng');
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Quản lý khách hàng</h2>
       <button
          onClick={handleAdd}
          className="bg-[#0078F2] text-white px-4 py-2 rounded hover:bg-[#0060c7] flex items-center gap-2"
        >
          <Plus size={18} /> Thêm khách hàng
        </button>
      </div>
      {isLoading ? (
        <p>Đang tải...</p>
      ) : isError ? (
        <p>Lỗi khi tải danh sách khách hàng</p>
      ) : (
        <table className="w-full bg-[#202020] rounded">
          <thead>
            <tr className="bg-[#303030]">
              <th className="p-2">ID</th>
              <th className="p-2">Tên</th>
              <th className="p-2">Email</th>
              <th className="p-2">SĐT</th>
              <th className="p-2">Quyền</th>
              <th className="p-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-[#303030]">
                <td className="p-2">{user.id}</td>
                <td className="p-2">{user.fullname}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.phone}</td>
                <td className="p-2">{user.role ? 'Admin' : 'User'}</td>
                <td className="p-2 flex gap-2">
                  <button
                    onClick={() => handleView(user.id)}
                    className="text-[#0078F2] hover:underline"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => handleEdit(user)}
                    className="text-yellow-400 hover:underline"
                  >
                     <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-500 hover:underline"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal thêm khách hàng */}
      {addForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#202020] p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Thêm khách hàng mới</h3>
            <form onSubmit={handleAddSubmit}>
              <input
                name="fullname"
                value={addForm.fullname}
                onChange={handleAddChange}
                placeholder="Họ tên"
                className="w-full p-2 mb-4 bg-[#303030] rounded text-white"
                required
              />
              <input
                name="username"
                value={addForm.username}
                onChange={handleAddChange}
                placeholder="Tên đăng nhập"
                className="w-full p-2 mb-4 bg-[#303030] rounded text-white"
                required
              />
              <input
                name="email"
                value={addForm.email}
                onChange={handleAddChange}
                placeholder="Email"
                className="w-full p-2 mb-4 bg-[#303030] rounded text-white"
                required
              />
              <input
                name="phone"
                value={addForm.phone}
                onChange={handleAddChange}
                placeholder="Số điện thoại"
                className="w-full p-2 mb-4 bg-[#303030] rounded text-white"
                required
              />
              <input
                name="password"
                type="password"
                value={addForm.password}
                onChange={handleAddChange}
                placeholder="Mật khẩu"
                className="w-full p-2 mb-4 bg-[#303030] rounded text-white"
                required
              />
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-[#0078F2] text-white px-4 py-2 rounded hover:bg-[#0060c7]"
                >
                  Thêm
                </button>
                <button
                  type="button"
                  onClick={() => setAddForm(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal xem chi tiết khách hàng */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#202020] p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Chi tiết khách hàng</h3>
            <p><b>ID:</b> {selectedUser.id}</p>
            <p><b>Họ tên:</b> {selectedUser.fullname}</p>
            <p><b>Email:</b> {selectedUser.email}</p>
            <p><b>SĐT:</b> {selectedUser.phone}</p>
            <p><b>Quyền:</b> {selectedUser.role ? 'Admin' : 'User'}</p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => setSelectedUser(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal sửa khách hàng */}
      {editForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#202020] p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Sửa thông tin khách hàng</h3>
            <form onSubmit={handleEditSubmit}>
              <input
                name="fullname"
                value={editForm.fullname}
                onChange={handleEditChange}
                placeholder="Họ tên"
                className="w-full p-2 mb-4 bg-[#303030] rounded text-white"
                required
              />
              <input
                name="email"
                value={editForm.email}
                onChange={handleEditChange}
                placeholder="Email"
                className="w-full p-2 mb-4 bg-[#303030] rounded text-white"
                required
              />
              <input
                name="phone"
                value={editForm.phone}
                onChange={handleEditChange}
                placeholder="Số điện thoại"
                className="w-full p-2 mb-4 bg-[#303030] rounded text-white"
                required
              />
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-[#0078F2] text-white px-4 py-2 rounded hover:bg-[#0060c7]"
                >
                  Lưu
                </button>
                <button
                  type="button"
                  onClick={() => setEditForm(null)}
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
  );
};

export default UserManagement;