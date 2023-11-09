import React from "react";

import { useContext, useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { ItemsContext } from "../ItemContext";
import { UserContext } from "../UserContext";
import { CartContext } from "../CartContext";
import { Item } from "../HandMade/Item";
import "./ShoppingCart.css";

export default function SoppingCart() {
    const { cart, setCart } = useContext(CartContext);
    const [price, setPrice] = useState(0);

    const handlePrice = () => {
        let ans = 0;

        cart.map((product) => {
            ans += 1 * product.price;
        });
        setPrice(ans);
    };

    useEffect(() => {
        handlePrice();
    }, [cart]);

    const navigate = useNavigate();

    const removeFromCart = (id) => {
        const updatedItems = cart.filter((item) => item.id !== id);
        localStorage.setItem("items", JSON.stringify(updatedItems));
        setCart(updatedItems);
    };

    if (!cart) {
        return (
            <div>
                <p>Your cart is empty</p>
            </div>
        );
    }

    return (
        <div className="shopping">
            <h1 className="title">Shopping Cart</h1>
            {cart.length > 0 ? (
                <section className="wallet-container">
                    <ul className="items">
                        {cart.map((product) => (
                            <li className="list" key={product.id}>
                                <img
                                    src={product.image}
                                    alt=""
                                    width="50px"
                                    height="50px"
                                />
                                <p>{product.name}</p>

                                <button
                                    onClick={() => removeFromCart(product.id)}
                                >
                                    Remove
                                </button>

                                <div>
                                    <p>{product.price} &pound;</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <p>Total is: {price} &pound;</p>
                </section>
            ) : (
                <div>
                    <p>Your cart is empty</p>
                </div>
            )}
        </div>
    );
}
