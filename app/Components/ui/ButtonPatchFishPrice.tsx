'use client'

import { useRef } from "react";
import DialogChangeFishPrice from "../server/DialogChangeFishPrice";

interface Props {
    fishName: string;
}

export default function ButtonPatchFishPrice({ fishName }: Props) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    return (
        <>
            <button
                type="button"
                onClick={() => dialogRef.current?.showModal()}
                className="bg-blue-400 rounded-xl p-2"
            >
                Alterar preço
            </button>

            <DialogChangeFishPrice
                fishName={fishName}
                dialogRef={dialogRef}
            />
        </>
    );
}