'use client';

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { ShopifyCart } from './shopify';

type CartContextType = {
  cart: ShopifyCart | null;
  isOpen: boolean;
  isLoading: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineIds: string[]) => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const cartId = localStorage.getItem('shopify_cart_id');
    if (cartId) {
      fetch('/api/shopify/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'get', cartId }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.cart) setCart(data.cart);
          else localStorage.removeItem('shopify_cart_id');
        })
        .catch(() => localStorage.removeItem('shopify_cart_id'));
    }
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback(
    async (variantId: string, quantity: number = 1) => {
      setIsLoading(true);
      try {
        const cartId = localStorage.getItem('shopify_cart_id');
        const action = cartId ? 'add' : 'create';

        const res = await fetch('/api/shopify/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action, cartId, variantId, quantity }),
        });

        const data = await res.json();
        if (data.cart) {
          setCart(data.cart);
          localStorage.setItem('shopify_cart_id', data.cart.id);
          setIsOpen(true);
        }
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const updateItem = useCallback(
    async (lineId: string, quantity: number) => {
      setIsLoading(true);
      try {
        const cartId = localStorage.getItem('shopify_cart_id');
        if (!cartId) return;

        const res = await fetch('/api/shopify/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'update', cartId, lineId, quantity }),
        });

        const data = await res.json();
        if (data.cart) setCart(data.cart);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const removeItem = useCallback(
    async (lineIds: string[]) => {
      setIsLoading(true);
      try {
        const cartId = localStorage.getItem('shopify_cart_id');
        if (!cartId) return;

        const res = await fetch('/api/shopify/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'remove', cartId, lineIds }),
        });

        const data = await res.json();
        if (data.cart) setCart(data.cart);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return (
    <CartContext.Provider
      value={{ cart, isOpen, isLoading, openCart, closeCart, addItem, updateItem, removeItem }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
