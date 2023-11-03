import { useContext } from "react";

import { Item } from "../../HandMade/Item";

import { ItemsContext } from "../../ItemContext";

export default function CardHolder() {
    const { wallets, setWallets } = useContext(ItemsContext);

    function bookmark(product, wishlist) {
        product.wishlist = !wishlist;
        setWallets(structuredClone(wallets));
    }

    return (
        <section>
            {wallets
                .filter((product) =>
                    product.name.toLowerCase().includes("card")
                )
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
