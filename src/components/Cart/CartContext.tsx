// CartContext.tsx
import React, { createContext, useState, ReactNode, useEffect } from 'react';

interface CartProduct {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface CartContextType {
  cart: CartProduct[];
  addProductToCart: (product: CartProduct) => void;
  removeProductFromCart: (productId: number) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartProduct[]>([]);

  useEffect(() => {
    // Recuperar o carrinho do localStorage ao iniciar o aplicativo
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
   
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addProductToCart = (product: CartProduct) => {
    setCart(prevCart => [...prevCart, product]);
  };

  const removeProductFromCart = (productId: number) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(product => product.id !== productId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addProductToCart, removeProductFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
