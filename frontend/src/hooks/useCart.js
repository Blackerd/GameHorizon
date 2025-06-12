import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart phải được dùng trong CartProvider');
  return context;
};

export default useCart;