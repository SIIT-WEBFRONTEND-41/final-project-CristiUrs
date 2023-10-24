import "./App.css";
import Wallet from "./HandMade/Wallet";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Navigation from "./Navigation";
import ItemDetails from "./HandMade/item-details/Item-details";
import CreateItem from "./create-item/Create-item";
import React, { useState } from "react";
import ItemContextProvider from "./ItemContext";

function App() {
    return (
        <ItemContextProvider>
            <Router>
                <Navigation />

                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <Wallet></Wallet>
                            </>
                        }
                    ></Route>
                    <Route
                        path="products/:id"
                        element={
                            <>
                                <ItemDetails></ItemDetails>
                            </>
                        }
                    ></Route>
                    <Route
                        path="/about"
                        element={
                            <>
                                <div>About</div>
                            </>
                        }
                    ></Route>
                    <Route
                        path="/shop"
                        element={
                            <>
                                <div>Shop</div>
                            </>
                        }
                    ></Route>
                    <Route
                        path="/wallet"
                        element={
                            <>
                                <div>Wallet</div>
                            </>
                        }
                    ></Route>
                    <Route
                        path="/bag"
                        element={
                            <>
                                <div>Bag</div>
                            </>
                        }
                    ></Route>
                    <Route
                        path="/pouch"
                        element={
                            <>
                                <div>Pouch</div>
                            </>
                        }
                    ></Route>
                    <Route
                        path="/create-item"
                        element={
                            <>
                                <CreateItem></CreateItem>
                            </>
                        }
                    ></Route>
                    <Route
                        path="*"
                        element={<div>Page not found 404</div>}
                    ></Route>
                </Routes>
            </Router>
        </ItemContextProvider>
    );
}

export default App;
