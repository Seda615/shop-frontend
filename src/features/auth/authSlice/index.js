import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: localStorage.getItem('token') ? true : false,
    token: localStorage.getItem('token') || null,
    user_id: localStorage.getItem("id") || null,
    loginError: null,
    isRegistered: false,
    registerError: null,
};

export const login = createAsyncThunk("login/fetchLogin",
    async (user) => {
        return  await fetch("http://localhost:3001/api/login",
            {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then(res => res.json())
            .then(response => {
                if (response.token) {
                    return response;
                } else {
                    throw new Error(JSON.stringify(response));
                }
            })
    }
);

export const register = createAsyncThunk("register/fetchRegister",
    async (user) => {
        return fetch("http://localhost:3001/api/register", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(response => {
                if (response.token) {
                    return response;
                } else {
                    throw new Error(JSON.stringify(response));
                }
            })
    }
);

const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logOut: state => {
            state.isLoggedIn = false;
            state.loginStatus = "idle";
        }
    },
    extraReducers: (builder => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.user_id = action.payload.id;
                state.token = action.payload.token;
                state.isLoggedIn = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoggedIn = false;
                try {
                    state.loginError = JSON.parse(action.error.message);
                } catch (e) {
                    state.loginError = action.error.message;
                }
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isRegistered = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.isRegistered = false;
                try {
                    state.registerError = JSON.parse(action.error.message);
                } catch (e) {
                    state.registerError = action.error.message;
                }
            })
    })
})

export const {logOut} = authSlice.actions;

export default authSlice.reducer;