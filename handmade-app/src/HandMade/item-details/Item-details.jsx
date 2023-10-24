import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Dialog from "../../dialog/Dialog";
import ItemForm from "../../item-form/Item-form";
import "./Item-details.css";
import { ItemsContext } from "../../ItemContext";

export default function ItemDetails() {
    let { id } = useParams();
    const [item, setItem] = useState(null);
    const [showDialog, setShowDialog] = useState(false);
    const { wallets } = useContext(ItemsContext);

    const navigate = useNavigate();

    useEffect(() => {
        const selectedWallet = wallets.find(
            (storeItem) => storeItem.id === Number(id)
        );

        if (selectedWallet) {
            setItem(selectedWallet);
        } else {
            fetch(`http://localhost:3004/products/${id}`)
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
        }).then(() => navigate("/"));
    }

    function hideDialog() {
        setShowDialog(false);
    }

    return (
        <section>
            {showDialog && (
                <Dialog
                    yesCb={deleteItem}
                    noCb={hideDialog}
                    name="Are you sure you want to remove the item?"
                />
            )}
            <article className="wallet">
                <div className="wallet__card">
                    <div className="wallet_photo">
                        <img src={item?.image} alt="" />
                    </div>
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
                </div>
            </article>

            <ItemForm onSubmit={onSubmit} item={item}></ItemForm>
            <button className="deleteBtn" onClick={showDeleteItem}>
                Delete
            </button>
        </section>
    );
}
