 import express from 'express';
import { addproduct } from '../controllers/productController.js';

 const productRouter = express.Router();

 productRouter.post("/",addproduct);

 export default productRouter;