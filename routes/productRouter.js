 import express from 'express';
import { addproduct } from '../controllers/productController.js';
import { verifyToken } from '../middleware/auth.js';

 const productRouter = express.Router();

 productRouter.post("/",verifyToken, addproduct);

 export default productRouter;