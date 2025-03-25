import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

// Configure Redux store with cart reducer
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// Define types for the Redux state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;