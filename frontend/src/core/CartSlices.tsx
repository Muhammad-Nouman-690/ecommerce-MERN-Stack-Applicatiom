// create slice here
import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";

export interface product {
  id: number;
  name: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  price: string;
  color: string;
  quantity: number;
}

export interface CounterState {
  value: number;
}

interface CartState {
  items: product[];     
}

const initialState: CartState = {
  items: [],
};
// slice 1
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<product>) => {
      const itemInCart = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (itemInCart) {
        // If the item is already in the cart, increase its quantity
        itemInCart.quantity += 1;
      } else {
        // Otherwise, add it to the cart with a quantity of 1
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItemFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions; // export b/c use in file globally

export const cartReducer = cartSlice.reducer; //export b/c use in store file
