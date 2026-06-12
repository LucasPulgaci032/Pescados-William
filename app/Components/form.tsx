'use client'

import { FormHTMLAttributes, ReactNode } from "react";

type FormType = {
    children : ReactNode
} & FormHTMLAttributes<HTMLFormElement>


export default function Form({children, ...props} : FormType){
    return (
             <form className="flex flex-col border-2 border-white w-1/2 m-auto rounded-lg p-4 gap-2 bg-blue-500/30" {...props}>
                
                {children}
             </form>
    )
}