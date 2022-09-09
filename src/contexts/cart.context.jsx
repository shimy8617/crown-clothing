import { createContext, useState } from "react";

export const CartContext = CreateContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const value = { isCartOpen, setIsCartOpen };

    return <CartContext.CartProvidervalue={value}>{children}</CartContext.CartProvidervalue>
}