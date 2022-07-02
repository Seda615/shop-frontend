import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice'
import orderReducer from "../features/orderedList/orderedListSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    user: authReducer,
    cart: cartReducer,
    orders: orderReducer
  },
});
