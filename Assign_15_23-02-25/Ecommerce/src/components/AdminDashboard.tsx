import { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { GlobalContext } from "../context/GlobalContext";
import { addProduct, updateProduct } from "../api/products"; // Import update API
import "../styles/AdminDashboard.css";
import { IProducts } from "../types/types";

const AdminDashboard = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [newProduct, setNewProduct] = useState({ title: "", price: "", image: "" });
  const [editingProduct, setEditingProduct] = useState<IProducts | null>(null);

  const addMutation = useMutation({
    mutationFn: addProduct,
    onError: (error) => alert("Error adding product: " + error.message),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, product }: { id: number; product: IProducts }) =>
      updateProduct(id, product),
    onError: (error) => alert("Error updating product: " + error.message),
  });

  const handleAddProduct = () => {
    if (!newProduct.title || !newProduct.price || !newProduct.image) {
      alert("Please fill all fields!");
      return;
    }

    const newProductData = {
      id: state.products.length + 1,
      title: newProduct.title,
      price: parseFloat(newProduct.price),
      image: newProduct.image,
      description: "New product added",
      category: "custom",
    };

    addMutation.mutate(newProductData);
    setNewProduct({ title: "", price: "", image: "" });
  };

  const handleEditClick = (product: IProducts) => {
    setEditingProduct(product); 
  };
  

  const handleUpdateProduct = () => {
    if (!editingProduct) return; // Ensure editingProduct is not null
  
    updateMutation.mutate({
      id: editingProduct.id,
      product: editingProduct,
    });
  
    setEditingProduct(null); // Reset after update
  };

  const handleDeleteProduct = (id: number) => {
    dispatch({
      type: "SET_PRODUCTS",
      value: state.products.filter((product) => product.id !== id),
    });
  };

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>

      {/* Add Product Form */}
      <div className="add-product-form">
        <h1>Add Product</h1>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.title}
          onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      {/* Edit Product Form */}
      {editingProduct && (
        <div className="edit-product-form">
          <h1>Edit Product- {editingProduct?.id}</h1>
          <input
            type="text"
            placeholder="Product Name"
            value={editingProduct?.title || ""}
            onChange={(e) => 
              setEditingProduct((prev) => prev ? { ...prev, title: e.target.value } : prev)
            }
/>

              <input
                type="number"
                placeholder="Price"
                value={editingProduct?.price || ""}
                onChange={(e) => 
                  setEditingProduct((prev) => prev ? { ...prev, price: parseFloat(e.target.value) || 0 } : prev)
                }
              />


              <input
                type="text"
                placeholder="Image URL"
                value={editingProduct?.image || ""}
                onChange={(e) => 
                  setEditingProduct((prev) => prev ? { ...prev, image: e.target.value } : prev)
                }
              />

          <button onClick={handleUpdateProduct}>Update Product</button>
          <button onClick={() => setEditingProduct(null)}>Cancel</button>
        </div>
      )}

      {/* Product List */}
      <div className="product-list">
        {state.products.map((product) => (
          <div key={product.id} className="product-item">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <button className="edit-btn" onClick={() => handleEditClick(product)}>Edit</button>
            <button className="delete-btn" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
