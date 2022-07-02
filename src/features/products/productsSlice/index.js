import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    products: [],
    pages: "",
    error: null,
    status: 'idle'
};

export const productsAsync = createAsyncThunk('products/fetchProducts',
    async ({page, limit, name, from, to}) => {
        const response = await fetch(
            `http://localhost:3001/api/products/?page=${page}&limit=${limit}&name=${name}&price_gt=${from}&price_lt=${to}`
        );

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
                state.products = action.payload.products;
                state.status = "succeeded";
                state.pages = action.payload.pages;
            })
            .addCase(productsAsync.rejected, (state, action) => {
                state.products = 'failed';
                state.error = action.error.message
            })

    }
})

export default productsSlice.reducer;


