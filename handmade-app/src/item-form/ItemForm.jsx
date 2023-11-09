import { useParams } from "react-router-dom";
import React from "react";
import { useContext, useEffect, useState } from "react";

import { ItemsContext } from "../ItemContext";
import { UserContext, getAccessToken } from "../UserContext";
import "./ItemForm.css";

export default function ItemForm(props) {
    const { onSubmit, item = {} } = props;

    let { id } = useParams();
    const { user } = useContext(UserContext);

    const { wallets } = useContext(ItemsContext);
    const [items, setItems] = useState(null);

    function handleSubmit(event) {
        event.preventDefault();
        const { image, name, price, colour, details } = event.target;
        console.log(event);
        const updatedItem = {
            ...items,
            image: image?.value,
            name: name?.value,
            price: price?.value,

            colour: colour?.value,
            delails: details?.value,
        };

        fetch(`http://localhost:3004/products/${id}`, {
            method: "PUT",
            body: JSON.stringify(updatedItem),
            headers: {
                "content-type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((dataFromServer) => setItems(dataFromServer));

        console.log(updatedItem);

        onSubmit(updatedItem);
        event.target.reset();
    }

    useEffect(() => {
        const selectedWallet = wallets.find(
            (storeItem) => storeItem.id === Number(id)
        );

        if (selectedWallet) {
            setItems(selectedWallet);
        } else {
            fetch(`http://localhost:3004/products/${id}`)
                .then((response) => response.json())
                .then((dataFromServer) => setItems(dataFromServer));
        }
    }, []);

    return (
        <form onSubmit={handleSubmit} className="formItem">
            <fieldset className="mb-3">
                <label htmlFor="url">URL:</label>
                <input
                    id="url"
                    type="text"
                    name="image"
                    defaultValue={items?.image}
                />
            </fieldset>

            <fieldset className="mb-3">
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    defaultValue={items?.name}
                />
            </fieldset>

            <fieldset className="mb-3">
                <label htmlFor="price">Price</label>
                <input
                    id="price"
                    type="number"
                    name="price"
                    defaultValue={items?.price}
                />
            </fieldset>

            <fieldset className="mb-3">
                <label htmlFor="colour">Colour</label>
                <input
                    id="colour"
                    type="text"
                    name="colour"
                    defaultValue={items?.colour}
                />
            </fieldset>

            <fieldset className="mb-3">
                <label htmlFor="details">Details</label>
                <input
                    id="details"
                    type="text"
                    name="details"
                    defaultValue={item?.details}
                />
            </fieldset>

            <button className="mb-3 btn5">Update</button>
        </form>
    );
}
