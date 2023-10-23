import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
} from "react-router-dom";
import Wallet from "./HandMade/Wallet";
import ItemDetails from "./HandMade/item-details/Item-details";
import Navigation from "./Navigation";
import CreateItem from "./create-item/Create-item";
import { WishList } from "./wishlist/Wishlist";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <>
                <Navigation></Navigation>
                <Wallet></Wallet>
            </>
        ),
    },
    {
        path: "products/:id",
        element: (
            <>
                <Navigation></Navigation>
                <ItemDetails></ItemDetails>
            </>
        ),
    },
    {
        path: "/about",
        element: (
            <>
                <Navigation></Navigation>
                <div>About</div>
            </>
        ),
    },
    {
        path: "/shop",
        element: (
            <>
                <Navigation></Navigation>
                <div>Shop</div>
            </>
        ),
    },
    {
        path: "/wallet",
        element: (
            <>
                <Navigation></Navigation>
                <div>Wallet</div>
            </>
        ),
    },
    {
        path: "/bag",
        element: (
            <>
                <Navigation></Navigation>
                <div>Bag</div>
            </>
        ),
    },
    {
        path: "/pouch",
        element: (
            <>
                <Navigation></Navigation>

                <div>Pouch</div>
            </>
        ),
    },
    {
        path: "create-item",
        element: (
            <>
                <Navigation></Navigation>
                <CreateItem></CreateItem>
            </>
        ),
    },
]);

createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        // <RouterProvider router={router} />
        //{" "}
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
