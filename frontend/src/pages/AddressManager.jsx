import React, { useEffect, useState } from 'react';
import {
  getAddressesByCustomer,
  createAddress,
  getDefaultAddress,
  setDefaultAddress,
  deleteAddress,
} from '../api/addressApi';
import { useCustomer } from '../context/CustomerContext';

const AddressManager = () => {
  const { customer } = useCustomer();
  const [addresses, setAddresses] = useState([]);
  const [defaultAddress, setDefaultAddressState] = useState(null);
  const [form, setForm] = useState({
    receiver: '',
    numberPhone: '',
    address: '',
    note: ''
  });
  const [showForm, setShowForm] = useState(false);

  const fetchAddresses = async () => {
    if (!customer) return;
    const res = await getAddressesByCustomer(customer.id);
    setAddresses(res.data || []);
    const def = await getDefaultAddress(customer.id);
    setDefaultAddressState(def.data || null);
  };

  useEffect(() => {
    fetchAddresses();
    // eslint-disable-next-line
  }, [customer]);

  const handleAdd = async (e) => {
    e.preventDefault();
    await createAddress({ ...form, customerId: customer.id });
    setForm({ receiver: '', numberPhone: '', address: '', note: '' });
    setShowForm(false);
    fetchAddresses();
  };

  const handleSetDefault = async (addressId) => {
    await setDefaultAddress(customer.id, addressId);
    fetchAddresses();
  };

  const handleDelete = async (addressId) => {
    if (window.confirm('Bạn chắc chắn muốn xóa địa chỉ này?')) {
      await deleteAddress(addressId);
      fetchAddresses();
    }
  };

  return (
    <div className="p-2">
      <h2 className="text-2xl font-bold mb-6 text-[#00b4ff]">Quản lý địa chỉ giao hàng</h2>
      <div className="flex justify-end mb-4">
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-[#0078F2] text-white px-4 py-2 rounded hover:bg-[#0060c7] transition"
          >
            Thêm địa chỉ mới
          </button>
        )}
      </div>
      {showForm && (
        <form onSubmit={handleAdd} className="mb-8 bg-[#232323] p-6 rounded-lg shadow space-y-3">
          <div className="flex gap-4">
            <input
              className="w-1/2 p-2 rounded bg-[#303030] text-white"
              placeholder="Tên người nhận"
              value={form.receiver}
              onChange={e => setForm({ ...form, receiver: e.target.value })}
              required
            />
            <input
              className="w-1/2 p-2 rounded bg-[#303030] text-white"
              placeholder="Số điện thoại"
              value={form.numberPhone}
              onChange={e => setForm({ ...form, numberPhone: e.target.value })}
              required
            />
          </div>
          <input
            className="w-full p-2 rounded bg-[#303030] text-white"
            placeholder="Địa chỉ chi tiết"
            value={form.address}
            onChange={e => setForm({ ...form, address: e.target.value })}
            required
          />
          <input
            className="w-full p-2 rounded bg-[#303030] text-white"
            placeholder="Ghi chú (tuỳ chọn)"
            value={form.note}
            onChange={e => setForm({ ...form, note: e.target.value })}
          />
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-[#0078F2] text-white px-4 py-2 rounded hover:bg-[#0060c7]"
            >
              Lưu địa chỉ
            </button>
          </div>
        </form>
      )}
      <div>
        {addresses.length === 0 ? (
          <div className="text-center text-gray-400">Bạn chưa có địa chỉ nào.</div>
        ) : (
          <div className="bg-[#202020] rounded-lg shadow">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#232323]">
                  <th className="p-3">Người nhận</th>
                  <th className="p-3">Số điện thoại</th>
                  <th className="p-3">Địa chỉ</th>
                  <th className="p-3">Ghi chú</th>
                  <th className="p-3 text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {addresses.map(addr => (
                  <tr
                    key={addr.id}
                    className={`border-b border-[#303030] ${defaultAddress?.id === addr.id ? 'bg-[#1a2a3a]' : ''}`}
                  >
                    <td className="p-3 font-semibold">
                      {addr.receiver}
                      {defaultAddress?.id === addr.id && (
                        <span className="ml-2 text-xs text-[#0078F2] font-bold">(Mặc định)</span>
                      )}
                    </td>
                    <td className="p-3">{addr.numberPhone}</td>
                    <td className="p-3">{addr.address}</td>
                    <td className="p-3">{addr.note}</td>
                    <td className="p-3 flex gap-2 justify-center">
                      {defaultAddress?.id !== addr.id && (
                        <button
                          onClick={() => handleSetDefault(addr.id)}
                          className="text-[#0078F2] hover:underline"
                        >
                          Đặt mặc định
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(addr.id)}
                        className="text-red-500 hover:underline"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressManager;