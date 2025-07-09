import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { addinquiry } from "../controllers/inquiryController.js";





const inquiryRouter =express.Router();

inquiryRouter.post("/",verifyToken,addinquiry)

export default inquiryRouter;