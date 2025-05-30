import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { createAddress } from '../../api/addressApi';

const AddressForm = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    customerId: user?.id || '',
    address: '',
    numberPhone: '',
    receiver: '',
    isDefault: true,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAddress(formData);
      alert('Địa chỉ đã được thêm');
    } catch (error) {
      console.error('Failed to add address:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Thêm địa chỉ</h2>
      <input
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Địa chỉ"
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        name="numberPhone"
        value={formData.numberPhone}
        onChange={handleChange}
        placeholder="Số điện thoại"
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        name="receiver"
        value={formData.receiver}
        onChange={handleChange}
        placeholder="Người nhận"
        className="w-full p-2 mb-4 border rounded"
      />
      <button type="submit" className="w-full bg-[#0078F2] text-white p-2 rounded hover:bg-[#0060c7]">
        Thêm địa chỉ
      </button>
    </form>
  );
};

export default AddressForm;