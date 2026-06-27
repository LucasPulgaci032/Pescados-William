'use client';

import { useCart } from "@/contexts/cartContext";
import axios from "axios";
import { useState } from "react";

type Method = "ENTREGA" | "RETIRADA";

export default function FinalizePurchase() {
  const { clearCart } = useCart();

  const [open, setOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [method, setMethod] = useState<Method>("ENTREGA");

  const [address, setAddress] = useState({
    street: "",
    number: "",
    city: "",
    zipCode: "",
  });

  function openModal() {
    setOpen(true);
    setError(null);
  }

  function closeModal() {
    setOpen(false);
  }

  function resetAddress() {
    setAddress({
      street: "",
      number: "",
      city: "",
      zipCode: "",
    });
  }

  async function finalizePurchase() {
    try {
      setLoading(true);
      setError(null);

      await axios.post(
        "/api/purchases/routes",
        {
          method,
          address: method === "ENTREGA" ? address : undefined,
        },
        { withCredentials: true }
      );

      setOpen(false);
      setSuccessOpen(true);
      resetAddress();

    } catch (err) {
      setError("Erro ao finalizar pedido. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSuccessClose() {
    await clearCart();
    setSuccessOpen(false);
  }

  return (
    <>
      {/* BOTÃO PRINCIPAL */}
      <button
        onClick={openModal}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500 m-auto w-1/2"
      >
        Finalizar compra
      </button>

      {/* MODAL CHECKOUT */}
      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-lg w-[420px] flex flex-col gap-4 shadow-xl">

            <h2 className="text-lg font-bold">
              Finalizar pedido
            </h2>

            {/* MÉTODO */}
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value as Method)}
              className="border p-2 rounded"
            >
              <option value="ENTREGA">Entrega</option>
              <option value="RETIRADA">Retirada</option>
            </select>

            {/* ENDEREÇO */}
            {method === "ENTREGA" && (
              <div className="flex flex-col gap-2">
                <input
                  placeholder="Rua"
                  value={address.street}
                  onChange={(e) =>
                    setAddress({ ...address, street: e.target.value })
                  }
                  className="border p-2 rounded"
                />

                <input
                  placeholder="Número"
                  value={address.number}
                  onChange={(e) =>
                    setAddress({ ...address, number: e.target.value })
                  }
                  className="border p-2 rounded"
                />

                <input
                  placeholder="Cidade"
                  value={address.city}
                  onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                  }
                  className="border p-2 rounded"
                />

                <input
                  placeholder="CEP"
                  value={address.zipCode}
                  onChange={(e) =>
                    setAddress({ ...address, zipCode: e.target.value })
                  }
                  className="border p-2 rounded"
                />
              </div>
            )}

            {/* ERRO */}
            {error && (
              <p className="text-red-500 text-sm">
                {error}
              </p>
            )}

            {/* BOTÕES */}
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={closeModal}
                className="px-3 py-1 rounded border"
                disabled={loading}
              >
                Cancelar
              </button>

              <button
                onClick={finalizePurchase}
                disabled={loading}
                className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50"
              >
                {loading ? "Finalizando..." : "Confirmar"}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL SUCESSO */}
      {successOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-lg w-[320px] text-center shadow-xl">

            <div className="text-4xl mb-2">🎉</div>

            <h2 className="text-xl font-bold mb-2">
              Pedido realizado!
            </h2>

            <div className="text-sm text-gray-600 mb-4">
              <p>Sua solicitação foi enviada para a loja.</p>

              {method === "ENTREGA" && (
                <p className="mt-2">
                  O valor total e de frete será calculado, assim que concluído retornaremos!
                </p>
              )}
            </div>

            <button
              onClick={handleSuccessClose}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
            >
              OK
            </button>

          </div>
        </div>
      )}
    </>
  );
}