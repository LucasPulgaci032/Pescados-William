'use client'

import axios from "axios"
import Form from "./form"
import { useRouter } from "next/navigation"

export default function FormCreateFish(){
     
     const router = useRouter()

     const handleSubmitFormCreateFish = async(e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
    const formData = new FormData(e.currentTarget)

    try{
       await axios.post(`/api/fishes/routes`, 
        formData

       
      )

      router.refresh()
      
    }catch(error : unknown){
        console.error(error)
    }
    
    }

    return (
     <Form onSubmit={handleSubmitFormCreateFish}>

            <label htmlFor="fishName">Nome do peixe</label>
            <input
            type="text"
            name="fishName"
            className="bg-white text-black rounded-2xl"
             
            />

            <label htmlFor="fishName">Imagem do peixe</label>
            <input
            type="file"
            name="fishPicture"
            className="bg-white text-black rounded-2xl"
            />

            <label htmlFor="price">Valor do peixe</label>

            <input 
            type="text"
            name="price"
            className="bg-white text-black rounded-2xl"
             />

            <button type="submit">Criar peixe</button>
     </Form>
    )
}