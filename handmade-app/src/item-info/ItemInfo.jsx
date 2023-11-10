import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ItemsContext } from "../ItemContext";
import { UserContext, getAccessToken } from "../UserContext";
import "./ItemInfo.css";
import ItemForm from "../item-form/ItemForm";
import Dialog from "../dialog/Dialog";
import ItemDetails from "../HandMade/item-details/ItemDetails";

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
            {bearerToken ? (
                <>
                    <main>
                        <div className="formTitle">
                            <h3>Update or delete item</h3>
                        </div>
                        <ItemDetails></ItemDetails>
                    </main>
                </>
            ) : (
                <>
                    <div className="item_img">
                        <img src={item?.image} alt="" className="item_img" />
                    </div>
                    <div className="item_details">
                        <div className="wallet__name">
                            <p className="wallet__name">{item?.name}</p>
                        </div>

                        <div className="wallet__price ">
                            <p className="wallet__price">
                                {item?.price} &pound;
                            </p>
                        </div>
                        <div>
                            <p>
                                Color:<span>{item?.colour}</span>
                            </p>
                        </div>
                        <div className="details">
                            <h5 className="title5">Detailed Description</h5>
                            <button onClick={toggleText1}>{buttonText1}</button>
                            {showText1 && <p>{item?.details}</p>}
                        </div>

                        <div className="details">
                            <h5 className="title5">Delivery & Returns </h5>
                            <button onClick={toggleText2}>{buttonText2}</button>
                            {showText2 && (
                                <p>
                                    UK shipping is free over £150 and always
                                    tracked. UK returns are free of charge via
                                    Collect.
                                </p>
                            )}
                        </div>
                    </div>
                </>
            )}
        </article>
    );
}
