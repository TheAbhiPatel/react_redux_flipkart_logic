import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../interfaces";

interface ICartItem extends IProduct {
  quantity: number;
}

const initialState: ICartItem[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem: (state, action: PayloadAction<IProduct>) => {
      const payload = action.payload;
      const itemIndex = state.findIndex((item) => item.id === payload.id);

      if (itemIndex !== -1) {
        const cartItem = state.find((item) => item.id === payload.id);
        if (cartItem) {
          cartItem.quantity++;
        }
      } else {
        state.push({ ...payload, quantity: 1 });
      }
    },
    removeCartItem: (state, action: PayloadAction<number>) => {
      const payload = action.payload;
      const itemIndex = state.findIndex((item) => item.id === payload);
      if (itemIndex !== -1) state.splice(itemIndex, 1);
    },

    incQty: (state, action: PayloadAction<number>) => {
      const payload = action.payload;
      const item = state.find((item) => item.id === payload);
      if (item) item.quantity++;
    },
    decQty: (state, action: PayloadAction<number>) => {
      const payload = action.payload;
      const item = state.find((item) => item.id === payload);
      if (item) {
        if (item.quantity === 1) return;
        item.quantity--;
      }
    },
  },
});

export const { addCartItem, removeCartItem, incQty, decQty } =
  cartSlice.actions;

export default cartSlice.reducer;
