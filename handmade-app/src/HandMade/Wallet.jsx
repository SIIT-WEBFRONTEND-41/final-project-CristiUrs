import CartIcon from "../Icons/CartIcon";
import HeartIcon from "../Icons/HeartIcon";

import SearchIcon from "../Icons/SearchIcon";
import "./Wallet.css";

import { useContext, useEffect, useState } from "react";

import { Item } from "./Item";
import { Link, useNavigate } from "react-router-dom";
import { ItemsContext } from "../ItemContext";
import { UserContext, getAccessToken } from "../UserContext";

export default function Wallet() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState();
    const [error, setError] = useState(null);
    const { wallets, setWallets } = useContext(ItemsContext);
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    function bookmark(product, wishlist) {
        product.wishlist = !wishlist;
        setWallets(structuredClone(wallets));
        console.log(products.wishlist);
    }

    useEffect(() => {
        setError(null);

        const bearerToken = user?.accessToken || getAccessToken();

        fetch("http://localhost:3004/products", {
            headers: {
                Authorization: `Bearer ${bearerToken}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }

                if (response.status === 401) {
                    navigate("/login");
                }

                throw new Error(response);
            })
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
                    <div className="info">
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
                        <Link to="/wishlist">
                            <HeartIcon></HeartIcon>
                        </Link>

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
