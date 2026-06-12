'use client'

import Link from "next/link";
import Button from "../Components/Button";
import Input from "../Components/input";
import  Form  from "../Components/form";
import axios from "axios";
import { useRouter } from "next/navigation";
import GoogleLoginButton from "../Components/GoogleSSOButton";



export default function Login() {
  const router = useRouter()
  const handleLogin = async(e : React.SyntheticEvent<HTMLFormElement>) => {
     e.preventDefault()
     const formData = new FormData(e.currentTarget)
     const data = Object.fromEntries(formData.entries())
     try {
      const res = await axios.post('/api/users/routes/auth/login', 
        data,
         {
    withCredentials: true
  }
      )
     
    if (res.status === 200) {
      router.push('/dashboard')
    }
      
     }catch(error : unknown){
        console.error(error)
     }
  }
  return (
    <Form onSubmit={handleLogin}>
      <p className="text-white text-2xl ">
        Faça Login
      </p>
        <Input/>
        <Button type="submit">Entrar</Button>
        <section className="flex flex-row p-4">
        <p>
          Não possui uma conta? 
        </p>
        <Link href={'/register'} className='border-2 border-white rounded-2xl w-1/2 mx-auto text-center'
        >Cadastre-se</Link>
        </section>
        <GoogleLoginButton/>
    </Form>
  );
}
