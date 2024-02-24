import { createSlice } from '@reduxjs/toolkit';
import { Storage } from 'react-jhipster';
import { IProduct } from '../model/product.model';

const CART_KEY = 'jhi-cartKey';

interface CartState {
  items: ICartItem[];
}

export interface ICartItem {
  productId: number;
  quantity: number;
}

const getInitialState = () => {
  try {
    return JSON.parse(Storage.local.get(CART_KEY));
  } catch {
    return [];
  }
};

export const initialState: CartState = {
  items: getInitialState(),
};

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const items = computeAdd(state.items, action.payload);
      Storage.local.set(CART_KEY, JSON.stringify(items));
      state.items = items;
    },
    removeItem(state, action) {
      const items = computeRemove(state.items, action.payload);
      Storage.local.set(CART_KEY, JSON.stringify(items));
      state.items = items;
    },
    deleteItem(state, action) {
      const items = state.items.filter(i => i.productId !== action.payload);
      Storage.local.set(CART_KEY, JSON.stringify(items));
      state.items = items;
    },
    clearCart(state) {
      Storage.local.set(CART_KEY, JSON.stringify([]));
      state.items = [];
    },
  },
});

const computeAdd = (items: ICartItem[], product: IProduct): ICartItem[] => {
  const productId = product.id;
  const available = product.quantity;
  const index = items.findIndex(c => c.productId === productId);
  if (index < 0) {
    if (available > 0) {
      items.push({ productId, quantity: 1 });
    }
  } else {
    const quantity = available > items[index].quantity ? items[index].quantity + 1 : available;
    items[index] = { productId, quantity };
  }
  return items;
};

const computeRemove = (items: ICartItem[], product: IProduct): ICartItem[] => {
  const productId = product.id;
  const available = product.quantity;
  const index = items.findIndex(c => c.productId === productId);
  if (index >= 0) {
    const quantity = available >= items[index].quantity ? (items[index].quantity > 0 ? items[index].quantity - 1 : 0) : available;
    items[index] = { productId, quantity };
  }
  items = items.filter(i => i.quantity > 0);
  return items;
};

export const { addItem, removeItem, clearCart, deleteItem } = CartSlice.actions;

export default CartSlice.reducer;
