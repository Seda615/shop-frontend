import {login} from "../../../features/auth/authSlice";
import {TextField, Button} from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {isLoggedInSelector, loginErrorSelector, tokenSelector} from "../../../features/selectors";
import "./style.css"

const SignIn = () => {

    const [user, setUser] = useState({email: "", password: ""});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loggedIn = useSelector(isLoggedInSelector);
    const loginError = useSelector(loginErrorSelector);
    const token = useSelector(tokenSelector);
    const id = useSelector(state => state.user.user_id);

    useEffect(() => {
        if (loggedIn) {
            console.log(loggedIn)
            localStorage.setItem("token", token);
            localStorage.setItem("id", id);
            navigate("../", { replace: true });
        }
    }, [loggedIn])

    return (
        <div className="signIn">
            <p>SIGN IN</p>
            <div>
                {loginError?.message &&
                    <div>{loginError.message}</div>
                }
            </div>
            <TextField
                value={user.email}
                label={"Email"}
                onChange={(e) => setUser({...user, email: e.target.value})}
            />
            <div>
                {loginError?.email &&
                    <div>{loginError?.email}</div>
                }
            </div>
            <TextField
                value={user.password}
                label={"password"}
                onChange={(e) => setUser({...user, password: e.target.value})}
            />
            <div>
                {loginError?.password &&
                <div>{loginError.password}</div>
                }
            </div>
            <Button onClick={() => dispatch(login(user))} variant="contained">Sign In</Button>
        </div>
    )
}

export default SignIn