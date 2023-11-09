import React, { useState, useEffect } from "react";
export const CartContext = React.createContext();

export default function CartContextProvider(props) {
    const [cart, setCart] = useState([]);
    const { children } = props;
    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(cart));
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    );
}
