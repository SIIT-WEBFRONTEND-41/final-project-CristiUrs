import React from "react";

import { useContext, useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { ItemsContext } from "../ItemContext";
import { UserContext } from "../UserContext";
import { CartContext } from "../CartContext";
import { Item } from "../HandMade/Item";

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
    console.log(cart);

    const removeFromCart = (id) => {
        const updatedItems = cart.filter((item) => item.id !== id);
        localStorage.setItem("items", JSON.stringify(updatedItems));
        setCart(updatedItems);
    };

    if (!cart) {
        return (
            <div>
                <p>Your cart is empty gdf</p>

                <p>Heloo</p>
            </div>
        );
    }

    return (
        <div>
            <h2>Shopping Cart</h2>
            {cart.length > 0 ? (
                <section className="wallet-container">
                    {cart.map((product) => (
                        <ul>
                            <li key={product.id}>
                                <img
                                    src={product.image}
                                    alt=""
                                    width="50px"
                                    height="50px"
                                />
                                <p>{product.name}</p>

                                <div>
                                    <button>+</button>
                                    <button>-</button>
                                </div>
                                <div>
                                    <p>{product.price}</p>
                                    <button
                                        onClick={() =>
                                            removeFromCart(product.id)
                                        }
                                    >
                                        Remove
                                    </button>
                                </div>
                            </li>
                        </ul>
                    ))}
                    <p>Total is: {price}</p>
                </section>
            ) : (
                <div>
                    <p>Your cart is empty</p>
                    <a href="/">Go to shop</a>
                </div>
            )}
        </div>
    );
}
