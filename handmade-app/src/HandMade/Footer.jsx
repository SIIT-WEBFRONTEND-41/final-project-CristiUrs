import "./Footer.css";
import logo from "../Image/logo.jpg";
import InstagramIcon from "../Icons/InstagramIcon";
import FacebookIcon from "../Icons/FacebookIcon";
import YoutubeIcon from "../Icons/Youtube";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-brand footer-up">
                <div className="brand">
                    <img src={logo} alt="Logo" className="logo" />
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
                        <ul className="social">
                            <li>
                                <a
                                    href="https://www.facebook.com/lionleathercraftuk"
                                    target="_blank"
                                >
                                    <FacebookIcon></FacebookIcon>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.instagram.com/lionleathercraftuk/"
                                    target="_blank"
                                >
                                    <InstagramIcon></InstagramIcon>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.youtube.com/@LeathrCrafts"
                                    target="_blank"
                                >
                                    <YoutubeIcon></YoutubeIcon>
                                </a>
                            </li>
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
