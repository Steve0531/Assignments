export interface IProducts {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

export interface ICartItem extends IProducts {
    quantity: number;
}
export interface IUser {
    username: string;
    role: string;
  }

export interface IState {
    products: IProducts[];
    cart: ICartItem[];
    user: IUser | null;
}



export type Action =
    | { type: "SET_PRODUCTS"; value: IProducts[] }
    | { type: "ADD_TO_CART"; value: ICartItem }
    | { type: "REMOVE_FROM_CART"; value: number }
    | { type: "INCREASE_QUANTITY"; value: number }
    | { type: "DECREASE_QUANTITY"; value: number }
    | { type: "LOGIN"; value: { username: string; role: string } }
    | { type: "LOGOUT" }
    | {type: "CLEAR_CART"}; 
