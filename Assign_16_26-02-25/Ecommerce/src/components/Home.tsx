import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts, fetchProductsByCategory } from "../api/products";
import "../styles/Home.css";
import { IProducts } from "../types/types";

const Home = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("");

  const fetchPosts = async()=>{
    let products;
      if (selectedCategory === "all") {
        products = await fetchAllProducts();
      } else {
        products = await fetchProductsByCategory(selectedCategory);
      }
      dispatch({ type: "SET_PRODUCTS", value: products });
      return products;
  }

  // const fetchPosts = async()=>{
  //   let products;
  //     if (selectedCategory === "all") {
  //       sortOrder? products= await sortProducts(sortOrder):products = await fetchAllProducts();
  //     } else {
  //       sortOrder?products= await sortProductByCategory(selectedCategory,sortOrder): products = await fetchProductsByCategory(selectedCategory);

  //         }  
      
  //     dispatch({ type: "SET_PRODUCTS", value: products });
  //     return products;
  // }

  const { isLoading: productsLoading, error: productsError } = useQuery<IProducts[]>({
    queryKey: ["products", selectedCategory], // Re-fetch when category changes
    queryFn: fetchPosts,
     
    refetchOnWindowFocus: false,
    retry:false,
  });


  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  
  const handleSort = (order: string) => {
    setSortOrder(order);
    const sortedProducts = [...state.products].sort((a, b) =>
      order === "asc" ? a.price - b.price : b.price - a.price
    );
    dispatch({ type: "SET_PRODUCTS", value: sortedProducts });
  };


  if (productsLoading) return <h1>Loading ....</h1>;
  if (productsError) return <h1>Error fetching products: {productsError.message}</h1>;

  return (
    <div className="container">
      <h1>Products</h1>

      
      <div className="controls">
        
        <select value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)}>
          <option value="all">All Categories</option>  
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
          
        </select>

    
        <div className="sort-container">
          <label>Sort By Price:</label>
          <select value={sortOrder} onChange={(e) => handleSort(e.target.value)}>
            <option value="">Select</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
      </div>

    
      <div className="product-grid">
        {state?.products?.length > 0 ? (
          state.products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.title} />
              <Link to={`/products/${product.id}`}><h3>{product.title}</h3></Link>

              <p>${product.price}</p>
              <button onClick={() => dispatch({ type: "ADD_TO_CART", value: { ...product, quantity: 1 } })}>
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
