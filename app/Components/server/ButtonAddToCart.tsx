'use client'

import { useState } from "react";
import { useCart } from "../../../contexts/cartContext";

interface Props {
    fishName: string;
    fishId: string;
}

export default function ButtonAddToCart({ fishName, fishId }: Props) {

    const { addToCart } = useCart();

    const [quantity, setQuantity] = useState(0);
    const [unit, setUnit] = useState<"UN" | "G" | "KG">("KG");

    function addItem() {
        if (quantity <= 0) return;
       console.log("BOTÃO CLICADO");
       addToCart({
            fishId,
            fishName,
            quantity,
            unit
            });

        setQuantity(0);
    }

    return (
        <div className="flex flex-col gap-2 items-center border-white border-2 p-2 rounded-lg">
            <input
                className="bg-white max-w-1/2 text-black p-2"
                type="number"
                min={0}
                value={quantity}
                onChange={(e) =>
                    setQuantity(Number(e.target.value))
                }
            />

            <select
                className="bg-gray-800 text-white"
                value={unit}
                onChange={(e) =>
                    setUnit(e.target.value as "UN" | "G" | "KG")
                }
            >
                <option value="G">Gramas</option>
                <option value="KG">Quilos</option>
                <option value="UN">Unidade</option>
            </select>

            <button
                onClick={addItem}
                className="bg-blue-500 rounded-md hover:bg-blue-400 p-2"
            >
                Adicionar ao carrinho
            </button>
        </div>
    );
}