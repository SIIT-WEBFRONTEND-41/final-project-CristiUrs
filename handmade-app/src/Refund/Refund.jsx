import "./Refund.css";

export default function Refund() {
    return (
        <div className="about">
            <div className="about_title">
                <h1>Refund Policy</h1>
            </div>

            <div className="about_info">
                <p>
                    We have a 30-day return policy, which means you have 30 days
                    after receiving your item to request a return or exchange.
                    Packages must be received or postmarked within a 30-day
                    window of receipt. The original shipping fee is
                    non-refundable except in case of a shipping error or
                    manufacturing defect.
                </p>
                <p>
                    {" "}
                    Returns should ONLY be sent to the address provided in the
                    return authorization. Returns that do not follow this
                    process may result in longer than normal processing time or
                    a decline.
                </p>
                <p>
                    Please inspect your order upon receipt and contact us
                    immediately if the item is defective or damaged or if you
                    received the wrong item so we can evaluate the issue and
                    correct any errors. A return label will be provided.
                </p>
                <p>
                    Refunds can only be processed within a 30-day window of the
                    original purchase. Please remember it may take several
                    business days for the refund to be reflected on your credit
                    card or banking statement.
                </p>
            </div>
        </div>
    );
}
