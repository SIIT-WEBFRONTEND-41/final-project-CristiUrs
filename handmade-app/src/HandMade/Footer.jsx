import "./Footer.css";
import logo from "../Image/logo.jpg";
import InstagramIcon from "../Icons/InstagramIcon";
import FacebookIcon from "../Icons/FacebookIcon";
import YoutubeIcon from "../Icons/Youtube";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-brand footer-up">
                <div className="brand">
                    <div>
                        <img src={logo} alt="Logo" className="logo" />
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
                    <div className="copy ">
                        <span>
                            © 2023 <a href="/">Lion Leather Craft</a>
                        </span>
                    </div>
                </div>
                <div className="footer-info">
                    <h3>Information</h3>
                    <ul className="ul-info">
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="privacy">Privacy & Cookies</Link>
                        </li>
                        <li>
                            <Link to="/refund">Refund policy</Link>
                        </li>
                    </ul>
                </div>
                <div className="footer-shop">
                    <h3>Shop</h3>
                    <ul className="ul-shop">
                        <li>
                            <Link to="/accessories">Accessories</Link>
                        </li>
                        <li>
                            <Link to="bag">Bags</Link>
                        </li>
                        <li>
                            <Link to="cardHolder">Cards Holder</Link>
                        </li>

                        <li>
                            <Link to="wallet">Wallets</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
