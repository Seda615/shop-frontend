import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    products: [],
    error: null,
    status: 'idle'
};

export const productsAsync = createAsyncThunk('products/fetchProducts',
    async () => {
        const response = await fetch("http://localhost:3001");
        return response.json();
    }
);

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(productsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(productsAsync.fulfilled, (state, action) => {
                state.products = action.payload;
                state.status = "succeeded";
            })
            .addCase(productsAsync.rejected, (state, action) => {
                state.products = 'failed';
                state.error = action.error.message
            })

    }
})

export default productsSlice.reducer;


