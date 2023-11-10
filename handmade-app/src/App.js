import "./App.css";
import Wallet from "./HandMade/Wallet";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Navigation from "./Navigation";

import CreateItem from "./create-item/Create-item";
import React, { useState } from "react";
import ItemContextProvider from "./ItemContext";
import Register from "./authentication/register/Register";
import Login from "./authentication/login/Login";
import UserContextProvider from "./UserContext";
import Wishlist from "./wishlist/Wishlist";
import Footer from "./HandMade/Footer";
import NavLogin from "./HandMade/NavLogin";
import Bag from "./Products/bag/bag";

import CardHolder from "./Products/cardHolder/CardHolder";
import About from "./about/About";
import { Item } from "./HandMade/Item";
import ItemInfo from "./item-info/ItemInfo";
import ShoppingCart from "./shopping-cart/ShoppingCart";
import CartContextProvider from "./CartContext";
import ItemDetails from "./HandMade/item-details/ItemDetails";
import MyProfile from "./authentication/myprofile/MyProfile";
import WalletFilter from "./Products/wallet/WalletFilter";
import Accessories from "./Products/Accessories/Accessories";
import Privacy from "./Privacy/Privacy";
import Refund from "./Refund/Refund";

function App() {
    return (
        <UserContextProvider>
            <ItemContextProvider>
                <CartContextProvider>
                    <Router>
                        <Navigation />

                        <Routes>
                            <Route path="/" element={<Wallet></Wallet>}></Route>
                            <Route
                                path="products/:id"
                                element={<ItemInfo></ItemInfo>}
                            ></Route>
                            <Route
                                path="users/:lastName"
                                element={<NavLogin></NavLogin>}
                            ></Route>
                            <Route
                                path="/about"
                                element={<About></About>}
                            ></Route>
                            <Route
                                path="/cardHolder"
                                element={<CardHolder></CardHolder>}
                            ></Route>
                            <Route
                                path="update/:id"
                                element={<ItemDetails></ItemDetails>}
                            ></Route>
                            <Route
                                path="/wallet"
                                element={<WalletFilter></WalletFilter>}
                            ></Route>
                            <Route path="/bag" element={<Bag></Bag>}></Route>
                            <Route
                                path="/accessories"
                                element={<Accessories></Accessories>}
                            ></Route>
                            <Route
                                path="/myprofile"
                                element={<MyProfile></MyProfile>}
                            ></Route>
                            <Route
                                path="/create-item"
                                element={<CreateItem></CreateItem>}
                            ></Route>
                            <Route
                                path="/register"
                                element={<Register></Register>}
                            ></Route>
                            <Route
                                path="/login"
                                element={<Login></Login>}
                            ></Route>
                            <Route
                                path="/wishlist"
                                element={<Wishlist></Wishlist>}
                            ></Route>
                            <Route
                                path="/cart"
                                element={<ShoppingCart></ShoppingCart>}
                            ></Route>
                            <Route
                                path="/privacy"
                                element={<Privacy></Privacy>}
                            ></Route>
                            <Route
                                path="/refund"
                                element={<Refund></Refund>}
                            ></Route>
                            <Route
                                path="*"
                                element={<div>Page not found 404</div>}
                            ></Route>
                        </Routes>
                        <Footer />
                    </Router>
                </CartContextProvider>
            </ItemContextProvider>
        </UserContextProvider>
    );
}

export default App;
