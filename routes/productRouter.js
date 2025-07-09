import express from 'express';
import { addproduct, deleteProduct, getProducts, updateproduct } from '../controllers/productController.js';
import { verifyToken } from '../middleware/auth.js';

const productRouter = express.Router();

productRouter.post("/", verifyToken, addproduct);
productRouter.get("/", verifyToken, getProducts);
productRouter.put("/:key", verifyToken, updateproduct);
productRouter.delete("/:key",verifyToken,deleteProduct)
export default productRouter;