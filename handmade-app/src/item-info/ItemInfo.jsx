import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { ItemsContext } from "../ItemContext";
import { UserContext, getAccessToken } from "../UserContext";
import ProductCounter from "./ProductCounter";
import "./ItemInfo.css";

export default function ItemInfo() {
    let { id } = useParams();
    const [item, setItem] = useState(null);
    const [showDialog, setShowDialog] = useState(false);
    const { wallets } = useContext(ItemsContext);
    const { user } = useContext(UserContext);
    const [showText1, setShowText1] = useState(false);
    const [showText2, setShowText2] = useState(false);
    const [buttonText2, setButtonText2] = useState("+");
    const [buttonText1, setButtonText1] = useState("+");

    const toggleText1 = () => {
        setShowText1(!showText1);
        setButtonText1(showText1 ? "+" : "-");
    };
    const toggleText2 = () => {
        setShowText2(!showText2);
        setButtonText2(showText2 ? "+" : "-");
    };

    const navigate = useNavigate();
    const bearerToken = user?.accessToken || getAccessToken();

    useEffect(() => {
        const selectedWallet = wallets.find(
            (storeItem) => storeItem.id === Number(id)
        );

        if (selectedWallet) {
            setItem(selectedWallet);
        } else {
            fetch(`http://localhost:3004/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${bearerToken}`,
                },
            })
                .then((response) => response.json())
                .then((dataFromServer) => setItem(dataFromServer));
        }
    }, []);

    return (
        <article className="item">
            <div className="item_img">
                <img src={item?.image} alt="" className="item_img" />
            </div>
            <div className="item_details">
                <div className="wallet__name">
                    <p className="wallet__name">{item?.name}</p>
                </div>

                <div>
                    <span className="wallet__price">
                        {item?.price}{" "}
                        <span className="wallet__currency">
                            {item?.currency}
                        </span>
                    </span>
                </div>
                <div>
                    <h5>Detailed Description</h5>
                    <button onClick={toggleText1}>{buttonText1}</button>
                    {showText1 && <p>{item?.details}</p>}
                </div>

                <div>
                    <h5>Delivery & Returns </h5>
                    <button onClick={toggleText2}>{buttonText2}</button>
                    {showText2 && (
                        <p>
                            UK shipping is free over £150 and always tracked.
                            International orders over £250 also include free
                            shipping. UK returns are free of charge via
                            Collect+, so if you change your mind or are not
                            happy with your order, you may return it within 30
                            days. International returns will incur a cost.
                        </p>
                    )}
                </div>
            </div>
        </article>
    );
}
