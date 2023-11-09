import { useContext, useEffect, useState } from "react";

import { Item } from "../../HandMade/Item";

import { ItemsContext } from "../../ItemContext";

import { CartContext } from "../../CartContext";
import "./CardHolder.css";

export default function CardHolder() {
    const { wallets, setWallets } = useContext(ItemsContext);
    const { cart, setCart } = useContext(CartContext);

    const addToCart = (product) => {
        console.log(product);
        setCart([...cart, product]);
    };
    useEffect(() => {
        console.log("Cart changed:", cart);
    }, [cart]);

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
        <main className="card">
            <h1 className="title">Card Holder</h1>
            <section className="wallet-container">
                {wallets
                    .filter((product) =>
                        product.name.toLowerCase().includes("card")
                    )
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
