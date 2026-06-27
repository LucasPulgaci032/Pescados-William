'use client';

import axios from "axios";
import Form from "../ui/form";
import { useRouter } from "next/navigation";

export default function FormCreateFish() {
  const router = useRouter();

  const handleSubmitFormCreateFish = async (
    e: React.SyntheticEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    try {
      await axios.post(`/api/fishes/routes`, formData);

      router.refresh();
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <div className=" flex items-center justify-center px-4 py-6">
      <Form
        onSubmit={handleSubmitFormCreateFish}
        className="
          w-full
          max-w-sm
          sm:max-w-md
          bg-white/5
          backdrop-blur-md
          p-6 sm:p-8
          rounded-xl
          flex flex-col
          gap-4
        "
      >
        {/* Nome */}
        <div className="flex flex-col gap-1">
          <label htmlFor="fishName" className="text-white text-sm">
            Nome do peixe
          </label>

          <input
            type="text"
            name="fishName"
            className="bg-white text-black rounded-xl p-2 w-full"
          />
        </div>

        {/* Imagem */}
        <div className="flex flex-col gap-1">
          <label htmlFor="fishPicture" className="text-white text-sm">
            Imagem do peixe
          </label>

          <input
            type="file"
            name="fishPicture"
            className="bg-white text-black rounded-xl p-2 w-full"
          />
        </div>

        {/* Preço */}
        <div className="flex flex-col gap-1">
          <label htmlFor="price" className="text-white text-sm">
            Valor do peixe
          </label>

          <input
            type="text"
            name="price"
            className="bg-white text-black rounded-xl p-2 w-full"
          />
        </div>

        {/* Botão */}
        <button
          type="submit"
          className="
            bg-blue-600
            hover:bg-blue-500
            text-white
            rounded-xl
            p-2
            w-full
            transition
          "
        >
          Criar peixe
        </button>
      </Form>
    </div>
  );
}