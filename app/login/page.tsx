'use client';

import Link from "next/link";
import Button from "../Components/ui/Button";
import Input from "../Components/ui/input";
import Form from "../Components/ui/form";
import axios from "axios";
import { useRouter } from "next/navigation";
import GoogleLoginButton from "../Components/server/GoogleSSOButton";

export default function Login() {
  const router = useRouter();

  const handleLogin = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await axios.post(
        "/api/users/routes/auth/login",
        data,
        { withCredentials: true }
      );

      if (res.status === 200) {
        router.push("/dashboard");
      }
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <div className=" flex items-center justify-center px-4 py-6">
      <Form
        onSubmit={handleLogin}
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
        <p className="text-white text-xl sm:text-2xl text-center">
          Faça Login
        </p>

        <div className="flex flex-col gap-3">
          <Input />
        </div>

        <Button type="submit" className="w-full">
          Entrar
        </Button>

        <section className="flex flex-col sm:flex-row items-center justify-center gap-2 text-white/80 text-sm text-center">
          <p>Não possui uma conta?</p>

          <Link
            href="/register"
            className="
              border-2 border-white/30
              rounded-xl
              px-4 py-1
              w-full sm:w-auto
              text-center
              hover:bg-white/10
              transition
            "
          >
            Cadastre-se
          </Link>
        </section>

        <div className="w-full flex justify-center">
          <GoogleLoginButton />
        </div>
      </Form>
    </div>
  );
}