import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ItemForm from "../item-form/ItemForm";
import { UserContext } from "../UserContext";
import "./Create-item.css";
import { ItemsContext } from "../ItemContext";

export default function CreateItem() {
    const [success, setSuccess] = useState(false);
    const { user } = useContext(UserContext);
    const { item, set } = useContext(ItemsContext);
    const { wallets, setWallets } = useContext(ItemsContext);

    const navigate = useNavigate();

    function submit(updatedItem) {
        setSuccess(false);

        fetch("http://localhost:3004/products", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(updatedItem),
        }).then((response) => {
            setSuccess(response.ok);
        });
    }

    return (
        <section>
            <div className="message">
                <h1>Create a new item</h1>
            </div>
            {success && (
                <p className="message">
                    You have successfully created a new product.
                </p>
            )}
            <ItemForm onSubmit={submit}></ItemForm>
        </section>
    );
}
