import { useContext, useEffect, useState } from "react";

import { Item } from "../HandMade/Item";

import { ItemsContext } from "../ItemContext";

import { CartContext } from "../CartContext";

import "./Wishlist.css";

export default function Wishlist() {
    const { wallets, setWallets } = useContext(ItemsContext);
    const { cart, setCart } = useContext(CartContext);

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    function bookmark(product, wishlist) {
        product.wishlist = !wishlist;
        const productId = product.id;

        fetch(`http://localhost:3004/products/${productId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        });
        setWallets(structuredClone(wallets));
    }

    return (
        <main>
            <h1 className="title">Wishlist</h1>
            <section className="wallet-container">
                {wallets
                    .filter((product) => product.wishlist === true)
                    .map((product) => (
                        <Item
                            key={product.id}
                            product={product}
                            bookmark={bookmark}
                            addToCart={addToCart}
                        ></Item>
                    ))}
            </section>
        </main>
    );
}
