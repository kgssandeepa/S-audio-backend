import express from "express";
import { addReview ,deleteReview,getReview} from "../controllers/reviewcontroller.js";

import { verifyToken } from '../middleware/auth.js';



const reviewRouter =express.Router();

reviewRouter.post("/", verifyToken,addReview)
reviewRouter.get("/",verifyToken,getReview)
reviewRouter.delete(":email",verifyToken,deleteReview)

reviewRouter.get ("/:email",(req,res)=>{
    console.log("this is email route")
})


reviewRouter.get("/approved",(req,res)=>{
    console.log("This is approved Route")
})

reviewRouter.get("/:name",

    (req,res)=>{
        console.log(req.params.name) 
    }
)

export default reviewRouter;