'use client';

import { useState } from "react";
import { useCart } from "../../../contexts/cartContext";
import CartItemText from "../ui/cartItemText";
import { FaCartShopping } from "react-icons/fa6";
import EstimatedValueCalculator from "./estimatedValueCalculator";
import FinalizePurchase from "./ButtonFinalizePurchase";
export default function Cart() {
  const { cart, removeFromCart } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`
        fixed bottom-4 right-4
        bg-gradient-to-br from-blue-950 to-blue-700
        transition-all duration-300 ease-in-out
        flex flex-col
        overflow-hidden
        shadow-xl
        z-50

        ${open
          ? "w-[92vw] sm:w-[380px] h-[70vh] sm:h-[520px] rounded-xl p-3"
          : "w-14 h-14 sm:w-16 sm:h-16 rounded-full items-center justify-center"
        }
      `}
    >
      {/* HEADER / BOTÃO TOGGLE */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-full"
      >
        <FaCartShopping size={20} />
      </button>

      {/* CONTEÚDO SÓ QUANDO ABERTO */}
      {open && (
        <div className="flex flex-col gap-2 overflow-y-auto flex-1">
          {cart?.map((item) => (
            <div
              key={item.fishId + item.unit}
              className="flex items-center justify-between p-2 border-b border-white/10"
            >
              <div className="flex flex-col">
                <CartItemText>{item.fishName}</CartItemText>

                <span className="text-xs text-white/80">
                  {item.quantity} {item.unit}
                </span>
              </div>

              <button
                onClick={() => removeFromCart(item.fishId)}
                className="px-2 py-1 text-xs bg-red-500 rounded hover:bg-red-600"
              >
                Remover
              </button>
            </div>
          ))}

          <hr className="opacity-20" />

          <EstimatedValueCalculator />

          <FinalizePurchase />
        </div>
      )}
    </div>
  );
}