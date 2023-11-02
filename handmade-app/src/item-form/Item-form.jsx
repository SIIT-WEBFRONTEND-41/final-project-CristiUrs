export default function ItemForm(props) {
    const { onSubmit, item = {} } = props;

    function handleSubmit(event) {
        event.preventDefault();
        const { image, name, price, currency } = event.target;

        const updatedItem = {
            ...item,
            image: image?.value,
            name: name?.value,
            price: price?.value,
            currency: currency?.value,
        };
        onSubmit(updatedItem);
        event.target.reset();
    }

    return (
        <form onSubmit={handleSubmit} className="formItem">
            <div className="formTitle">
                <h3>Create Item</h3>
            </div>
            <fieldset className="mb-3">
                <label htmlFor="url">URL:</label>
                <input
                    id="url"
                    type="text"
                    name="image"
                    defaultValue={item?.image}
                />
            </fieldset>

            <fieldset className="mb-3">
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    defaultValue={item?.name}
                />
            </fieldset>

            <fieldset className="mb-3">
                <label htmlFor="price">Price</label>
                <input
                    id="price"
                    type="number"
                    name="price"
                    defaultValue={item?.price}
                />
            </fieldset>

            <fieldset className="mb-3">
                <label htmlFor="currency">Currency</label>
                <input
                    id="currency"
                    type="text"
                    name="currency"
                    defaultValue={item?.currency}
                />
            </fieldset>

            <button className="mb-3">Update</button>
        </form>
    );
}
