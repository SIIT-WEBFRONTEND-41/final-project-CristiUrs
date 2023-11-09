import CartIcon from "../Icons/CartIcon";
import HeartIcon from "../Icons/HeartIcon";

import SearchIcon from "../Icons/SearchIcon";
import "./Wallet.css";

import { useContext, useEffect, useState } from "react";

import { Item } from "./Item";
import { Link, useNavigate } from "react-router-dom";
import { ItemsContext } from "../ItemContext";
import { UserContext, getAccessToken } from "../UserContext";
import { CartContext } from "../CartContext";

export default function Wallet() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState();
    const [error, setError] = useState(null);
    const { wallets, setWallets } = useContext(ItemsContext);
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const { cart, setCart } = useContext(CartContext);

    const addToCart = (product) => {
        setCart([...cart, product]);
    };
    useEffect(() => {}, [cart]);

    function bookmark(product, wishlist) {
        product.wishlist = !wishlist;
        const productId = product.id;

        fetch(`http://localhost:3004/products/${productId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        });
        setWallets(structuredClone(wallets));
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
            <section className="mr-px">
                There has been a problem loading our products. Try again later.
            </section>
        );
    }

    return (
        <main className="home">
            <header>
                <nav className="navBar2">
                    <div className="info">
                        <Link to="/accessories">
                            <span>Accessories</span>
                        </Link>
                        <Link to="/bag">
                            <span>Bags</span>
                        </Link>
                        <Link to="/cardHolder">
                            <span>Cards Holder</span>
                        </Link>
                        <Link to="/wallet">
                            <span>Wallets</span>
                        </Link>
                    </div>
                    <div className="search">
                        <input
                            className="input1"
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
                        <span>
                            <Link to="/cart">
                                <span className="svg_cart">
                                    <CartIcon />
                                    <span className="quantity">
                                        {cart?.length}
                                    </span>
                                </span>
                            </Link>
                        </span>
                    </div>
                </nav>
            </header>
            {user?.user?.firstName && (
                <h1 className="userLogin">Welcome, {user?.user?.firstName}!</h1>
            )}
            <section className="wallet-container">
                {wallets.map((product) => (
                    <Item
                        key={product.id}
                        product={product}
                        bookmark={bookmark}
                        addToCart={addToCart}
                    ></Item>
                ))}
            </section>
        </main>
    );
}
