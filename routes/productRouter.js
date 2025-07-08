 import express from 'express';
import { addproduct, getProducts } from '../controllers/productController.js';
import { verifyToken } from '../middleware/auth.js';

 const productRouter = express.Router();

 productRouter.post("/",verifyToken, addproduct);
 productRouter.get("/",verifyToken,getProducts);

 export default productRouter;