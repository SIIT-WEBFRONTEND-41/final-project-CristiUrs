import { useContext, useEffect, useState } from "react";

import { Item } from "../../HandMade/Item";

import { ItemsContext } from "../../ItemContext";
import { CartContext } from "../../CartContext";

export default function Bag() {
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
        <section>
            {wallets
                .filter((product) => product.name.toLowerCase().includes("bag"))
                .map((product) => (
                    <Item
                        key={product.id}
                        product={product}
                        bookmark={bookmark}
                        addToCart={addToCart}
                    ></Item>
                ))}
        </section>
    );
}
