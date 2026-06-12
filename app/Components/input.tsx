'use client'

import React from "react"

import { usePathname } from "next/navigation"

type Props = {
    htmlfor: string
    children : React.ReactNode
}

const FORM_CONFIG = {
    register : [
         {label : "Insira seu nome de usuário", type: "text", id : "userName"},
         {label: "Insira seu email", type : "email", id:"email"},
        {label: "Insira sua senha", type : "password",
        id:"password"}
    ],

     login : [
          {label: "Insira seu email", type : "email", id:"email"},
        {label: "Insira sua senha", type : "password",
        id:"password"
    }
     ]
       
}

function Label({children, htmlfor} : Props){
  return (
    <label htmlFor={htmlfor}>{children}</label>
  )
}

export default function Input(){
  const pathname = usePathname()
  const routekey = pathname.replace('/','')
  const fields = FORM_CONFIG[routekey as keyof typeof FORM_CONFIG] || []

    return (
    fields.map((item) => (
        <div key={item.id} className="flex flex-col gap-3 p-4">
            <Label htmlfor={item.id}>
                {item.label}
            </Label>
            <input id={item.id}
                    name={item.id}
                    type={item.type}
                    className="border-4 bg-amber-100 text-black border-blue-950 rounded-2xl "/>
        </div>
    )))
 

}