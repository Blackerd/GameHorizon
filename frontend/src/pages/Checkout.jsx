import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useCustomer } from '../context/CustomerContext.jsx';
import { createOrder } from '../api/orderApi';
import toast from 'react-hot-toast';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { customer } = useCustomer();
  const navigate = useNavigate();

  // Card form state
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    cardHolder: '',
    expDate: '',
    cvv: '',
  });
  const [error, setError] = useState('');
  const [fieldError, setFieldError] = useState({});

  const total = cart.reduce(
    (sum, item) => sum + ((item.product?.price || item.price || 0) * (item.quantity || 1)),
    0
  );

  const handleCardChange = (e) => {
    setCardInfo({ ...cardInfo, [e.target.name]: e.target.value });
    setFieldError({ ...fieldError, [e.target.name]: validateField(e.target.name, e.target.value) });
    setError('');
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'cardNumber':
        if (!/^\d{16}$/.test(value.replace(/\s/g, ''))) return 'Số thẻ phải đủ 16 số';
        break;
      case 'cardHolder':
        if (!value.trim()) return 'Vui lòng nhập tên chủ thẻ';
        break;
      case 'expDate':
        if (!/^\d{2}\/\d{2}$/.test(value)) return 'Ngày hết hạn phải dạng MM/YY';
        break;
      case 'cvv':
        if (!/^\d{3,4}$/.test(value)) return 'CVV phải 3-4 số';
        break;
      default:
        break;
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate all fields before submit
    const newFieldError = {};
    Object.entries(cardInfo).forEach(([k, v]) => {
      const err = validateField(k, v);
      if (err) newFieldError[k] = err;
    });
    setFieldError(newFieldError);
    if (Object.values(newFieldError).some(Boolean)) {
      toast.error('Vui lòng nhập đúng và đầy đủ thông tin thẻ!');
      setError('');
      return;
    }
    setError('');
    if (!customer) {
      toast.error('Vui lòng đăng nhập để thanh toán!');
      navigate('/login');
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
          totalAmount: total,
          paymentMethod: 'CARD',
          status: 'COMPLETED'
        }
      );
      await clearCart();
      toast.success('Thanh toán thành công! Game đã được thêm vào thư viện của bạn.');
      navigate('/');
    } catch (error) {
      toast.error('Lỗi khi đặt hàng. Vui lòng thử lại!');
      console.error('Lỗi đặt hàng:', error);
    }
  };

  return (
    <div className="bg-[#121212] min-h-screen text-white py-8 flex items-center justify-center">
      <div className="bg-[#202020] p-8 rounded-lg max-w-md w-full shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Thanh toán qua thẻ</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 font-semibold">Số thẻ</label>
            <input
              type="text"
              name="cardNumber"
              value={cardInfo.cardNumber}
              onChange={handleCardChange}
              maxLength={16}
              inputMode="numeric"
              autoComplete="cc-number"
              className="w-full p-2 bg-[#303030] rounded text-white tracking-widest"
              placeholder="1234 5678 9012 3456"
            />
            <div className="text-red-400 text-sm h-5 mt-1 overflow-hidden">{fieldError.cardNumber || '\u00A0'}</div>
          </div>
          <div>
            <label className="block mb-2 font-semibold">Tên chủ thẻ</label>
            <input
              type="text"
              name="cardHolder"
              value={cardInfo.cardHolder}
              onChange={handleCardChange}
              autoComplete="cc-name"
              className="w-full p-2 bg-[#303030] rounded text-white uppercase"
              placeholder="NGUYEN VAN A"
            />
            <div className="text-red-400 text-sm h-5 mt-1 overflow-hidden">{fieldError.cardHolder || '\u00A0'}</div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-2 font-semibold">Ngày hết hạn</label>
              <input
                type="text"
                name="expDate"
                value={cardInfo.expDate}
                onChange={handleCardChange}
                maxLength={5}
                autoComplete="cc-exp"
                className="w-full p-2 bg-[#303030] rounded text-white"
                placeholder="MM/YY"
              />
              <div className="text-red-400 text-sm h-5 mt-1 overflow-hidden">{fieldError.expDate || '\u00A0'}</div>
            </div>
            <div className="flex-1">
              <label className="block mb-2 font-semibold">CVV</label>
              <input
                type="password"
                name="cvv"
                value={cardInfo.cvv}
                onChange={handleCardChange}
                maxLength={4}
                autoComplete="cc-csc"
                className="w-full p-2 bg-[#303030] rounded text-white"
                placeholder="123"
              />
              <div className="text-red-400 text-sm h-5 mt-1 overflow-hidden">{fieldError.cvv || '\u00A0'}</div>
            </div>
          </div>
          <div className="mb-2">
            <p className="text-xl font-bold text-[#00b4ff]">Tổng cộng: {total.toLocaleString('vi-VN')}₫</p>
          </div>
          {error && <div className="text-red-400 text-center">{error}</div>}
          <button
            type="submit"
            className="w-full py-2 rounded bg-[#0078F2] text-white hover:bg-[#0060c7] font-semibold text-lg shadow"
          >
            Thanh toán & nhận game
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;