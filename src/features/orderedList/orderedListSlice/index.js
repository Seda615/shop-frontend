import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Service from "../../../core/service/index";
import {HOST} from "../../../core/constants"

const initialState = {
    orders: [],
    error: null,
    status: 'idle'
};

export const orderPostAsync = createAsyncThunk('orders/postOrders',

async ({totalPrice, token, createdAt}) => {
    const url = `${HOST}/order`;
    const body = JSON.stringify({subTotal: totalPrice, token, createdAt});

    return Service.request(url, "POST", body)
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
        const url = `${HOST}/order/${id}`;
        return Service.request(url, "GET")
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


