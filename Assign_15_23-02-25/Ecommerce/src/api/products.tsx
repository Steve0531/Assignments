import axios from "axios";
import { IProducts } from "../types/types";

const axiosInstance = axios.create({
    baseURL: "https://fakestoreapi.com",
    headers:{
        "Content-Type":"application/json",
    },
});


export const fetchAllProducts = async () =>{
    const response = await axiosInstance.get("/products");
    return response.data;
};


export const fetchProductsByCategory = async (category:string)=>{
    const response = await axiosInstance.get(`products/category/${category}`);
    return response.data;
};

export const addProduct = async (product:IProducts) =>{
    const response = await axiosInstance.post('/products',product);
    return response.data;
};

export const updateProduct = async(id:number, product:IProducts) =>{
    const response = await axiosInstance.put(`/products/${id}`,product);
    return response.data;
}

export const deleteProduct = async (id:number)=>{
    const response = await axiosInstance.delete(`/products/${id}`);
    return response.data;
}

export const fetchProductById = async (id: number) => {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
};

