import React, { createContext, useContext, useState, useEffect } from 'react';
import { Game } from '../types/Game';

interface CartContextType {
  cart: Game[];
  addToCart: (game: Game) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Game[]>(() => {
    const savedCart = localStorage.getItem('epicGameStoreCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('epicGameStoreCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (game: Game) => {
    if (!isInCart(game.id)) {
      setCart([...cart, game]);
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(game => game.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInCart = (id: string) => {
    return cart.some(game => game.id === id);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, isInCart }}>
      {children}
    </CartContext.Provider>
  );
};