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

    const { wallets, setWallets } = useContext(ItemsContext);
    const [items, setItems] = useState(null);
    const [showMessage, setShowMessage] = useState(false);

    const bearerToken = user?.accessToken || getAccessToken();

    const defaultImageUrl = "https://picsum.photos/200/300";
    const defaultItem = "New item";
    const defaultPrice = "50";
    const defaultColour = "black";
    const defaultDetails = "Our new product, handmade here in the UK.";

    function handleSubmit(event) {
        event.preventDefault();
        const { image, name, price, colour, details } = event.target;

        const updatedItem = {
            ...items,
            image: image?.value || defaultImageUrl,
            name: name?.value || defaultItem,
            price: price?.value || defaultPrice,

            colour: colour?.value || defaultColour,
            details: details?.value || defaultDetails,
        };

        fetch(`http://localhost:3004/products/${id}`, {
            method: "PUT",
            body: JSON.stringify(updatedItem),
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${bearerToken}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setItems(data);
                setShowMessage(true);
                setTimeout(() => {
                    setShowMessage(false);
                }, 2000);
            });

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
                <input
                    id="url"
                    type="text"
                    name="image"
                    defaultValue={items?.image}
                    className="form-control"
                />
                <label htmlFor="url" className="form-label">
                    URL:
                </label>
            </fieldset>

            <fieldset className="mb-3 box">
                <input
                    id="name"
                    type="text"
                    name="name"
                    defaultValue={items?.name}
                    className="form-control"
                />
                <label htmlFor="name" className="form-label">
                    Name
                </label>
            </fieldset>

            <fieldset className="mb-3 box">
                <input
                    id="price"
                    type="number"
                    name="price"
                    min={5}
                    max={500}
                    defaultValue={items?.price}
                    className="form-control"
                />
                <label htmlFor="price" className="form-label">
                    Price
                </label>
            </fieldset>

            <fieldset className="mb-3 box">
                <select
                    id="colour"
                    defaultValue={items?.colour}
                    className="form-control"
                >
                    <option value="black">black</option>
                    <option value="blue">blue</option>
                    <option value="brown">brown</option>
                    <option value="green">green</option>
                    <option value="orange">orange</option>
                    <option value="red">red</option>
                    <option value="yellow">yellow</option>
                </select>
                <label htmlFor="colour" className="form-label">
                    Colour
                </label>
            </fieldset>

            <fieldset className="mb-3 box">
                <input
                    id="details"
                    type="text"
                    name="details"
                    defaultValue={items?.details}
                    className="form-control"
                />
                <label htmlFor="details" className="form-label">
                    Details
                </label>
            </fieldset>

            <button className="btn5">Update</button>
            {showMessage && (
                <div>
                    <p className="infoUpdate">
                        The product was updated successfully!
                    </p>
                </div>
            )}
        </form>
    );
}
