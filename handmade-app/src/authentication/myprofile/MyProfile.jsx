import React, { useContext, useEffect, useState } from "react";
import { ItemsContext } from "../../ItemContext";
import { useParams } from "react-router-dom";

export default function MyProfile() {
    let { id } = useParams();
    const [updateItem, setUpdateItem] = useState(null);

    const { user, setUser } = useContext(ItemsContext);

    const myValue = localStorage.getItem("access_token");

    const exem = JSON.parse(myValue);

    useEffect(() => {
        fetch(`http://localhost:3004/products/${exem.user.id}`)
            .then((response) => response.json())
            .then((data) => setUpdateItem(data));
    }, []);

    return (
        <form>
            <h1>Update user</h1>
            <fieldset>
                <label htmlFor="firstName">Name</label>
                <input
                    id="firstName"
                    type="text"
                    value={updateItem?.firstName}
                />
            </fieldset>
            <fieldset>
                <label htmlFor="lastName">Last name</label>
                <input id="lastName" type="text" value={updateItem?.lastName} />
            </fieldset>
            <fieldset>
                <label htmlFor="email">Email</label>
                <input id="email" type="text" value={updateItem?.email} />
            </fieldset>
            <fieldset>
                <label htmlFor="address">Address</label>
                <input id="address" type="text" value={updateItem?.address} />
            </fieldset>
            <button>Submit</button>
        </form>
    );
}
