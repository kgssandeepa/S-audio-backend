import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { addinquiry, deleteinquiry, getinquiries, updateinquiry } from "../controllers/inquiryController.js";





const inquiryRouter =express.Router();

inquiryRouter.post("/",verifyToken,addinquiry);
inquiryRouter.get("/",verifyToken,getinquiries);
inquiryRouter.delete("/",verifyToken,deleteinquiry);
inquiryRouter.put("/",verifyToken,updateinquiry)

export default inquiryRouter;