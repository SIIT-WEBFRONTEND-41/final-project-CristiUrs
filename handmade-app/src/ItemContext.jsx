import React, { useState } from "react";
export const ItemsContext = React.createContext();

export default function ItemContextProvider(props) {
    const [wallets, setWallets] = useState([]);

    const { children } = props;

    return (
        <ItemsContext.Provider value={{ wallets, setWallets }}>
            {children}
        </ItemsContext.Provider>
    );
}
