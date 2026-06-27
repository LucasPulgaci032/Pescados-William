import Logo from "./logo";
import TitleSection from "./TitleSection";

export default function Banner() {
  return (
    <header className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 self-center text-center sm:text-left">
      <TitleSection>
        Pescados William
      </TitleSection>

      <Logo />
    </header>
  );
}

/*<h1 className="text-blue-800 text-6xl font-extrabold stroke-text self-center">
    Pescados William
  </h1>*/