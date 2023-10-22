import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Dialog from "../../dialog/Dialog";
import ItemForm from "../../item-form/Item-form";

export default function ItemDetails() {
    let { id } = useParams();
    const [item, setItem] = useState(null);
    const [showDialog, setShowDialog] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3004/products/${id}`)
            .then((response) => response.json())
            .then((dataFromServer) => setItem(dataFromServer));
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
                    name="Are you sure you wantto remove the item?"
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
            <button onClick={showDeleteItem}>Delete</button>

            <ItemForm onSubmit={onSubmit} item={item}></ItemForm>
            {/* <form onSubmit={onSubmit}>
                <fieldset>
                    <label htmlFor="url">URL:</label>
                    <input
                        id="url"
                        type="text"
                        name="image"
                        defaultValue={item?.image}
                    />
                </fieldset>

                <fieldset>
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        defaultValue={item?.name}
                    />
                </fieldset>

                <fieldset>
                    <label htmlFor="price">Price</label>
                    <input
                        id="price"
                        type="number"
                        name="price"
                        defaultValue={item?.price}
                    />
                </fieldset>

                <fieldset>
                    <label htmlFor="currency">Currency</label>
                    <input
                        id="currency"
                        type="text"
                        name="currency"
                        defaultValue={item?.currency}
                    />
                </fieldset>

                <button>Update</button>
            </form> */}
        </section>
    );
}
