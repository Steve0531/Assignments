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