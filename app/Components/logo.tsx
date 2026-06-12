import Image from "next/image";
import logo from "../../public/images/logo_pescados_william.png";

export default function Logo() {
  return (
    <Image
      className="max-w-1/4 mt-4"
      src={logo}
      alt="Logo"
    />
  );
}