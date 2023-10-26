import { useState } from "react";
import ItemForm from "../item-form/Item-form";
import { UserContext } from "../UserContext";

export default function CreateItem() {
    const [success, setSuccess] = useState(false);
    // const { user } = useContext(UserContext);
    // const bearerToken = user?.accessToken || getAccessToken();

    function submit(updatedItem) {
        setSuccess(false);

        fetch("http://localhost:3004/products", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                // Authorization: `Bearer ${bearerToken}`,
            },
            body: JSON.stringify(updatedItem),
        }).then((response) => {
            setSuccess(response.ok);
        });
    }

    return (
        <section>
            {success && <p>Operation has been succesful</p>}
            <ItemForm onSubmit={submit}></ItemForm>
        </section>
    );
}
