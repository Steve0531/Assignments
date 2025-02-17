"use strict";
document.addEventListener("DOMContentLoaded", renderCart);
function renderCart() {
    const cartContainer = document.getElementById("cart-items");
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cartContainer.innerHTML = "";
    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }
    cart.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" width="50">
            <div class="cart-details">
                <h4>${item.title}</h4>
                <p>Price: $${item.price.toFixed(2)}</p>
                <div class="cart-controls">
                    <button onclick="updateQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${index}, 1)">+</button>
                    <button onclick="removeFromCart(${index})">Remove</button>
                </div>
            </div>
        `;
        cartContainer.appendChild(cartItem);
    });
    updateTotal();
}
function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (cart[index]) {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}
function updateTotal() {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalElement = document.getElementById("cart-total");
    totalElement.innerText = `Total: $${total.toFixed(2)}`;
}
