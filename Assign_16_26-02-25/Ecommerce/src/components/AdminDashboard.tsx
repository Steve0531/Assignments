import { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { GlobalContext } from "../context/GlobalContext";
import { addProduct, updateProduct } from "../api/products"; 
import "../styles/AdminDashboard.css";
import { IProducts } from "../types/types";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger,DialogFooter, DialogHeader, DialogPortal } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const AdminDashboard = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [newProduct, setNewProduct] = useState({ title: "", price: "", image: "" });
  const [editingProduct, setEditingProduct] = useState<IProducts | null>(null);
  const [addProducts, setAddProducts] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false)


  const addMutation = useMutation({
    mutationFn: addProduct,
    onError: (error) => alert("Error adding product: " + error.message),
    onSuccess: ()=>alert("Product added successfully"),
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
    setAddProducts(false);
    
  };

  const handleEditClick = (product: IProducts) => {
    setEditingProduct(product); 
    setOpen(true);
  };
  

  const handleUpdateProduct = () => {
    if (!editingProduct) return; 
  
    updateMutation.mutate({
      id: editingProduct.id,
      product: editingProduct,
    });
  
    setEditingProduct(null); 
    setOpen(false);
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
      <Button onClick={()=>setAddProducts(true)}>Add New Product</Button>
      {addProducts && (<div className="add-product-form">
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
        <Button onClick={handleAddProduct}>Add Product</Button> 
        <Button onClick={()=>setAddProducts(false)}>Cancle</Button>
        
      </div>
    )}

      {/* Product List */}
      <div className="product-list">
        {state.products.map((product) => (
          <div key={product.id} className="product-item">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <Dialog  open={open} onOpenChange={setOpen}>
               <DialogTrigger onClick={() => handleEditClick(product)}>Edit Post
               </DialogTrigger>
               <DialogPortal>
              <DialogContent className="sm:max-w-[600px]">
                   <DialogHeader>
                       <DialogTitle>Edit Post</DialogTitle>
                            <DialogDescription className="text-center text-xl font-bold"> Edit Post</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                     <div className="grid grid-cols-4 items-center gap-4">
                       <Label htmlFor="name" className="text-left text-black text-md font-bold" >
                                            Product Name :
                        </Label>
                            <Input id="name" type="text"
                              value={editingProduct?.title || ""}
                              onChange={(e) =>setEditingProduct((prev) => prev ? { ...prev, title: e.target.value } : prev)} 
                              className="col-span-3 text-black" />
                      
                       <Label htmlFor="price" className="text-left text-black text-md font-bold">
                                   Price
                         </Label>
                             <Input id="price" type="number"
                             value={editingProduct?.price || ""}
                             onChange={(e) =>setEditingProduct((prev) => prev ? { ...prev, price: parseFloat(e.target.value) || 0 } : prev)}
                             className="col-span-3 text-black" />

                        <Label htmlFor="image" className="text-left text-black text-md font-bold">
                                   Image URL :
                         </Label>
                             <Input id="image" type="text"
                             value={editingProduct?.image || ""}
                             onChange={(e) =>setEditingProduct((prev) => prev ? { ...prev, image: e.target.value } : prev)}
                             className="col-span-3 text-black" />
                    </div>
                   </div>
                   <DialogFooter>
                          <Button  onClick={()=>handleUpdateProduct()}>Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                  </DialogPortal>
            </Dialog>
            <Dialog>
               <DialogTrigger>Delete</DialogTrigger>
                   <DialogContent>
                      <DialogHeader>
                           <DialogTitle>Are you sure?</DialogTitle>
                            <DialogDescription className="font-bold text-xl">
                                   This action cannot be undone.      
                                   This will permanently delete the Post!!
                                     
                            </DialogDescription>
                       </DialogHeader>
                       <DialogFooter>
                             <Button onClick={() => handleDeleteProduct(product.id)}>Delete</Button>
                      </DialogFooter>
                    </DialogContent>
              </Dialog>



            
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
