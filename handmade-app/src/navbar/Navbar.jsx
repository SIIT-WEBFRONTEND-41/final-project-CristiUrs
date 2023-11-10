import React, { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const MenuIcon = () => (
        <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M3 18h18v-2H3v2zM3 13h18v-2H3v2zM3 6v2h18V6H3z" />
        </svg>
    );

    const CloseIcon = () => (
        <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
    );

    return (
        <div className="">
            <div className={`navbar5 ${menuVisible ? "menu-visible" : ""}`}>
                <button className="toggle-btn" onClick={toggleMenu}>
                    {menuVisible ? <CloseIcon /> : <MenuIcon />}
                </button>
                {menuVisible && (
                    <div className="menu">
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
                        <span>Element 1</span>
                        <span>Element 2</span>
                        <span>Element 3</span>
                        <span>Element 4</span>
                    </div>
                )}
            </div>
        </div>
    );
}
