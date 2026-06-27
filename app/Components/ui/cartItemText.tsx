interface CartText {
    children : string
}

export default function CartItemText({children} : CartText){
    return (
        <p className="text-shadow-blue-950 font-stretch-ultra-condensed">{children}</p>
    )
}