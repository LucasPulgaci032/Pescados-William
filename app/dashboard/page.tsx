import FormCreateFish from "../Components/server/FormCreateFish";
import FishServer from "../Components/server/FishServer";
import { cookies } from "next/headers";
import TitleSection from "../Components/ui/TitleSection";
import Cart from "../Components/server/cartVisualizer";
import TodaysLocation from "../Components/ui/todaysLocation";


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
      <TodaysLocation/>
      {user?.role === "admin" && ( <> <p className="self-center stroke-text">Bem-vindo, administrador!</p> <FormCreateFish/> </> )}

      
    </section>
    <TitleSection>Peixes inteiros:</TitleSection>
    <FishServer  role={user.role}/>
    <Cart/>
    </>
  );
}  