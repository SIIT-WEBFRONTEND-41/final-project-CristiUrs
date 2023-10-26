import React, { useEffect, useState } from "react";

export const UserContext = React.createContext();

export default function UserContextProvider(props) {
    const [user, setUser] = useState();

    useEffect(() => {
        const tokenStorage = getAccessToken();

        if (tokenStorage) {
            setUser(tokenStorage);
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {props.children}
        </UserContext.Provider>
    );
}

export function getAccessToken() {
    const tokenStorage = JSON.parse(
        window.localStorage.getItem("access_token") || {}
    );

    return tokenStorage?.accessToken;
}
