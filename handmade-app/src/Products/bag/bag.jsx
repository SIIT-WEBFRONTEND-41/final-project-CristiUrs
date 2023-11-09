import { useContext, useEffect, useState } from "react";

import { Item } from "../../HandMade/Item";

import { ItemsContext } from "../../ItemContext";

import "./bag.css";

export default function Bag() {
    const { wallets, setWallets } = useContext(ItemsContext);

    function bookmark(product, wishlist) {
        console.log(product);
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
        <main className="bag">
            <h1 className="title">Bag</h1>
            <section className="wallet-container">
                {wallets
                    .filter((product) =>
                        product.name.toLowerCase().includes("bag")
                    )
                    .map((product) => (
                        <Item
                            key={product.id}
                            product={product}
                            bookmark={bookmark}
                        ></Item>
                    ))}
            </section>
        </main>
    );
}
