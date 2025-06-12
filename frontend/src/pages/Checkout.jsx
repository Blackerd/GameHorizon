import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useCustomer } from '../context/CustomerContext.jsx';
import { createOrder } from '../api/orderApi';
import { getDefaultAddress, getAddressesByCustomer } from '../api/addressApi';

const PAYMENT_METHODS = [
  { value: 'COD', label: 'Thanh toán khi nhận hàng' },
  { value: 'VN_PAY', label: 'Thanh toán qua VNPay' },
  { value: 'MOMO', label: 'Thanh toán qua Momo' },
  { value: 'ZALO_PAY', label: 'Thanh toán qua ZaloPay' },
];

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { customer } = useCustomer();
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [method, setMethod] = useState('COD');

  const total = cart.reduce(
    (sum, item) => sum + ((item.product?.price || item.price || 0) * (item.quantity || 1)),
    0
  );

  useEffect(() => {
    if (!customer) return;
    const fetchAddresses = async () => {
      try {
        const { data } = await getAddressesByCustomer(customer.id);
        setAddresses(data || []);
        if (!data || data.length === 0) {
          alert('Bạn cần thêm địa chỉ giao hàng trước khi thanh toán!');
          navigate('/address');
        } else {
          const def = await getDefaultAddress(customer.id);
          setSelectedAddress(def.data?.id ? def.data : data[0]);
        }
      } catch (error) {
        console.error('Lỗi lấy địa chỉ:', error);
      }
    };
    fetchAddresses();
  }, [customer, navigate]);

  const handleAddressChange = (e) => {
    const addressId = parseInt(e.target.value);
    const address = addresses.find(addr => addr.id === addressId);
    setSelectedAddress(address);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!customer) {
    alert('Vui lòng đăng nhập để thanh toán');
    navigate('/login');
    return;
  }
  if (!selectedAddress) {
    alert('Vui lòng chọn địa chỉ giao hàng');
    return;
  }
  try {
    await createOrder(
      {
        customerId: customer.id,
        orderDetails: cart.map(item => ({
          productId: item.product?.id || item.productId,
          quantity: item.quantity
        })),
        totalAmount: total, // Đúng tên trường backend yêu cầu
        address: selectedAddress.address,
        numberPhone: selectedAddress.numberPhone,
        receiver: selectedAddress.receiver
      },
      method,
      'PENDING'
    );
    await clearCart();
    alert('Đặt hàng thành công!');
    navigate('/orders');
  } catch (error) {
    // Hiển thị lỗi chi tiết hơn cho user
    if (error.response && error.response.data && error.response.data.message) {
      alert('Lỗi khi đặt hàng: ' + error.response.data.message);
    } else {
      alert('Lỗi khi đặt hàng. Vui lòng thử lại.');
    }
    console.error('Lỗi đặt hàng:', error);
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
                value={selectedAddress?.id || ''}
                onChange={handleAddressChange}
                className="w-full p-2 bg-[#303030] rounded text-white"
              >
                {addresses.map(addr => (
                  <option key={addr.id} value={addr.id}>
                    {addr.receiver} - {addr.numberPhone} | {addr.address}
                  </option>
                ))}
              </select>
              <div className="mt-2 text-sm text-gray-400">
                {selectedAddress && (
                  <>
                    <div><b>Người nhận:</b> {selectedAddress.receiver}</div>
                    <div><b>SĐT:</b> {selectedAddress.numberPhone}</div>
                    <div><b>Địa chỉ:</b> {selectedAddress.address}</div>
                    {selectedAddress.note && <div><b>Ghi chú:</b> {selectedAddress.note}</div>}
                  </>
                )}
              </div>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2">Phương thức thanh toán</label>
              <select
                value={method}
                onChange={e => setMethod(e.target.value)}
                className="w-full p-2 bg-[#303030] rounded text-white"
              >
                {PAYMENT_METHODS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
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