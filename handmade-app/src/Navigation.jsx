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
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/create-item">Create Item</Link>
                </li>
                {!user?.user ? (
                    <>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                        <li>
                            <Link to="/login">Log in</Link>
                        </li>
                    </>
                ) : (
                    <li>
                        <span onClick={logout}>Logout</span>
                    </li>
                )}
            </ul>
        </nav>
    );
}
