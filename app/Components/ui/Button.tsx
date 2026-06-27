import { ButtonHTMLAttributes } from "react"

type ButtonProps = {
    children: React.ReactNode,
} & ButtonHTMLAttributes<HTMLButtonElement>

const buttonStyle = 'border-2 border-white rounded-2xl w-1/2 mx-auto hover:bg-white/30'

export default function Button({children, ...props} : ButtonProps){
   return(
    <button className={buttonStyle} {...props}>
        {children}
    </button>
   )
}