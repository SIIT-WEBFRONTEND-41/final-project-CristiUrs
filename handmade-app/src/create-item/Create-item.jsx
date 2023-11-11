import React from "react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext, getAccessToken } from "../UserContext";
import img from "../Image/istockphoto-471217520-1024x1024.jpg";
import "./Create-item.css";

export default function ItemForm() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const [items, setItems] = useState(null);

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

        fetch(`http://localhost:3004/products`, {
            method: "POST",
            body: JSON.stringify(updatedItem),
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${bearerToken}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setItems(data);
                setShowSuccessMessage(true);
                setTimeout(() => {
                    setShowSuccessMessage(false);
                    navigate("/");
                }, 2000);
            });
    }

    return (
        <main>
            <div className="containerCreate">
                <h1 className="title_create">Create a new item</h1>
            </div>
            <form onSubmit={handleSubmit} className="form_create">
                <fieldset className="mb-3 box">
                    <input
                        id="url"
                        type="text"
                        name="image"
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
                        className="form-control"
                    />
                    <label htmlFor="price" className="form-label">
                        Price
                    </label>
                </fieldset>

                <fieldset className="mb-3 box">
                    <select id="colour" className="form-control">
                        <option value=""></option>
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
                        className="form-control"
                    />
                    <label htmlFor="details" className="form-label">
                        Details
                    </label>
                </fieldset>

                <button className="btn5">Create</button>
                {showSuccessMessage && (
                    <div>
                        <p>The product was created successfully</p>
                    </div>
                )}
            </form>
        </main>
    );
}
