'use client';

import { ReactNode, useState } from "react";

type CartSectionAccordionProps = {

  children: ReactNode;
 
};

export default function CartSectionAccordion({
  children,
 
}: CartSectionAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div>
      <button
        onClick={toggle}
        
      >
        
        <span>
          {isOpen ? "▲" : "▼"}
        </span>
      </button>


      {isOpen && (
        <div >
          {children}
        </div>
      )}
    </div>
  );
}