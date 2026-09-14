import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Bike } from '../data/repository';

export interface CartItem {
  productId: string;
  quantity: number;
  bikeContext?: Bike | null;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (productId: string, quantity: number, bikeContext?: Bike | null) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('ue_demo_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('ue_demo_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (productId: string, quantity: number, bikeContext?: Bike | null) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.productId === productId);
      if (existing) {
        return prev.map(item => 
          item.productId === productId 
            ? { ...item, quantity: item.quantity + quantity, bikeContext: bikeContext || item.bikeContext } 
            : item
        );
      }
      return [...prev, { productId, quantity, bikeContext }];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCartItems(prev => 
      prev.map(item => item.productId === productId ? { ...item, quantity } : item)
    );
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.productId !== productId));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
