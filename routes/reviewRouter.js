import express from "express";
import { addReview } from "../controllers/reviewcontroller.js";
import { verifyToken } from '../middleware/auth.js'

const reviewRouter =express.Router();

reviewRouter.post("/", verifyToken,addReview)

export default reviewRouter;