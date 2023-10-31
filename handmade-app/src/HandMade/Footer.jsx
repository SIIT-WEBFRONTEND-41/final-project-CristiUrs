import "./Footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-brand footer-up">
                <div className="brand">
                    <img src="https://picsum.photos/50/50" alt="" />
                </div>
                <div className="footer-info">
                    <h3>Information</h3>
                    <ul className="ul-info">
                        <li>Contact Us</li>
                        <li>Customer Service</li>
                        <li>Terms & Conditions</li>
                        <li>Privacy & Cookies</li>
                    </ul>
                </div>
                <div className="footer-shop">
                    <h3>Shop</h3>
                    <ul className="ul-shop">
                        <li>Wallets</li>
                        <li>Pouches</li>
                        <li>Bags</li>
                        <li>Card Holder</li>
                    </ul>
                </div>
                <div className="news-later">
                    <div>
                        <p className="pNewsLater">
                            Join our mailing list and receive 10% off your first
                            order.
                        </p>
                    </div>
                    <div>
                        <input type="text" placeholder="Enter your email" />
                        <button>Sign Up</button>
                    </div>
                    <div>
                        <ul>
                            <li>Faceebook</li>
                            <li>Instagram</li>
                            <li>Twitter</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="footer-copy footer-up">
                <div className="copy ">
                    <span>Copyright</span>
                </div>
                <div className="terms ">
                    <span>Terms & Conditions</span>
                    <span>Privacy & Cookies</span>
                </div>
            </div>
        </footer>
    );
}
