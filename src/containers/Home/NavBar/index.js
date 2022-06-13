import {Link, Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "@mui/material";
import {logOut} from "../../../features/auth/userSlice";
import React from "react";
import "./style.css";
import {isLoggedInSelector} from "../../../features/selectors";

const NavBar = () => {

    const isLoggedIn = useSelector(isLoggedInSelector);
    const dispatch = useDispatch();

    const signOut = () => {
        localStorage.removeItem('user');
        dispatch(logOut());
    }

    return (
        <div>
            <div className="head">
                <nav className="container nav_bar">
                    <h1><Link to="/">Online Shop</Link></h1>
                    {isLoggedIn ?
                        <div>
                            <Button><Link to="/cart">Cart</Link></Button>
                            <Button onClick={signOut}>LogOut</Button>
                        </div> :
                        <div>
                            <Button><Link to="/login">Sign In</Link></Button>
                            <Button><Link to="/register">Sign Up</Link></Button>
                        </div>
                    }
                </nav>
            </div>
            <Outlet />
        </div>
    )
}

export default NavBar