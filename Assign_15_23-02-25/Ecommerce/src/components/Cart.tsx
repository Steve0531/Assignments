import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import "../styles/Cart.css";

const Cart = () => {
  const { state, dispatch } = useContext(GlobalContext);

  const removeFromCart = (id: number) => {
    dispatch({ type: "REMOVE_FROM_CART", value: id });
  };

  const increaseQuantity = (id: number) => {
    dispatch({ type: "INCREASE_QUANTITY", value: id });
  };

  const decreaseQuantity = (id: number) => {
    dispatch({ type: "DECREASE_QUANTITY", value: id });
  };

  const getTotalPrice = () => {
    return state.cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleCheckout=()=>{
    dispatch({type:"CLEAR_CART"});
    alert("Your cart is processed");
    
     
  }

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {state.cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {state.cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} />
                <div className="cart-details">
                  <h3>{item.title}</h3>
                  <p>${item.price}</p>
                  <div className="quantity-controls">
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <p>{item.quantity}</p>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2 style={{color:"white"}}>Total: ${getTotalPrice()}</h2>
            <button className="checkout-btn" onClick={handleCheckout}>Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
