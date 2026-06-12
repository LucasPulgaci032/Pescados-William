import Logo from "./logo";

export default function Banner() {
  return (
  <header className="flex flex-row gap-4 self-center">
  <h1 className="text-blue-800 text-6xl font-extrabold stroke-text self-center">
    Pescados William
  </h1>
   <Logo/>
  </header>

  );
}