
interface TitleChildren {
    children : string,

}


export default function TitleSection({ children }: TitleChildren) {
  return (
    <h1
      className="
        font-extrabold
        text-4xl sm:text-6xl
        text-center
        bg-linear-to-r
        from-blue-900
        via-blue-500
        to-cyan-400
        bg-clip-text
        text-transparent
        stroke-text
      "
    >
      {children}
    </h1>
  );
}