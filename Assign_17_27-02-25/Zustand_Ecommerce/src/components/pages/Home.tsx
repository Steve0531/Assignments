import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts, fetchProductsByCategory } from "../api/Api";
import { IProducts } from "../types/types";
import useProductStore from "../store/useStore";
import { toast } from "sonner";
import{
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const fetchPosts = async () => {
    return selectedCategory === "all"
      ? await fetchAllProducts()
      : await fetchProductsByCategory(selectedCategory);
  };

  const {data: fetchedProducts,isError: error,isLoading} = useQuery<IProducts[]>({
    queryKey: ["products", selectedCategory],
    queryFn: fetchPosts,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const productstore = useProductStore();

  useEffect(() => {
    if (fetchedProducts) {
      productstore.setProducts(fetchedProducts);
    }
  }, [fetchedProducts]);

  const handleSort = (order: string) => {
    const sortedProducts = [...productstore.products].sort((a, b) =>
      order === "asc" ? a.price - b.price : b.price - a.price
    );
    productstore.setProducts(sortedProducts);
  };

  const handleDeleteProduct = (id: number) => {
    const products = productstore.products.filter((product) => product.id !== id);
    productstore.setProducts(products);
  };

  if (isLoading) return <h1 className="text-center text-xl font-semibold">Loading...</h1>;
  if (error) return <h1 className="text-center text-xl font-semibold text-red-600">Error fetching products: {error.message}</h1>;

  return (
    <div className=" mx-auto px-4 py-8 ">
      <h1 className="text-3xl font-bold text-center text-white mb-6">Products</h1>

      <div className="flex flex-wrap justify-center gap-6 mb-6">
        <DropdownMenu>
          <DropdownMenuTrigger className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
            Category
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 bg-white shadow-md rounded-lg">
            <DropdownMenuLabel className="px-3 py-2 font-semibold text-gray-700">Select Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setSelectedCategory("all")}>All Category</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedCategory("electronics")}>Electronics</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedCategory("jewelery")}>Jewelery</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedCategory("men's clothing")}>Men's Clothing</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedCategory("women's clothing")}>Women's Clothing</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
            Sort By Price
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40 bg-white shadow-md rounded-lg">
            <DropdownMenuItem onClick={() => handleSort("asc")}>Low to High</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSort("desc")}>High to Low</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {productstore.products ? (
          productstore.products.map((product) => (
            <Card key={product.id} className="rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              <CardHeader className="bg-gray-100 rounded-t-xl p-4">
                <CardTitle className="text-lg font-semibold text-gray-800 truncate">
                  {product.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center p-4">
                <img
                  className="h-48 w-full object-contain"
                  alt="productImageAlternateText"
                  src={product.image}
                />
                <div className="mt-4 flex flex-col gap-2 w-full">
                  <Button variant="default" className="w-full" asChild>
                    <Link to={`/product/${product.id}`}>Show Product</Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to={`/edit/${product.id}`}>Edit Product</Link>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="w-full">Delete Product</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-black">Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription className="text-md font-bold">
                          This action cannot be undone. This will delete the product.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="text-black">Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-white bg-red-600 hover:bg-red-700"
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
              <CardFooter className="p-4 border-t border-gray-200 text-lg font-medium text-gray-900 flex justify-between items-center">
                 <p>${product.price}</p>  
                 <Button onClick={() => {productstore.addToCart(product);
                        toast.success(`${product.title} added to cart!`);
                     }}>Add to Cart
                 </Button>
               </CardFooter>

            </Card>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">No products available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
