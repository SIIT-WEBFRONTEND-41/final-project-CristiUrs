import { Link } from "react-router-dom";

export default function Navigation() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Products</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/create-item">Create Item</Link>
                </li>
            </ul>
        </nav>
    );
}
