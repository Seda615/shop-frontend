import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    orders: [],
    error: null,
    status: 'idle'
};

export const orderPostAsync = createAsyncThunk('orders/postOrders',

async ({totalPrice, token, createdAt}) => {
    return fetch("http://localhost:3001/api/order", {
        method: "POST",
        body: JSON.stringify({subTotal: totalPrice, token, createdAt}),
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                throw new Error(JSON.stringify(response));
            }
        })
    }
);

export const orderGetAsync = createAsyncThunk('orders/getOrders',

    async (id) => {
        return fetch(`http://localhost:3001/api/order/${id}`, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(response => {
                if (response.order) {
                    return response.order;
                } else {
                    throw new Error(JSON.stringify(response));
                }
            })
    }
);

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(orderPostAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(orderPostAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
            })
            .addCase(orderPostAsync.rejected, (state, action) => {
                state.products = 'failed';
                state.error = action.error.message
            })
            .addCase(orderGetAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(orderGetAsync.fulfilled, (state, action) => {
                state.orders = action.payload;
                state.status = 'succeeded';
            })
            .addCase(orderGetAsync.rejected, (state, action) => {
                state.products = 'failed';
                state.error = action.error.message
            })

    }
})

export default ordersSlice.reducer;


