import Image from "next/image";
//import logo from "../../../public/images/logo_pescados_william.png";

import logo from "../../../public/images/pescados_william_logo.jpg"

export default function Logo() {
  return (
    <Image
      className="max-w-1/4 mt-4 rounded-full"
      src={logo}
      alt="Logo"
    />
  );
}