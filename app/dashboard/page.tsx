import FormCreateFish from "../Components/FormCreateFish";
import FishServer from "../Components/FishServer";
import { cookies } from "next/headers";


export default async function Dashboard() {

  const cookieStore = await cookies()

    const res = await fetch("http://localhost:3000/api/users/routes/auth/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  const user = await res.json();

  return (
    <>
    <section className="flex flex-col border-2 border-white rounded-lg p-6 w-[80%] m-auto">
      <p>Olá {user?.userName}</p>

      {user?.role === "admin" && ( <> <p className="text-white">Bem-vindo, administrador!</p> <FormCreateFish/> </> )}

      
    </section>
    <h1 className="text-blue-800 text-6xl font-extrabold stroke-text self-center">Peixes inteiros:</h1>
    <FishServer  role={user.role}/>
    </>
  );
}