import React, { createContext, useContext, useEffect, useState } from 'react';
import axiosClient from '../utils/axiosclient';
import { useAuth } from './AuthContext';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image_url: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

interface CartItem {
  id?: number;
  quantity: number;
  productId: number;
  Product: Product;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem | any) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  syncCartToBackend: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { isAuthenticated, token } = useAuth();

  useEffect(() => {
    if (isAuthenticated) fetchCartFromBackend();
  }, [isAuthenticated]);

  const fetchCartFromBackend = async () => {
    try {
      const res = await axiosClient.get<CartItem[]>('/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data);
    } catch (err) {
      console.error('Error fetching cart', err);
    }
  };

  const syncCartToBackend = async () => {
    if (!isAuthenticated || cartItems.length === 0) return;

    try {
      // Get current backend items
      const res = await axiosClient.get<CartItem[]>('/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const backendItems = res.data ?? [];

      const backendProductIds = new Set(backendItems.map((item) => item.productId));

      // Only send guest cart items that are not in backend
      const itemsToAdd = cartItems.filter(
        (item) => !backendProductIds.has(item.productId)
      );

      if (itemsToAdd.length > 0) {
        await axiosClient.post(
          '/cart',
          {
            items: itemsToAdd.map(({ productId, quantity }) => ({ productId, quantity })),
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      // Fetch latest full cart from backend
      fetchCartFromBackend();
    } catch (err) {
      console.error('Error syncing cart to backend:', err);
    }
  };

  const addToCart = (item: CartItem | any) => {
    const normalizedItem: CartItem = {
      productId: item.productId,
      quantity: item.quantity,
      Product: item.Product || item.product, // Normalize guest product
    };

    setCartItems((prev) => {
      const exists = prev.find((i) => i.productId === normalizedItem.productId);
      if (exists) {
        return prev.map((i) =>
          i.productId === normalizedItem.productId
            ? { ...i, quantity: i.quantity + normalizedItem.quantity }
            : i
        );
      } else {
        return [...prev, normalizedItem];
      }
    });
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, quantity } : i))
    );

    if (isAuthenticated) {
      await axiosClient.put(
        `/cart/${productId}`,
        { quantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    }
  };

  const removeFromCart = async (productId: number) => {
    setCartItems((prev) => prev.filter((i) => i.productId !== productId));
    if (isAuthenticated) {
      await axiosClient.delete(`/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  };

  const clearCart = async () => {
    setCartItems([]);
    if (isAuthenticated) {
      await axiosClient.delete(`/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        syncCartToBackend,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
