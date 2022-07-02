import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    totalPrice: 0,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const cartItems = [...state.cartItems];
            const i = cartItems.findIndex(cartItem => cartItem._id === action.payload._id);
            if (i === -1) {
                const price = action.payload.price;
                state.cartItems.push({...action.payload, count: 1});
                state.totalPrice = state.totalPrice + +price.slice(0, price.length - 1)
            }
        },
        removeItemFromCart: (state, action) => {
            const index  = action.payload.index;
            const price = +action.payload.price.slice(0, action.payload.price.length - 1);
            state.totalPrice = state.totalPrice - (price * +action.payload.count);
            state.cartItems.splice(index, 1);
        },
        removeFromCart: (state, action) => {
            state.cartItems = [];
            state.totalPrice = 0;
        },
        increaseItemCount: (state, action) => {
            const index  = action.payload.index;
            const price = +action.payload.price.slice(0, action.payload.price.length - 1);
            state.totalPrice = state.totalPrice + price;
            state.cartItems[index].count = state.cartItems[index].count + 1;
        },
        decreaseItemCount: (state, action) => {
            const index  = action.payload.index;

            if (action.payload.count === 1) {
                const index  = action.payload.index;
                const price = +action.payload.price.slice(0, action.payload.price.length - 1);
                state.totalPrice = state.totalPrice - price;
                state.cartItems.splice(index, 1);
            } else {
                const price = +action.payload.price.slice(0, action.payload.price.length - 1);
                state.totalPrice = state.totalPrice - price;
                state.cartItems[index].count = state.cartItems[index].count - 1;
            }
        }
    }
})

export const {addToCart, removeFromCart, increaseItemCount, decreaseItemCount, removeItemFromCart} = cartSlice.actions;

export default cartSlice.reducer;


