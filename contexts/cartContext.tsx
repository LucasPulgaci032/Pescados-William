'use client';

import axios from 'axios';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from 'react';


export interface CartItem {
  _id?: string;
  fishId: string;
  fishName: string;
  price: number;
  quantity: number;
  unit: "UN" | "G" | "KG";
}

export interface AddToCartDTO {
  fishId: string;
  fishName: string;
  quantity: number;
  unit: "UN" | "G" | "KG";
}


interface CartContextData {
  cart: CartItem[];
  addToCart: (item: AddToCartDTO) => Promise<void>;
  loadCart: () => Promise<void>;
  removeFromCart : (fishId: string) => Promise<void>
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextData>(
  {} as CartContextData
);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const initialized = useRef(false);
 
  async function loadCart() {
    try {
      

       const res = await axios.get("/api/cart/routes", {
          withCredentials: true,
        });

        console.log("RES.DATA", res.data);

        const items = res.data?.items ?? [];

        console.log("ITEMS", items);

        const normalized = items.map((item: any) => ({
          _id: item._id,
          fishId: item.fishId,
          fishName: item.fishName,
          price: item.price,
          quantity: item.quantity,
          unit: item.unit,
        }));

console.log("NORMALIZED", normalized);
console.log("SET CART EXECUTADO");

setCart(normalized);
    } catch (err) {
      console.error('ERRO LOADCART:', err);
    }
  }

  async function addToCart(item: AddToCartDTO) {
    console.log("ANTES DO PATCH");

    await axios.patch(
      '/api/cart/routes',
      {
        fishId: item.fishId,
        quantity: item.quantity,
        unit: item.unit,
      },
      { withCredentials: true }
    );
     console.log("DEPOIS DO PATCH");
    console.log("CHAMANDO LOADCART");
    await loadCart();
  }

  async function removeFromCart(fishId: string){
    await axios.delete("/api/cart/routes", {
      data: {
        fishId,
      },
      withCredentials: true,
    });

     await loadCart();
  }

  async function clearCart() {
  await axios.delete("/api/cart/routes", {
    data: {
      mode: "clear",
    },
    withCredentials: true,
  });

  await loadCart();
}

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

  
    loadCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, addToCart, loadCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}