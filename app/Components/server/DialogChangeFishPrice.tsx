'use client'

import axios from "axios";
import { RefObject } from "react";
import { FaWindowClose } from "react-icons/fa";


interface Props {
    fishName: string;
    dialogRef: RefObject<HTMLDialogElement | null>;
}

export default function DialogChangeFishPrice({
    fishName,
    dialogRef,
}: Props) {

    const changePrice = async (

        e: React.FormEvent<HTMLFormElement>
    ) => {
        
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const price = Number(formData.get("price"));

        await axios.patch(
            `/api/fishes/routes?fishName=${fishName}`,
            {
                price,
            }
        );

        dialogRef.current?.close();


    };

    return (
        <dialog ref={dialogRef}
        className="rounded-lg m-auto backdrop:bg-black/50
        backdrop:backdrop-blur-sm"
        >
            <FaWindowClose onClick={() => dialogRef.current?.close()}></FaWindowClose>
            <form onSubmit={changePrice}           
            className="flex flex-col bg-blue-950 p-4 text-white self-center gap-6">
                <p>Digite o novo preço</p>
                <p>Peixe : {fishName}</p>
                <input
                    type="number"
                    name="price"
                    step="0.01"
                    className="bg-white text-black p-2 rounded-2xl"
                />
            
                <button type="submit">
                    Alterar preço
                </button>
            </form>
        </dialog>
    );
}