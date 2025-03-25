import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the structure for a cart item
interface CartItem {
  type: string;
  quantity: number;
}

// Define the structure for the cart state
interface CartState {
  items: CartItem[];
}

// Initial state with an empty cart
const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add item to cart or increase quantity if it already exists
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.type === action.payload.type);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },

    // Remove item from cart or decrease quantity by 1
    removeItem: (state, action: PayloadAction<string>) => {
      const itemIndex = state.items.findIndex(item => item.type === action.payload);
      if (itemIndex >= 0) {
        if (state.items[itemIndex].quantity > 1) {
          state.items[itemIndex].quantity -= 1;
        } else {
          state.items = state.items.filter(item => item.type !== action.payload);
        }
      }
    },    

    // Clear all items from the cart
    clearCart: (state) => {
      state.items = [];
    },
  },
});

// Export actions for use in components
export const { addItem, removeItem, clearCart } = cartSlice.actions;

// Export reducer to be used in the store
export default cartSlice.reducer;
