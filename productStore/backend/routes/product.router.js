import {Router} from 'express';
import productController from '../controllers/product.controller.js';

const router = Router();

//getting products:
router.get('/', productController.getProducts)

//creating a product:
router.post('/', productController.createProduct)

//deleting a product:
router.delete('/:id', productController.deleteProduct)

//editing a product: 
router.patch('/:id', productController.editProduct)

export default router;