import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card";
import useProductStore from "../store/useStore";
import { ICartItem } from "../types/types";

const Cart = () => {
  const cartStore = useProductStore();
  const { cartItems, products, removeFromCart, clearCart, updateCartQuantity } = cartStore;

  

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8"> 
    <h2 className="text-3xl font-bold text-center mb-6"> Shopping Cart</h2>

    {cartItems.length === 0 ? (
      <p className="text-center text-gray-400">Your cart is empty.</p>
    ) : (
      <div className="w-full space-y-6"> 
        {cartItems.map((item: ICartItem) => {
          const product = products.find((prod) => prod.id === item.id);
          return product ? (
            <Card
              key={product.id}
              className="flex flex-col md:flex-row items-center justify-between p-4 bg-gray-800 shadow-lg rounded-xl w-full"
            >
              <CardHeader className="flex flex-row items-center gap-4 w-full md:w-auto">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <CardTitle className="text-lg text-white">{product.title}</CardTitle>
              </CardHeader>

              <CardContent className="flex items-center gap-4">
                <Button
                  size="icon"
                  variant="outline"
                  className="border-gray-500"
                  onClick={() =>
                    item.quantity > 1
                      ? updateCartQuantity(item.id, item.quantity - 1)
                      : removeFromCart(item.id)
                  }
                >
                  <Minus className="w-5 h-5" />
                </Button>

                <span className="text-lg font-semibold text-white">{item.quantity}</span>

                <Button
                  size="icon"
                  variant="outline"
                  className="border-gray-500"
                  onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="w-5 h-5" />
                </Button>
              </CardContent>

              <CardFooter className="flex items-center gap-6">
                <p className="font-semibold text-lg text-white">${(product.price * item.quantity).toFixed(2)}</p>
                <Button
                  variant="destructive"
                  size="icon"
                  className="bg-red-500 hover:bg-red-600"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash className="w-5 h-5" />
                </Button>
              </CardFooter>
            </Card>
          ) : null;
        })}

        <div className="flex flex-col md:flex-row justify-between items-center mt-6 w-full">
          <p className="text-2xl font-bold">
            Total: <span className="text-green-400">${cartItems.reduce((total, item) => {
                const product = products.find((prod) => prod.id === item.id);
                return total + (product ? product.price * item.quantity : 0);
              }, 0).toFixed(2)}</span>
          </p>
          <Button variant="destructive" className="bg-red-600 hover:bg-red-700 mt-4 md:mt-0" onClick={clearCart}>
            Clear Cart
          </Button>
        </div>
      </div>
    )}
  </div>
  );
};

export default Cart;
