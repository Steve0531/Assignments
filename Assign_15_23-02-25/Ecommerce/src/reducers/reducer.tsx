import { IState, Action } from "../types/types";

const reducer = (state: IState, action: Action): IState => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.value };

      case "ADD_TO_CART":
        alert("Item Added to cart");
        const existingItem = state.cart.find((item) => item.id === action.value.id);
        if (existingItem) {
          return {
            ...state,
            cart: state.cart.map((item) =>
              item.id === action.value.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
          };
        } else {
          return { ...state, cart: [...state.cart, { ...action.value, quantity: 1 }] };
        }

    case "REMOVE_FROM_CART":
      return { ...state, cart: state.cart.filter((item) => item.id !== action.value) };

    case "INCREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.value ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };

    case "DECREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.id === action.value ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0), 
      };

    case "LOGOUT":
      return { ...state, user: null };

    case "LOGIN":
        return { ...state, user: action.value };

    case "CLEAR_CART": 
        return { ...state, cart: [] };
      

    default:
      return state;
  }
};

export default reducer;
