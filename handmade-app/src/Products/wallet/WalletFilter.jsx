import { useContext, useEffect, useState } from "react";

import { Item } from "../../HandMade/Item";

import { ItemsContext } from "../../ItemContext";
import "./WalletFilter.css";
import img from "../../Image/DSC09483_800x.webp";

export default function WalletFilter() {
    const { wallets, setWallets } = useContext(ItemsContext);

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
        <main className="walletFillter">
            <div className="container">
                <img src={img} alt="" className="imgTitle" />
                <h1 className="titleCard">Wallets</h1>
            </div>

            <section className="wallet-container">
                {wallets
                    .filter((product) =>
                        product.name.toLowerCase().includes("wallet")
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
