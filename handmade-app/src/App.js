import "./App.css";
import Wallet from "./HandMade/Wallet";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Navigation from "./Navigation";
import ItemDetails from "./HandMade/item-details/Item-details";
import CreateItem from "./create-item/Create-item";

// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: (
//             <>
//                 <Navigation></Navigation>
//                 <Wallet></Wallet>
//             </>
//         ),
//     },
//     {
//         path: "products/:id",
//         element: (
//             <>
//                 <Navigation></Navigation>
//                 <ItemDetails></ItemDetails>
//             </>
//         ),
//     },
//     {
//         path: "/about",
//         element: (
//             <>
//                 <Navigation></Navigation>
//                 <div>About</div>
//             </>
//         ),
//     },
//     {
//         path: "/shop",
//         element: (
//             <>
//                 <Navigation></Navigation>
//                 <div>Shop</div>
//             </>
//         ),
//     },
//     {
//         path: "/wallet",
//         element: (
//             <>
//                 <Navigation></Navigation>
//                 <div>Wallet</div>
//             </>
//         ),
//     },
//     {
//         path: "/bag",
//         element: (
//             <>
//                 <Navigation></Navigation>
//                 <div>Bag</div>
//             </>
//         ),
//     },
//     {
//         path: "/pouch",
//         element: (
//             <>
//                 <Navigation></Navigation>

//                 <div>Pouch</div>
//             </>
//         ),
//     },
//     {
//         path: "create-item",
//         element: (
//             <>
//                 <Navigation></Navigation>
//                 <CreateItem></CreateItem>
//             </>
//         ),
//     },
// ]);

function App() {
    return (
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
            </Routes>
        </Router>

        // <div className="App">
        //     <div>
        //         <Wallet />
        //     </div>
        // </div>
    );
}

export default App;
