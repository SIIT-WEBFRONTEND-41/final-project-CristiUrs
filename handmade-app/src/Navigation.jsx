import { Link, useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useContext } from "react";
import { UserContext } from "./UserContext";

export default function Navigation() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem("access_token");
        navigate("/login");
    }

    return (
        <nav className="navigation">
            <ul className="navBar">
                <li className="navbarItem">
                    <Link to="/">Home</Link>
                </li>
                <li className="navbarItem">
                    <Link to="/about">About</Link>
                </li>

                {!user?.user ? (
                    <>
                        <li className="navbarItem">
                            <Link to="/register">Register</Link>
                        </li>
                        <li className="navbarItem">
                            <Link to="/login">Log in</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="navbarItem">
                            <Link to="/create-item">Create Item</Link>
                        </li>
                        <li>
                            <Link to="/wishlist">Wishlist</Link>
                        </li>
                        <li className="navbarItem">
                            <span onClick={logout}>Logout</span>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}
