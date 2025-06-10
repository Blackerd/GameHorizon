import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useCustomer } from '../context/CustomerContext.jsx';
import { createOrder } from '../api/orderApi';
import { getDefaultAddress, createAddress, getAddressesByCustomer } from '../api/addressApi';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { customer } = useCustomer();
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    province: '',
    district: '',
    ward: '',
    detail: '',
    receiver: '',
    phone: ''
  });
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  useEffect(() => {
    if (customer) {
      fetchAddresses();
      fetchDefaultAddress();
    }
  }, [customer]);

  const fetchAddresses = async () => {
    try {
      const { data } = await getAddressesByCustomer(customer.id);
      setAddresses(data);
    } catch (error) {
      console.error('Lỗi lấy danh sách địa chỉ:', error);
    }
  };

  const fetchDefaultAddress = async () => {
    try {
      const { data } = await getDefaultAddress(customer.id);
      setSelectedAddress(data);
    } catch (error) {
      console.error('Lỗi lấy địa chỉ mặc định:', error);
    }
  };

  const handleAddressChange = (e) => {
    const addressId = parseInt(e.target.value);
    const address = addresses.find(addr => addr.id === addressId);
    setSelectedAddress(address);
  };

  const handleNewAddressChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    if (!customer) return;
    try {
      const { data } = await createAddress({
        customerId: customer.id,
        ...newAddress,
        isDefault: addresses.length === 0
      });
      setAddresses([...addresses, data]);
      setSelectedAddress(data);
      setShowNewAddressForm(false);
      setNewAddress({ province: '', district: '', ward: '', detail: '', receiver: '', phone: '' });
    } catch (error) {
      console.error('Lỗi thêm địa chỉ:', error);
      alert('Không thể thêm địa chỉ mới.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customer) {
      alert('Vui lòng đăng nhập để thanh toán');
      navigate('/login');
      return;
    }
    if (!selectedAddress) {
      alert('Vui lòng chọn hoặc thêm địa chỉ giao hàng');
      return;
    }
    try {
      await createOrder({
        customerId: customer.id,
        orderDetails: cart.map(item => ({
          productId: item.productId,
          quantity: item.quantity
        })),
        total: total,
        addressId: selectedAddress.id
      }, 'CARD', 'PENDING');
      await clearCart();
      alert('Đặt hàng thành công!');
      navigate('/orders');
    } catch (error) {
      console.error('Lỗi đặt hàng:', error);
      alert('Lỗi khi đặt hàng. Vui lòng thử lại.');
    }
  };

  return (
    <div className="bg-[#121212] min-h-screen text-white py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Thanh toán</h1>
        <div className="bg-[#202020] p-6 rounded-lg max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-4">Địa chỉ giao hàng</h2>
          {addresses.length > 0 && (
            <div className="mb-4">
              <label className="block mb-2">Chọn địa chỉ</label>
              <select
                onChange={handleAddressChange}
                className="w-full p-2 bg-[#303030] rounded text-white"
              >
                <option value="">Chọn địa chỉ</option>
                {addresses.map(addr => (
                  <option key={addr.id} value={addr.id}>
                    {addr.detail}, {addr.ward}, {addr.district}, {addr.province}
                  </option>
                ))}
              </select>
            </div>
          )}
          <button
            onClick={() => setShowNewAddressForm(!showNewAddressForm)}
            className="text-[#0078F2] hover:underline mb-4"
          >
            {showNewAddressForm ? 'Hủy' : 'Thêm địa chỉ mới'}
          </button>
          {showNewAddressForm && (
            <form onSubmit={handleAddAddress} className="mb-6">
              <div className="mb-4">
                <label className="block mb-2">Tỉnh/Thành phố</label>
                <input
                  type="text"
                  name="province"
                  value={newAddress.province}
                  onChange={handleNewAddressChange}
                  className="w-full p-2 bg-[#303030] rounded text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Quận/Huyện</label>
                <input
                  type="text"
                  name="district"
                  value={newAddress.district}
                  onChange={handleNewAddressChange}
                  className="w-full p-2 bg-[#303030] rounded text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Phường/Xã</label>
                <input
                  type="text"
                  name="ward"
                  value={newAddress.ward}
                  onChange={handleNewAddressChange}
                  className="w-full p-2 bg-[#303030] rounded text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Chi tiết địa chỉ</label>
                <input
                  type="text"
                  name="detail"
                  value={newAddress.detail}
                  onChange={handleNewAddressChange}
                  className="w-full p-2 bg-[#303030] rounded text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Người nhận</label>
                <input
                  type="text"
                  name="receiver"
                  value={newAddress.receiver}
                  onChange={handleNewAddressChange}
                  className="w-full p-2 bg-[#303030] rounded text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Số điện thoại</label>
                <input
                  type="text"
                  name="phone"
                  value={newAddress.phone}
                  onChange={handleNewAddressChange}
                  className="w-full p-2 bg-[#303030] rounded text-white"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#0078F2] text-white py-2 rounded hover:bg-[#0060c7]"
              >
                Thêm địa chỉ
              </button>
            </form>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <p className="text-xl font-bold">Tổng cộng: {total.toLocaleString('vi-VN')}₫</p>
            </div>
            <button
              type="submit"
              disabled={!selectedAddress}
              className={`w-full py-2 rounded ${
                selectedAddress
                  ? 'bg-[#0078F2] text-white hover:bg-[#0060c7]'
                  : 'bg-gray-500 text-gray-300 cursor-not-allowed'
              }`}
            >
              Đặt hàng
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;