import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Dialog from "../../dialog/Dialog";
import ItemForm from "../../item-form/ItemForm";
import "./ItemDetails.css";
import { ItemsContext } from "../../ItemContext";
import { UserContext, getAccessToken } from "../../UserContext";

export default function ItemDetails() {
    let { id } = useParams();
    const [item, setItem] = useState(null);
    const [showDialog, setShowDialog] = useState(false);
    const { wallets } = useContext(ItemsContext);
    const { user } = useContext(UserContext);

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

    function onSubmit(updatedItem) {
        fetch(`http://localhost:3004/products/${id}`, {
            method: "PUT",
            body: JSON.stringify(updatedItem),
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${bearerToken}`,
            },
        })
            .then((response) => response.json())
            .then((dataFromServer) => setItem(dataFromServer));
    }

    function showDeleteItem() {
        setShowDialog(true);
    }

    function deleteItem() {
        fetch(`http://localhost:3004/products/${id}`, {
            method: "DELETE",
            Authorization: `Bearer ${bearerToken}`,
        }).then(() => navigate("/"));
    }

    function hideDialog() {
        setShowDialog(false);
    }

    return (
        <section className="section">
            <article className="wallet">
                <div className="wallet__card">
                    <div className="wallet_photo">
                        <img src={item?.image} alt="" className="wallet_img" />
                    </div>
                    <ul className="lista">
                        <li>{item?.name}</li>
                        <li>Colour:{item?.colour}</li>
                        <li>{item?.price}&pound;</li>
                    </ul>
                </div>
            </article>
            <div>
                <ItemForm onSubmit={onSubmit} item={item}></ItemForm>

                <button className="deleteBtn" onClick={showDeleteItem}>
                    Delete
                </button>
            </div>
            {showDialog && (
                <Dialog
                    className="dialogBox"
                    yesCb={deleteItem}
                    noCb={hideDialog}
                    name="Are you sure you want to remove the item?"
                />
            )}
        </section>
    );
}
