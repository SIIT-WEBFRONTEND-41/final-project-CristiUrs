import HeartIcon from "../Icons/HeartIcon";
import HeartFilled from "../Icons/HeartFilledIcon";
import ImageSvg from "../Icons/WalletIcon";
import { Link } from "react-router-dom";
import "./Item.css";
import { useEffect, useState } from "react";

export function Item(props) {
    const { product, bookmark, addToCart } = props;
    const { id, image, name, price, currency, wishlist, details } = product;

    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <article className="wallet cartItem">
            <div className="wallet__card">
                <Link to={`products/${id}`}>
                    <img src={image} alt="" className="image" />
                </Link>

                <span
                    className="svgHeart"
                    onClick={() => bookmark(product, wishlist)}
                >
                    {wishlist ? (
                        <HeartFilled></HeartFilled>
                    ) : (
                        <HeartIcon></HeartIcon>
                    )}
                </span>
            </div>
            <div className="wallet__info">
                <p className="wallet__name">{name}</p>
                <p className="wallet__price">{price} &pound; </p>

                <button className="btn1 wallet__btn" onClick={handleAddToCart}>
                    Add to card
                </button>
            </div>
        </article>
    );
}
