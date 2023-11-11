import React from "react";

import { useContext, useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { ItemsContext } from "../ItemContext";
import { UserContext } from "../UserContext";
import { CartContext } from "../CartContext";

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
                    <div className="container_items">
                        {cart.map((product) => (
                            <li className="list_shopping" key={product.id}>
                                <img
                                    src={product.image}
                                    alt=""
                                    width="100px"
                                    height="100px"
                                />
                                <p>{product.name}</p>

                                <button
                                    className="btn_remove"
                                    onClick={() => removeFromCart(product.id)}
                                >
                                    Remove
                                </button>

                                <div>
                                    <p>{product.price} &pound;</p>
                                </div>
                            </li>
                        ))}
                    </div>
                    <div className="total_price">
                        <h3>Total is: {price} &pound;</h3>
                    </div>
                </section>
            ) : (
                <div>
                    <p>Your cart is empty</p>
                </div>
            )}
        </div>
    );
}
