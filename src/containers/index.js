import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import SignUp from "./authentication/SignUp";
import SignIn from "./authentication/SignIn";
import Products from "./Home/Products";
import NavBar from "./Home/NavBar";
import Cart from "./Home/Cart";
import React from "react";
import {useSelector} from "react-redux";
import {isLoggedInSelector} from "../features/selectors";
import Order from "./Home/Order";

const Main = () => {

    const isLoggedIn = useSelector(isLoggedInSelector);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<NavBar />}>
                    <Route path="/" element={<Products />} />
                    <Route path="/cart" element={isLoggedIn ? <Cart /> : <Navigate to={"/"} replace/>} />
                    <Route path="/login" element={ <SignIn />} />
                    <Route path="/register" element={isLoggedIn ? <Navigate to={"/"} replace /> : <SignUp />} />
                    <Route path="/order" element={isLoggedIn ? <Order /> : <Navigate to={"/"} replace />} />
                    <Route path="/order" element={<Order />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Main