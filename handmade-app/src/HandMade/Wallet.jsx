import CartIcon from "../Icons/CartIcon";
import HeartIcon from "../Icons/HeartIcon";
// import HeartIcon from "../Icons/HeartIcon";
import SearchIcon from "../Icons/SearchIcon";
import "./Wallet.css";
// import { WalletItem } from "./Models.js";
import { useEffect, useState } from "react";
// import { products } from "../HandMade/data";
import { Item } from "./Item";
import { Link } from "react-router-dom";

export default function Wallet() {
    const [products, setProducts] = useState([]);
    const [wallets, setWallets] = useState(products);
    const [searchTerm, setSearchTerm] = useState();
    const [error, setError] = useState(null);

    function bookmark(product, wishlist) {
        product.wishlist = !wishlist;
        setWallets(structuredClone(wallets));
        console.log(products.wishlist);
    }
    console.log(searchTerm);

    useEffect(() => {
        setError(null);
        fetch("http://localhost:3004/products")
            .then((response) => response.json())
            .then((data) => {
                setWallets(data);
                setProducts(data);
            })
            .catch((err) => setError(err));
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const filteredList = products.filter((product) => {
                return product.name.toLowerCase().includes(searchTerm);
            });

            setWallets(filteredList);
        } else {
            setWallets(products);
        }
    }, [searchTerm]);

    if (error) {
        return (
            <section>
                There has been a problem loading our movies. Try again later.
            </section>
        );
    }

    return (
        <main>
            <header>
                <div className="news">
                    <p>Free Shipping over £150</p>
                </div>
                <nav className="navBar">
                    <div className="logoName">
                        <Link to="/">
                            <h1>Lion LeatherCraft</h1>
                        </Link>
                    </div>
                    <div>
                        <Link to="/shop">
                            <span>Shop</span>
                        </Link>
                        <Link to="/wallet">
                            <span>Wallet</span>
                        </Link>
                        <Link to="/bag">
                            <span>Bag</span>
                        </Link>
                        <Link to="pouch">
                            <span>Pouch</span>
                        </Link>
                        <Link to="holder">
                            <span>Card Holder</span>
                        </Link>

                        <Link to="/about">
                            <span>About Us</span>
                        </Link>
                    </div>
                    <div>
                        <SearchIcon></SearchIcon>
                        <input
                            placeholder="Search for something"
                            onKeyUp={(event) =>
                                setSearchTerm(
                                    event.target.value.toLowerCase().trim()
                                )
                            }
                        />
                        <HeartIcon></HeartIcon>
                        <CartIcon></CartIcon>
                    </div>
                </nav>
            </header>
            <section className="wallet-container">
                {wallets.map((product) => (
                    <Item
                        key={product.id}
                        product={product}
                        bookmark={bookmark}
                    ></Item>
                ))}
            </section>
        </main>
    );
}
