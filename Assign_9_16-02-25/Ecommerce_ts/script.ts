document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list") as HTMLElement;
    const categoryFilter = document.getElementById("category-filter") as HTMLSelectElement;
    const sortProducts = document.getElementById("sort-products") as HTMLSelectElement;
    const cartBadge = document.getElementById("cart-badge") as HTMLElement;

    interface Product {
        id: number;
        title: string;
        price: number;
        category: string;
        image: string;
    }

    interface CartItem {
        id: number;
        title: string;
        price: number;
        image: string;
        quantity: number;
    }

    let allProducts: Product[] = [];
    let cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

    function updateCartBadge(): void {
        if (cart.length > 0) {
            cartBadge.textContent = cart.length.toString();
            cartBadge.style.display = "flex";
        } else {
            cartBadge.style.display = "none";
        }
    }

    async function fetchProducts(): Promise<void> {
        try {
            const response = await fetch("https://fakestoreapi.com/products");
            allProducts = await response.json();
            displayProducts(allProducts);
            populateCategories();
            updateCartBadge();
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }

    function displayProducts(products: Product[]): void {
        productList.innerHTML = "";
        products.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${product.image}')">Add to Cart</button>
            `;
            productList.appendChild(productCard);
        });
    }

    function populateCategories(): void {
        const categories = [...new Set(allProducts.map(p => p.category))];
        categoryFilter.innerHTML = `<option value="all">All Categories</option>`;
        categories.forEach(category => {
            categoryFilter.innerHTML += `<option value="${category}">${category}</option>`;
        });
    }

    categoryFilter.addEventListener("change", () => {
        const selectedCategory = categoryFilter.value;
        const filteredProducts = selectedCategory === "all"
            ? allProducts
            : allProducts.filter(p => p.category === selectedCategory);
        displayProducts(filteredProducts);
    });

    sortProducts.addEventListener("change", () => {
        const sortValue = sortProducts.value;
        let sortedProducts = [...allProducts];

        if (sortValue === "price-asc") {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (sortValue === "price-desc") {
            sortedProducts.sort((a, b) => b.price - a.price);
        }

        displayProducts(sortedProducts);
    });

    function addToCart(id: number, title: string, price: number, image: string): void {
        let cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    
        console.log("Cart before adding:", cart);
    
        const existingProduct = cart.find(item => item.id === id);
    
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ id, title, price, image, quantity: 1 });
        }
    
        localStorage.setItem("cart", JSON.stringify(cart));
    
        alert("Item Added to cart");
    }
    
    (window as any).addToCart = addToCart;
    
    fetchProducts();
});
