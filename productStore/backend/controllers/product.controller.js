import {Product} from '../models/product.model.js';
import mongoose from 'mongoose';

//getting products:
const getProducts = async (req, res) => {
    try{
        const products = await Product.find();
        res.status(200).json({success: true, data: products});
    }catch(err){
        res.status(400).json({success: false, message: "Could not fetch the products"})
    }
}

//creating product:
const createProduct = async (req, res) => {
    const product = req.body;
    if(!product.name || !product.image || !product.image){
        return res.status(400).json({success: false, message: "Please provide all the necessary fields"});
    }
    const newProduct = new Product(product);
    try{
        await newProduct.save();
        res.status(200).json({success: true, data: newProduct});
    }catch(err){
        res.status(400).json({success: false, message: err.message});
    }
}

//deleting product:
const deleteProduct = async (req, res) => {
    const {id} = req.params;
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product deleted"});
    }catch(err){
        res.status(400).json({success: false, message: "Couldn't delete the product"});
    }
}

//edditing product:
const editProduct = async (req, res) => {
    const {id} = req.params;
    //Checking if the id passed is valid with mongoose:
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Id passed is not valid"});
    }
    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {new: true});
        res.status(200).json({success: true, data: updatedProduct});
    }catch(err){
        res.status(400).json({success: false, message: "Couldn't edit the product"});
    }
}


const productController = {
    getProducts,
    createProduct,
    deleteProduct,
    editProduct
}

export default productController;