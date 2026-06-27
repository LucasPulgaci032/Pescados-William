'use client';

import { useCart } from "../../../contexts/cartContext";

export default function EstimatedValueCalculator() {
  const { cart } = useCart();
  console.log("CART:", cart);

cart.forEach(item => {
  console.log({
    price: item.price,
    quantity: item.quantity,
    typePrice: typeof item.price,
    typeQuantity: typeof item.quantity
  });
});
  const finalPrice = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  return (
    <div>
      Valor total estimado: R$ {finalPrice.toFixed(2)}
    </div>
  );
}