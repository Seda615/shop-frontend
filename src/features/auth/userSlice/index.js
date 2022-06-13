import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    loginStatus: "idle",
    isLoggedIn: localStorage.getItem('user') ? true : null,
    loginError: null,
    registerStatus: "idle",
    isRegistered: false,
    registerError: null,
};

export const loginAsync = createAsyncThunk("login/fetchLogin",
    async (user) => {
        const response = await fetch("http://localhost:3001/api/login",
            {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then(res => res.json())

        return response;
    }
);

export const registerAsync = createAsyncThunk("register/fetchRegister",
    async (user) => {
        const response = await fetch("http://localhost:3001/api/register", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
            }
        })
            .then(res => res.json())

        return response
    }
);

const userSlice = createSlice({
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
            .addCase(loginAsync.pending, (state, action) => {
                state.loginStatus = "loading"
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                if (!action.payload.token) {
                    state.loginStatus = "failed";
                    state.loginError = action.payload;
                } else {
                    state.loginStatus = "succeeded";
                    state.isLoggedIn = true;
                }
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.loginStatus = "failed";
                state.loginError = action.error.message;
            })
            .addCase(registerAsync.pending, (state, action) => {
                state.registerStatus = "loading";
            })
            .addCase(registerAsync.fulfilled, (state, action) => {
                if (!action.payload.token) {
                    state.registerError = action.payload;
                    state.registerStatus = "failed";
                } else {
                    state.registerStatus = "succeeded";
                    state.isRegistered = true;
                }
            })
            .addCase(registerAsync.rejected, (state, action) => {
                state.registerStatus = "failed";
                state.registerError = action.error.message;
            })
    })
})

export const {logOut} = userSlice.actions;

export default userSlice.reducer;