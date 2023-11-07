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
        <article className="wallet">
            <div className="wallet__card">
                <div className="wallet_photo">
                    <Link to={`products/${id}`}>
                        <img src={image} alt="" className="img" />
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
                    <div className="wallet__name">
                        <p className="wallet__name">{name}</p>
                    </div>

                    <div>
                        <span className="wallet__price">
                            {price}
                            <span className="wallet__currency">{currency}</span>
                        </span>
                    </div>
                    <div className="wallet__btn">
                        <button onClick={handleAddToCart}>Add to card</button>
                    </div>
                </div>
            </div>
        </article>
    );
}
