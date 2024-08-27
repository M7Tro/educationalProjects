//In this file, we want to create a global state with some functions to use.

//This will be implemented using the zustand npm package. 

//Basically, zustand gives you a function called create(). You use this function to create a 
//custom hook. The hook returns and object that returns the state and methods you havde defined to controll
//this state. Those method use a method called set(), that is passed to the function that we pass into 
//create() and which returns the object.

//If you want  to access the state when you use the set method, pass a function into set() that has the 
//state: set((state)=>{})

//Note that we don't send a request to http://...
//We are able to do that because we set up a proxy server in the config file in vite.confige.js to add a
//prefix to request that start with /api

import {create} from 'zustand';
import {useState} from 'react';

//The callback function that you pass into create() returns an object: (set)=>({})
export const useProductStore = create((set)=>({
    products: [],
    setProducts: (products) => {set({products})},
    createProduct: async (newProduct) => {
        if(!newProduct.name || !newProduct.price || !newProduct.image){
            return {success: false, message: "Please fill in all the fields"}
        }
        const res = await fetch("/api/products", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newProduct)
        })
        const data = await res.json();
        set((state) => ({products: [data.data, ...state.products]}))
        return {success: true, message: "Product created successfully"}
    }
}))