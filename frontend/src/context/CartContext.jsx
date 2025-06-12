import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCart, addCartItem, removeCartItem, clearCart } from '../api/cartApi';
import { useCustomer } from './CustomerContext.jsx';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart phải được dùng trong CartProvider');
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { customer } = useCustomer();

  // Lấy giỏ hàng khi user đăng nhập hoặc thay đổi
const fetchCart = async () => {
  if (!customer) {
    setCart([]);
    return;
  }
  try {
    const { data } = await getCart(customer.id);
    // Sửa dòng này:
    setCart(Array.isArray(data.cartItems) ? data.cartItems : []);
  } catch (error) {
    setCart([]);
    console.error('Lỗi lấy giỏ hàng:', error);
  }
};

  useEffect(() => {
    fetchCart();
  }, [customer]);

  // Thêm sản phẩm vào giỏ hàng
  const addToCart = async (product) => {
    if (!customer) {
      alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng');
      return;
    }
    if (!isInCart(product.id)) {
      try {
        await addCartItem({ cartId: customer.cartId, productId: product.id, quantity: 1 });
        await fetchCart(); // Cập nhật lại giỏ hàng sau khi thêm
      } catch (error) {
        console.error('Lỗi thêm vào giỏ hàng:', error);
      }
    }
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = async (cartItemId) => {
    try {
      await removeCartItem(cartItemId);
      await fetchCart();
    } catch (error) {
      console.error('Lỗi xóa khỏi giỏ hàng:', error);
    }
  };

  // Xóa toàn bộ giỏ hàng
  const clearCartItems = async () => {
    if (!customer?.cartId) return;
    try {
      await clearCart(customer.cartId);
      setCart([]);
    } catch (error) {
      console.error('Lỗi xóa giỏ hàng:', error);
    }
  };

  // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
  const isInCart = (id) => cart.some((item) => item.productId === id);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart: clearCartItems, isInCart }}>
      {children}
    </CartContext.Provider>
  );
};