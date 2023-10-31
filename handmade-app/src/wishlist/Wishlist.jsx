import CartIcon from "../Icons/CartIcon";
import HeartIcon from "../Icons/HeartIcon";

import SearchIcon from "../Icons/SearchIcon";

import { useContext, useEffect, useState } from "react";

import { Item } from "../HandMade/Item";
import { Link, useNavigate } from "react-router-dom";
import { ItemsContext } from "../../src/ItemContext";
import { UserContext, getAccessToken } from "../../src/UserContext";

export default function Wishlist() {
    const [products, setProducts] = useState([]);

    const [error, setError] = useState(null);
    const { wallets, setWallets } = useContext(ItemsContext);
    const [success, setSuccess] = useState(false);

    const { user } = useContext(UserContext);

    function bookmark(product, wishlist) {
        product.wishlist = !wishlist;
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
