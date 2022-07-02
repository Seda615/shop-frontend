/* user selectors */
export const isLoggedInSelector = state => state.user.isLoggedIn;
export const loginErrorSelector = state => state.user.loginError;
export const isRegisteredSelector = state => state.user.isRegistered;
export const registerErrorSelector = state => state.user.registerError;
export const tokenSelector = state => state.user.token;

/* products selector*/
export const pagesSelector = state => state.products.pages;
export const cartItemsSelector = state => state.cart.cartItems;

