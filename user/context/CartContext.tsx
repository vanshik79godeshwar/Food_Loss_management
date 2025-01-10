"use client";
import { createContext, useContext, useState } from "react";
import { productInterface } from "@/interfaces/productInterface";

interface CartItem {
  product: productInterface;
  count: number;
}

interface CartContextType {
  cart: Record<string, CartItem>;
  increment: (product: productInterface) => void;
  decrement: (product: productInterface) => void;
  removeFromCart: (productId: string) => void;
}

const CartContext = createContext<CartContextType>({
  cart: {},
  increment: () => {},
  decrement: () => {},
  removeFromCart: () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Record<string, CartItem>>({});

  const increment = (product: productInterface) => {
    setCart((prev) => ({
      ...prev,
      [product._id]: {
        product,
        count: (prev[product._id]?.count || 0) + 1,
      },
    }));
  };

  const decrement = (product: productInterface) => {
    setCart((prev) => {
      const currentCount = prev[product._id]?.count || 0;
      if (currentCount <= 1) {
        const { [product._id]: _, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [product._id]: {
          product,
          count: currentCount - 1,
        },
      };
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const { [productId]: _, ...rest } = prev;
      return rest;
    });
  };

  return (
    <CartContext.Provider value={{ cart, increment, decrement, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);