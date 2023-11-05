import { useContext, useEffect, useState } from "react";

import { Item } from "../HandMade/Item";
import { Link, useNavigate } from "react-router-dom";
import { ItemsContext } from "../../src/ItemContext";
import { UserContext, getAccessToken } from "../../src/UserContext";

export default function Wishlist() {
    const [products, setProducts] = useState([]);

    const { wallets, setWallets } = useContext(ItemsContext);

    const { user } = useContext(UserContext);

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
        <section>
            {wallets
                .filter((product) => product.wishlist === true)
                .map((product) => (
                    <Item
                        key={product.id}
                        product={product}
                        bookmark={bookmark}
                    ></Item>
                ))}
        </section>
    );
}
