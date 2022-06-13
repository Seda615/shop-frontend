import {BrowserRouter, Routes, Route} from "react-router-dom";
import SignUp from "./authentication/SignUp";
import SignIn from "./authentication/SignIn";
import Products from "./Home/Products";
import NavBar from "./Home/NavBar";
import Cart from "./Home/Cart";
import React from "react";

// if isLoggedIn === true ? signIn, signUp navigate to products
// if isLoggedIn === false ? cart navigate to products

const Main = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<NavBar />}>
                    <Route path="/" element={<Products />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/login" element={<SignIn />} />
                    <Route path="/register" element={<SignUp />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Main