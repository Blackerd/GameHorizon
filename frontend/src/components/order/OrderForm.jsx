import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../context/CartContext';
import { createOrder } from '../../api/orderApi';

const OrderForm = () => {
  const { user } = useAuth();
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const subtotal = cart.reduce((total, game) => {
    const discountedPrice = game.discount > 0
      ? Math.round(game.price * (1 - game.discount / 100)) : game.price;
    return total + discountedPrice;
  }, 0);

  const [formData, setFormData] = useState({
    customerId: user?.id || '',
    totalAmount: subtotal,
    address: '',
    numberPhone: '',
    receiver: '',
    orderItems: cart.map((item) => ({ productId: item.id, quantity: 1 })),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createOrder(formData, 'CARD', 'DELIVERED');
      alert('Đặt hàng thành công!');
      await clearCart();
      navigate('/orders');
    } catch (error) {
      console.error('Failed to place order:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Thanh toán</h2>
      <div className="mb-4">
        <p className="font-semibold">Tổng cộng: {subtotal.toLocaleString('vi-VN')}₫</p>
      </div>
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
        name="recipient"
        value={formData.receiver}
        onChange={handleChange}
        placeholder="Người nhận"
        className="w-full p-2 mb-4 border rounded"
      />
      <button type="submit" className="w-full bg-[#0078F2] text-white p-2 rounded hover:bg-[#0060c7]">
        Đặt hàng
      </button>
    </form>
  );
};

export default OrderForm;