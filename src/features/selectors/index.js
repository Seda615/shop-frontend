/* user selectors */
export const loginStatusSelector = state => state.user.loginStatus;
export const isLoggedInSelector = state => state.user.isLoggedIn;
export const loginErrorSelector = state => state.user.loginError;
export const registerStatusSelector = state => state.user.registerStatus;
export const isRegisteredSelector = state => state.user.isRegistered;
export const registerErrorSelector = state => state.user.registerError;
