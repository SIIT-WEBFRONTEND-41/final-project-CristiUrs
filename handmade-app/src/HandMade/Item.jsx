import HeartIcon from "../Icons/HeartIcon";
import HeartFilled from "../Icons/HeartFilledIcon";
import ImageSvg from "../Icons/WalletIcon";
import { Link } from "react-router-dom";

export function Item(props) {
    const { product, bookmark } = props;
    const { id, image, name, price, currency, wishlist } = product;

    return (
        <article className="wallet">
            <div className="wallet__card">
                <div className="wallet_photo">
                    <Link to={`products/${id}`}>
                        <img src={image} alt="" />
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
                <div className="wallet__name">
                    <p className="wallet__name">{name}</p>
                </div>

                <div>
                    <ImageSvg />
                    <span className="wallet__price">
                        {price}{" "}
                        <span className="wallet__currency">{currency}</span>
                    </span>
                </div>
            </div>
        </article>
    );
}
