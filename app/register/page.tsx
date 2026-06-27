'use client'

import Button from "../Components/ui/Button";
import Input from "../Components/ui/input";
import axios from "axios";
import Form from "../Components/ui/form";
import { useRouter } from "next/navigation";
import GoogleLoginButton from "../Components/server/GoogleSSOButton";

export default function Register(){
    const router = useRouter()
    const handleSubmit = async(e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
       console.log("SUBMIT OK")
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())
    try{
      const newUser = await axios.post(`/api/users/routes`, 
        data
      )
       if(newUser.status == 201) router.push('/dashboard')
    }catch(error : unknown){
        console.error(error)
    }
    
    }
    return(
      
         <Form onSubmit={handleSubmit} >
            <Input/>
            <Button type="submit">Cadastrar</Button>
            <br />
            <GoogleLoginButton/>
        </Form>
    )
}