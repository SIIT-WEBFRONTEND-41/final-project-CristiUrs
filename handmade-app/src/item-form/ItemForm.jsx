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

    const defaultImageUrl = "https://picsum.photos/200/300";
    const defaultItem = "New item";
    const defaultPrice = "50";
    const defaultColour = "black";
    const defaultDetails = "Our new product, handmade here in the UK.";

    function handleSubmit(event) {
        event.preventDefault();
        const { image, name, price, colour, details } = event.target;
        console.log(event);
        const updatedItem = {
            ...items,
            image: image?.value || defaultImageUrl,
            name: name?.value || defaultItem,
            price: price?.value || defaultPrice,

            colour: colour?.value || defaultColour,
            delails: details?.value || defaultDetails,
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
            <fieldset className="mb-3 box">
                <label htmlFor="url">URL:</label>
                <input
                    id="url"
                    type="text"
                    name="image"
                    defaultValue={items?.image}
                />
            </fieldset>

            <fieldset className="mb-3 box">
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    defaultValue={items?.name}
                />
            </fieldset>

            <fieldset className="mb-3 box">
                <label htmlFor="price">Price</label>
                <input
                    id="price"
                    type="number"
                    name="price"
                    min={5}
                    max={500}
                    defaultValue={items?.price}
                />
            </fieldset>

            <fieldset className="mb-3">
                <label htmlFor="colour">Colour</label>
                <select id="colour" defaultValue={items?.colour}>
                    <option value="black">black</option>
                    <option value="blue">blue</option>
                    <option value="brown">brown</option>
                    <option value="green">green</option>
                    <option value="orange">orange</option>
                    <option value="red">red</option>
                    <option value="yellow">yellow</option>
                </select>
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
