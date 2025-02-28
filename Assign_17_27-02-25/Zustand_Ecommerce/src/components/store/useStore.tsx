import { create } from "zustand";
import { ICartItem, IProducts } from "../types/types";

export interface ProductStore {
  products: IProducts[];
  cartItems: ICartItem[];
  setProducts: (products: IProducts[]) => void;
  addToCart: (product: IProducts) => void;
  removeFromCart: (productId: number) => void;
  updateCartQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  cartItems: [],

  setProducts: (products: IProducts[]) => set({ products }),

  addToCart: (product: IProducts) => {
    const { cartItems } = get();
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      set({
        cartItems: cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      set({
        cartItems: [...cartItems, { ...product, quantity: 1 }],
      });
    }
  },

  removeFromCart: (productId: number) => {
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== productId),
    }));
  },

  updateCartQuantity: (productId: number, quantity: number) => {
    if (quantity < 1) return; // Prevent negative quantities
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ),
    }));
  },

  clearCart: () => {
    set({ cartItems: [] });
  },
}));

export default useProductStore;
