import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "../api/products";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import "../styles/ProductDetails.css";

const ProductDetails = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const { id } = useParams(); 
  const productId = Number(id); 

  
  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProductById(productId),
    enabled: !!id, // Prevent API call if no ID
  });

  if (isLoading) return <h1>Loading Product...</h1>;
  if (error) return <h1>Error fetching product</h1>;

  return (
    <div className="product-details">
      <img src={product.image} alt={product.title} />
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <h3>Price: ${product.price}</h3>
      <button onClick={() => dispatch({ type: "ADD_TO_CART", value: { ...product, quantity: 1 } })}>Add to Cart</button>
    </div>
  );
};

export default ProductDetails;
