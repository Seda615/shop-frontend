import {register} from "../../../features/auth/authSlice";
import {useDispatch, useSelector} from "react-redux";
import React, {useState, useEffect} from "react";
import {Button, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {registerErrorSelector, isRegisteredSelector} from "../../../features/selectors";
import "./style.css"

const SignUp = () => {

    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const registered = useSelector(isRegisteredSelector);
    const registerError = useSelector(registerErrorSelector);

    useEffect(() => {
        if (registered === true) {
            navigate('../login')
        }
    }, [registered])

    const changeUser = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    return (
        <div className="signUp">
            <p>SIGN UP</p>
            {registerError?.message &&
                <div>{registerError.message}</div>
            }
            <TextField
                value={user.firstname}
                name={"firstname"}
                onChange={(e) => changeUser(e)}
                label="Firstname"
            />
            {registerError?.firstname &&
                <div>{registerError.firstname}</div>
            }
            <TextField
                value={user.lastname}
                name={"lastname"}
                onChange={(e) => changeUser(e)}
                label="Lastname"
            />
            {registerError?.lastname &&
                <div>{registerError.lastname}</div>
            }
            <TextField
                value={user.email}
                name={"email"}
                onChange={(e) => changeUser(e)}
                label="Email"
            />
            {registerError?.email &&
                <div>{registerError.email}</div>
            }
            <TextField
                value={user.password}
                name={"password"}
                onChange={(e) => changeUser(e)}
                label="Password"
            />
            {registerError?.password &&
                <div>{registerError.password}</div>
            }
            <TextField
                value={user.confirmPassword}
                name={"confirmPassword"}
                onChange={(e) => changeUser(e)}
                label="Confirm password"
            />
            <Button onClick={() => dispatch(register(user))} variant="contained" color={"primary"}>Sign Up</Button>

        </div>
    )
}

export default  SignUp