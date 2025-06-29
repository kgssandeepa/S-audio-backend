import express from "express";
import { addReview } from "../controllers/reviewcontroller.js";

const reviewRouter =express.Router();
reviewRouter.post("/",addReview)

export default reviewRouter;